import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
  Tailwind,
  Link,
  Column,
  Row,
} from "@react-email/components";
import * as React from "react";

interface IContactMailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const siteName = "Arksh Food";
const siteLogo = `${process.env.AUTH_URL}/images/logo.png`;
const browseUrl = `${process.env.AUTH_URL}`; // General site URL

export default function ContactMail({
  name,
  email,
  subject,
  message,
}: IContactMailProps) {
  const demoContactData: IContactMailProps = {
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Inquiry about your services",
    message: "I'd like to learn more about your product offerings and pricing.",
  };

  const data =
    name && email && subject && message
      ? { name, email, subject, message }
      : demoContactData;

  return (
    <Html>
      <Head />
      <Preview>Thanks for contacting {siteName}!</Preview>
      <Tailwind>
        <Body className="bg-slate-100 font-sans">
          <Container className="max-w-[600px] mx-auto my-10 bg-white rounded-lg shadow-md p-8 border-t-4 border-blue-600">
            {/* Header */}
            <Section className="text-center mb-8">
              <Img
                src={siteLogo}
                width="150"
                alt={siteName}
                className="mx-auto mb-4"
              />
              <Text className="text-2xl font-bold text-slate-800 m-0">
                Thank You for Your Message!
              </Text>
              <Text className="text-base text-slate-500 mt-2">
                We’ve received your message and our team will get in touch with
                you shortly.
              </Text>
            </Section>

            {/* Contact Details */}
            <Section className="bg-slate-50 rounded-md p-6 mb-8">
              <Text className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Your Contact Details
              </Text>
              <div>
                <Text className="text-base text-slate-700 m-0 mb-1">
                  <span className="font-bold">Name:</span> {data.name}
                </Text>
                <Text className="text-base text-slate-700 m-0 mb-1">
                  <span className="font-bold">Email:</span> {data.email}
                </Text>
                <Text className="text-base text-slate-700 m-0 mb-1">
                  <span className="font-bold">Subject:</span> {data.subject}
                </Text>
              </div>

              {data.message && (
                <Section className="mt-5 pt-4 border-t border-dashed border-slate-200">
                  <Text className="text-base font-semibold text-slate-800 mb-2">
                    Your Message:
                  </Text>
                  <Text className="text-sm text-slate-600 leading-relaxed m-0">
                    {data.message}
                  </Text>
                </Section>
              )}
            </Section>

            {/* CTA */}
            <Section className="text-center mb-8">
              <Button
                href={browseUrl}
                className="bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-base no-underline shadow-md"
              >
                Visit Our Website
              </Button>
            </Section>
            <Section
              style={{ textAlign: "center", marginTop: 32, marginBottom: 16 }}
            >
              <Text style={{ marginBottom: 12 }}>Connect with us</Text>

              <Row align="center" style={{ paddingLeft: "50px" }}>
                <Column>
                  <Link href="https://www.facebook.com/Arksh.Food">
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                      width="28"
                      height="28"
                      alt="Facebook"
                    />
                  </Link>
                </Column>

                <Column>
                  <Link href="https://www.instagram.com/arksh.food/">
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                      width="28"
                      height="28"
                      alt="Instagram"
                    />
                  </Link>
                </Column>

                <Column>
                  <Link href="https://www.linkedin.com/company/arksh-group/">
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
                      width="28"
                      height="28"
                      alt="LinkedIn"
                    />
                  </Link>
                </Column>

                <Column>
                  <Link href="https://www.youtube.com/watch?v=UXdZMpvurd8">
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                      width="28"
                      height="28"
                      alt="YouTube"
                    />
                  </Link>
                </Column>

                <Column>
                  <Link href="https://www.tiktok.com/@arksh.food">
                    <Img
                      src="https://cdn-icons-png.flaticon.com/512/3116/3116491.png"
                      width="28"
                      height="28"
                      alt="TikTok"
                    />
                  </Link>
                </Column>
              </Row>

              <Section style={{ paddingTop: 24 }}>
                <Link
                  href="https://maps.app.goo.gl/rNh9XgcmULUbGPox6"
                  target="_blank"
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  Visit Our Store
                </Link>
              </Section>
            </Section>
            {/* Footer */}
            <Section className="text-center border-t border-slate-200 pt-4">
              <Text className="text-xs text-slate-400 m-0">
                You’re receiving this email because you submitted a contact form
                on {siteName}. If this wasn’t you, please ignore this message.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
