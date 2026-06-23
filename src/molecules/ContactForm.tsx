'use client';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/atoms/ui/input';
import { Textarea } from '@/atoms/ui/textarea';
import { Button } from '@/atoms/ui/button';
import { Spinner } from '@/atoms/ui/spinner';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { toast } from 'sonner';
import { errorEmailType, successEmailType } from '@/types/api';

interface formType {
  email: string;
  message: string;
}

const ContactForm = () => {
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

  const messageValue = useWatch({ control, name: 'message', defaultValue: '' });
  const remaining = 500 - (messageValue?.length ?? 0);

  const onSubmit = async (data: formType) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
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

      <div className="flex justify-center">
        <Button
          type="submit"
          size="default"
          disabled={isSubmitting}
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
