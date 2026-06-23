import ContactEmail from '@/lib/resend/emails/contact-email';
import { Resend } from 'resend';

interface emailDataType {
  email: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const destinationEmail = process.env.DESTINATION_EMAIL || null;

export async function POST(request: Request) {
  if (!destinationEmail)
    return Response.json(
      { error: 'No destination email set' },
      { status: 500 },
    );

  try {
    const { email, message } = (await request.json()) as emailDataType;

    if (!email || !message) {
      return Response.json(
        { error: 'Missing required Fields' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Elvis Dev Portfolio <no-reply@elvisdev.xyz>',
      to: [destinationEmail],
      replyTo: email,
      subject: `New Portfolio Message from ${email}`,
      react: ContactEmail({
        email,
        message,
      }),
    });

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
