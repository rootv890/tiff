import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
  Link,
  Section,
  Tailwind,
  Img
} from '@react-email/components';
import { CopyIcon } from 'lucide-react';

export default function EmailVerificationTemplate({
  username,
  verifyUrl,
  validationCode,
}: {
  username: string;
  verifyUrl?: string;
  validationCode: string;
}) {

  return (
    <Html>
      <Head />
      <Preview>Confirm your email to get started with TIFF</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-10 text-black">
          <Container className="bg-white rounded-lg p-10 w-[480px] mx-auto font-sans">
            <Section className='w-full flex justify-start items-center'>
              <Img src="https://res.cloudinary.com/drhdaopqy/image/upload/v1745771386/tiff/assets/logo_main_WddliZ.png" alt="TIFF Logo" className="mb-6" width={100} height={100}  />
            </Section>

            <Section>
              <Text className="text-2xl font-semibold mb-2">Hey {username},</Text>
              <Text className="text-base mb-6 leading-relaxed">
                Thanks for registering for TIFF! Before we get started, we just need to confirm that this is you.
                Click below to verify your email address:
              </Text>
              <Section style={codeContainer}>
                <Text style={code}>{validationCode}</Text>
              </Section>
              {code}
            </Section>
            <Section className="border-t border-gray-200 mt-10 pt-6 text-gray-600">
              <Text className="text-sm mb-2">
                Need help?{' '}
                <Link href="https://tiff.example.com/support" className="text-indigo-600 underline">
                  Contact our support team
                </Link>{' '}
                or hit us up on Twitter{' '}
                <Link href="https://twitter.com/tiff" className="text-indigo-600 underline">
                  @tiff
                </Link>
                .
              </Text>
              <Text className="text-sm mb-2">
                Want to give us feedback? Let us know on our{' '}
                <Link href="https://tiff.example.com/feedback" className="text-indigo-600 underline">
                  feedback site
                </Link>
                .
              </Text>
              <Text className="text-xs text-gray-400 mt-4">
                Sent by TIFF • Dharwad, Karnataka, India - 580001
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}


const code = {
  color: '#000',
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  display: 'block',
  textAlign: 'center' as const,
};

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px auto 14px',
  verticalAlign: 'middle',
  width: '280px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
