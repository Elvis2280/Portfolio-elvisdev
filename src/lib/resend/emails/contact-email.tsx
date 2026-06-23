import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';

interface ContactEmailProps {
  email: string;
  message: string;
}

export const ContactEmail = ({ email, message }: ContactEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New contact from {email}</Preview>
      <Container style={container}>
        <Heading style={heading}>Portfolio contact email</Heading>

        <Section style={block}>
          <Text style={label}>Email</Text>
          <Text style={emailStyle}>{email}</Text>
        </Section>

        <Section style={block}>
          <Text style={label}>Message</Text>
          <Text style={messageStyle}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

ContactEmail.PreviewProps = {
  email: 'john@example.com',
  message: 'Hello! I would love to work with you on my upcoming project.',
} as ContactEmailProps;

export default ContactEmail;

const main = {
  backgroundColor: '#09090b',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  padding: '40px 20px',
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
};

const heading = {
  color: '#22d3ee',
  fontSize: '28px',
  fontWeight: 'bold',
  textShadow: '0 0 12px rgba(34, 211, 238, 0.5)',
  margin: '0 0 32px',
  padding: '0',
};

const block = {
  backgroundColor: '#18181b',
  borderRadius: '8px',
  padding: '10px 14px',
  marginBottom: '16px',
  border: '1px solid #27272a',
};

const label = {
  color: '#a1a1aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 8px',
  padding: '0',
};

const emailStyle = {
  color: '#22d3ee',
  fontSize: '16px',
  margin: '0',
  padding: '0',
};

const messageStyle = {
  color: '#fafafa',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  padding: '0',
  whiteSpace: 'pre-wrap' as const,
};
