import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as yup from 'yup';
import { Resend } from 'resend';

import {
  TURNSTILE_REJECTED_MESSAGE,
  TURNSTILE_UNAVAILABLE_MESSAGE,
  TurnstileConfigurationError,
  TurnstileUnavailableError,
  verifyTurnstileToken,
} from '@/lib/cloudflare/turnstile';
import CvRequestEmail from '@/lib/resend/emails/cv-request-email';
import { cvRequestApiSchema } from '@/lib/validations';

const resend = new Resend(process.env.RESEND_API_KEY);
const destinationEmail = process.env.DESTINATION_EMAIL || null;
const cvFilePath = join(process.cwd(), 'src/data/cv/Elvis-Curriculum.pdf');

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!destinationEmail) {
    return Response.json(
      { error: 'No destination email set' },
      { status: 500 },
    );
  }

  try {
    const body: unknown = await request.json();
    const { email, turnstileToken } = await cvRequestApiSchema.validate(body, {
      stripUnknown: true,
    });

    const isVerified = await verifyTurnstileToken(turnstileToken, 'request_cv');

    if (!isVerified) {
      return Response.json(
        { error: TURNSTILE_REJECTED_MESSAGE },
        { status: 403 },
      );
    }

    const cvContent = await readFile(cvFilePath);

    const { data, error } = await resend.emails.send({
      from: 'Elvis Dev Portfolio <no-reply@elvisdev.xyz>',
      to: [email],
      replyTo: destinationEmail,
      subject: 'Your requested CV from Elvis Miranda',
      react: CvRequestEmail(),
      attachments: [
        {
          content: cvContent,
          filename: 'Elvis-Miranda-CV.pdf',
        },
      ],
    });

    if (error) {
      return Response.json(
        { error: 'Unable to send CV email' },
        { status: 502 },
      );
    }

    return Response.json({ success: true, data });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return Response.json(
        { error: error.errors[0] || 'Please enter a valid email address' },
        { status: 400 },
      );
    }

    if (error instanceof SyntaxError) {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (error instanceof TurnstileConfigurationError) {
      return Response.json(
        { error: 'Security verification is not configured' },
        { status: 500 },
      );
    }

    if (error instanceof TurnstileUnavailableError) {
      return Response.json(
        { error: TURNSTILE_UNAVAILABLE_MESSAGE },
        { status: 503 },
      );
    }

    return Response.json(
      { error: 'Unable to process CV request' },
      { status: 500 },
    );
  }
}
