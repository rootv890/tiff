import { Container, Button, Text } from "@react-email/components";
import { CodeBlock, dracula } from '@react-email/code-block';


const WelcomeEmailTemplate = (
  {
    name
  }: {
    name: string
  }
) => {
  const random = Math.floor(100000 + Math.random() * 900000);
  const randomOtp = random.toString().padStart(6, '0');
  return (
    <Container>
      <Text>
        Welcome to Tiff {name}!
      </Text>
    <Button href="https://example.com" style={{ color: "#61dafb" }}>
      Click me
    </Button>
    <CodeBlock
        theme={dracula}
        language="sh"
      code={randomOtp}
      lineNumbers={false}
    />
  </Container>
  )
}
export default WelcomeEmailTemplate