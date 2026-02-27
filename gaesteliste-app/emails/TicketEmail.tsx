import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface TicketEmailProps {
  guestName: string;
  qrToken: string;
  appUrl: string;
  locale?: "de" | "en";
}

const translations = {
  de: {
    preview: "Deine Einladung ins Studentenwohnheim",
    heading: "🏠 Einladung",
    greeting: "Hallo",
    text: "Du wurdest als Gast eingeladen. Bitte zeige den QR-Code am Eingang vor.",
    code: "Dein Code",
    footer: "Diese E-Mail wurde automatisch generiert.",
  },
  en: {
    preview: "Your dormitory invitation",
    heading: "🏠 Invitation",
    greeting: "Hello",
    text: "You have been invited as a guest. Please show the QR code at the entrance.",
    code: "Your code",
    footer: "This email was generated automatically.",
  },
};

export function TicketEmail({
  guestName,
  qrToken,
  appUrl,
  locale = "de",
}: TicketEmailProps) {
  const i = translations[locale];
  const qrImageUrl = `${appUrl}/api/qr/${qrToken}`;

  return (
    <Html>
      <Head />
      <Preview>{i.preview}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto p-8 max-w-[600px] rounded-2xl mt-8 shadow-sm">
            <Heading className="text-2xl font-bold text-center text-gray-900 mb-2">
              {i.heading}
            </Heading>

            <Text className="text-gray-600 text-center mb-6">
              {i.greeting} {guestName}, {i.text}
            </Text>

            <Section className="text-center my-8">
              <Img
                src={`cid:qr-code`}
                alt="QR Code"
                width="250"
                height="250"
                className="mx-auto rounded-xl border-4 border-gray-100"
              />
            </Section>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-sm text-gray-500 text-center">
              {i.code}:{" "}
              <span className="font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {qrToken}
              </span>
            </Text>

            <Text className="text-xs text-gray-400 text-center mt-6">
              {i.footer}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
