'use client';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/atoms/ui/input';
import { Textarea } from '@/atoms/ui/textarea';
import { Button } from '@/atoms/ui/button';
import { Spinner } from '@/atoms/ui/spinner';
import { contactSchema, type ContactFormData } from '@/lib/validations';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const messageValue = useWatch({ control, name: 'message', defaultValue: '' });
  const remaining = 500 - (messageValue?.length ?? 0);

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-10 w-full max-w-xl px-4"
    >
      <div className="flex flex-col gap-1.5">
        <Input
          type="email"
          placeholder="Email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <Textarea
            placeholder="Message"
            disabled={isSubmitting}
            className="h-[200px] resize-none pr-16"
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
