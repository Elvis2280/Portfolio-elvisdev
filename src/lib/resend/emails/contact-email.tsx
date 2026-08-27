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
import {
  block,
  container,
  emailStyle,
  heading,
  label,
  main,
  messageStyle,
} from './styles';

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
