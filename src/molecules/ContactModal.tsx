'use client';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import type { successEmailType, errorEmailType } from '@/types/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({
  isOpen = false,
  onClose,
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const messageValue = useWatch({
    control,
    name: 'message',
    defaultValue: '',
  });
  const remaining = 500 - (messageValue?.length ?? 0);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      toast.promise(
        fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then(async (resp) => {
          const body = (await resp.json()) as successEmailType | errorEmailType;
          if ('error' in body)
            throw new Error(body?.error || 'Request failed, try again later.');
          return body;
        }),
        {
          loading: 'Sending message!',
          success: () => {
            reset();
            onClose();
            return 'Message sent successfully!';
          },
          error: (err) => `Failed to send message: ${err.message}`,
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="xl: min-w-xl">
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

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner data-icon="inline-end" />}
              {isSubmitting ? 'Sending...' : 'Send message'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
