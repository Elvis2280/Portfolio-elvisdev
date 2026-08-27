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

import { block, container, heading, main, messageStyle } from './styles';

export const CvRequestEmail = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your requested CV from Elvis Miranda</Preview>
      <Container style={container}>
        <Heading style={heading}>Thanks for requesting my CV</Heading>

        <Section style={block}>
          <Text style={messageStyle}>
            Thank you for requesting a copy of my CV. I hope we can work
            together soon.
          </Text>
          <Text style={messageStyle}>
            If you have any questions, simply reply to this email. I&apos;d be
            happy to hear from you.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default CvRequestEmail;
