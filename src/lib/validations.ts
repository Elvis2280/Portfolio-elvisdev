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
