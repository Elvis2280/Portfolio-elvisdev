'use client';
import { useRef, useState, type FormEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Button } from '@/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/atoms/ui/dialog';
import { Field, FieldLabel, FieldError } from '@/atoms/ui/field';
import { Input } from '@/atoms/ui/input';
import { Textarea } from '@/atoms/ui/textarea';
import { Spinner } from '@/atoms/ui/spinner';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { toast } from 'sonner';
import { parseApiResponse } from '@/lib/api/request';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({
  isOpen = false,
  onClose,
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
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

  const messageValue = useWatch({
    control,
    name: 'message',
    defaultValue: '',
  });
  const remaining = 500 - (messageValue?.length ?? 0);

  // Dialog dismissal can come from Cancel, Escape, the close button, or the
  // overlay; all paths need the same clean form and verification state.
  const resetTurnstile = () => {
    setTurnstileError(null);
    turnstileRef.current?.reset();
  };

  // Execute Turnstile for this submission and use the returned token immediately;
  // storing it in React state would introduce a race before the fetch starts.
  const onSubmit = async (data: ContactFormData) => {
    const widgetCloudflare = turnstileRef.current;

    if (!widgetCloudflare) {
      setRequestError('Security verification is unavailable.');
      return;
    }

    setRequestError(null);
    setTurnstileError(null);
    setIsSubmitting(true);
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
      onClose();
      toast.success('Message sent successfully!', { id: toastId });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.';
      setRequestError(message);
      toast.error(message, { id: toastId });
    } finally {
      // Turnstile tokens are single-use; reset the widget after either outcome so
      // reopening or retrying starts with a fresh verification.
      setIsSubmitting(false);
      widgetCloudflare.reset();
    }
  };

  // Defer React Hook Form's handler invocation to the submit event because the
  // callback reads the imperative Turnstile ref.
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setRequestError(null);
          reset();
          resetTurnstile();
          onClose();
        }
      }}
    >
      <DialogContent className="xl:min-w-xl">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl ">
              Send me a message!
            </DialogTitle>
            <DialogDescription>
              if you&apos;re interested in working together, or bringing an idea
              to life, I&apos;d love to hear from you. Let&apos;s build
              something great.
            </DialogDescription>
          </DialogHeader>

          {requestError && (
            <div
              id="contact-request-error"
              role="alert"
              aria-live="polite"
              className="text-sm font-normal text-destructive"
            >
              {requestError}
            </div>
          )}

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              placeholder="your@email.com"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field>
            <FieldLabel>Message</FieldLabel>
            <div className="relative">
              <Textarea
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
                className="h-[200px] resize-none pr-16"
                aria-invalid={!!errors.message}
                {...register('message')}
              />
              <span className="absolute bottom-2 right-3 text-sm text-muted-foreground">
                {remaining}
              </span>
            </div>
            <FieldError errors={[errors.message]} />
          </Field>

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
            <p
              role="alert"
              aria-live="polite"
              className="text-sm text-destructive"
            >
              {turnstileError || 'Security verification is unavailable.'}
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting || !turnstileSiteKey}
            >
              {isSubmitting && <Spinner data-icon="inline-end" />}
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
