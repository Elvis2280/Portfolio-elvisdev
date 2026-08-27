'use client';
import { useRef, useState, type FormEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Input } from '@/atoms/ui/input';
import { Textarea } from '@/atoms/ui/textarea';
import { Button } from '@/atoms/ui/button';
import { Spinner } from '@/atoms/ui/spinner';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { toast } from 'sonner';
import { parseApiResponse } from '@/lib/api/request';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: 'onChange',
  });

  const messageValue = useWatch({ control, name: 'message', defaultValue: '' });
  const remaining = 500 - (messageValue?.length ?? 0);

  const onSubmit = async (data: ContactFormData) => {
    const widgetCloudflare = turnstileRef.current;

    if (!widgetCloudflare) {
      setTurnstileError('Security verification is unavailable.');
      return;
    }

    setIsSubmitting(true);
    setTurnstileError(null);
    const toastId = toast.loading('Sending message!');

    try {
      widgetCloudflare.execute();
      const token = await widgetCloudflare.getResponsePromise(30_000);

      if (!token) {
        throw new Error('Security verification failed. Please try again.');
      }

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      });
      await parseApiResponse(response);
      reset();
      toast.success('Message sent successfully!', { id: toastId });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.';
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
      widgetCloudflare.reset();
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-6 mt-10 w-full max-w-xl px-4"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-muted-foreground">
          Email
        </label>
        <Input
          type="email"
          placeholder="your@email.com"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          className="bg-secondary/50 h-12"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-muted-foreground">
          Message
        </label>
        <div className="relative">
          <Textarea
            placeholder="Tell me about your project..."
            disabled={isSubmitting}
            className="h-[200px] resize-none pr-16 bg-secondary/50"
            aria-invalid={!!errors.message}
            {...register('message')}
          />
          <span className="absolute bottom-2 right-3 text-sm text-muted-foreground">
            {remaining}
          </span>
        </div>
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {turnstileSiteKey ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          options={{
            action: 'contact_form',
            appearance: 'execute',
            theme: 'auto',
            size: 'flexible',
            execution: 'execute',
          }}
          onSuccess={() => {
            setTurnstileError(null);
          }}
          onExpire={() => {
            setTurnstileError(
              'Security verification expired. Please verify again.',
            );
          }}
          onTimeout={() => {
            setTurnstileError(
              'Security verification timed out. Please try again.',
            );
          }}
          onUnsupported={() => {
            setTurnstileError(
              'Security verification is not supported in this browser.',
            );
          }}
          onError={() => {
            setTurnstileError(
              'Security verification failed. Please try again.',
            );
          }}
        />
      ) : null}

      {(turnstileError || !turnstileSiteKey) && (
        <p role="alert" aria-live="polite" className="text-sm text-destructive">
          {turnstileError || 'Security verification is unavailable.'}
        </p>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          size="default"
          disabled={!isValid || isSubmitting || !turnstileSiteKey}
          className="w-full"
        >
          {isSubmitting && <Spinner data-icon="inline-end" />}
          {isSubmitting ? 'Sending...' : 'Send Information'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
