import * as yup from 'yup';

const sqlInjectionRegex = /['";\-\/\*]|--|xp_/g;

export const contactSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be at most 254 characters'),
  message: yup
    .string()
    .required('Message is required')
    .transform((value) => value.replace(sqlInjectionRegex, ''))
    .max(500, 'Message must be at most 500 characters'),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;

const turnstileTokenSchema = yup
  .string()
  .strict()
  .typeError('Security verification is invalid')
  .required('Security verification is required')
  .max(2048, 'Security verification is invalid');

export const contactApiSchema = contactSchema.shape({
  turnstileToken: turnstileTokenSchema,
});

export type ContactApiFormData = yup.InferType<typeof contactApiSchema>;

export const cvRequestSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .trim('Email cannot include leading or trailing spaces')
    .lowercase('Email must be lowercase')
    .max(254, 'Email must be at most 254 characters'),
});

export type CvRequestFormData = yup.InferType<typeof cvRequestSchema>;

export const cvRequestApiSchema = cvRequestSchema.shape({
  turnstileToken: turnstileTokenSchema,
});

export type CvRequestApiFormData = yup.InferType<typeof cvRequestApiSchema>;
