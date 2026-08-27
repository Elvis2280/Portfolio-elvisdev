'use client';

import { FormEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { toast } from 'sonner';

import { Button } from '@/atoms/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/atoms/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/atoms/ui/field';
import { Input } from '@/atoms/ui/input';
import { Spinner } from '@/atoms/ui/spinner';
import { cvRequestSchema, type CvRequestFormData } from '@/lib/validations';
import { parseApiResponse } from '@/lib/api/request';

export default function CvRequestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CvRequestFormData>({
    resolver: yupResolver(cvRequestSchema),
    mode: 'onChange',
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setRequestError(null);
      setTurnstileError(null);
      reset();
      turnstileRef.current?.reset();
    }
  };

  const onSubmit = async (data: CvRequestFormData) => {
    const widgetCloudflare = turnstileRef.current;
    if (!widgetCloudflare) {
      setTurnstileError('Security verification is unavailable');
      return;
    }
    setIsSubmitting(true);
    setTurnstileError(null);

    try {
      // Execute-mode widgets do not create a token on mount, so explicitly start
      // verification and wait up to 30 seconds before contacting the API.
      widgetCloudflare.execute();
      const token = await widgetCloudflare.getResponsePromise(30_000);
      if (!token) {
        throw new Error('Security verification failed. Please try again');
      }
      // Send the single-use token returned for this attempt; the server verifies
      // it before reading or attaching the CV.
      const response = await fetch('/api/requestCv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      });
      await parseApiResponse(response);
      reset();
      setIsOpen(false);
      toast.success('Your CV request was submitted successfully!');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to request the CV. Please try again later.';
      setRequestError(message);
      toast.error(message);
    } finally {
      // Turnstile tokens are single-use, so every success or failure must leave a
      // reset widget ready for the next request.
      setIsSubmitting(false);
      widgetCloudflare.reset();
    }
  };

  // React Hook Form is invoked from the browser submit event because this callback
  // coordinates field validation with the imperative Turnstile widget ref.
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="px-8" type="button">
          Download CV
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-md">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-4">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Thanks for your interest in my resume
            </DialogTitle>
            <DialogDescription>
              Enter your email address and check your inbox. A copy of my CV
              will be sent to you.
            </DialogDescription>
          </DialogHeader>

          {requestError && (
            <div
              id="cv-request-error"
              role="alert"
              aria-live="polite"
              className="text-sm font-normal text-destructive"
            >
              {requestError}
            </div>
          )}

          {turnstileSiteKey ? (
            <Turnstile
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
              options={{
                action: 'request_cv',
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

          <Field>
            <FieldLabel htmlFor="cv-email">Email</FieldLabel>
            <Input
              id="cv-email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'cv-email-error' : undefined}
              {...register('email')}
            />
            <FieldError id="cv-email-error" errors={[errors.email]} />
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isValid || !turnstileSiteKey || isSubmitting}
            >
              {isSubmitting && <Spinner data-icon="inline-end" />}
              {isSubmitting ? 'Sending...' : 'Send me the CV'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
