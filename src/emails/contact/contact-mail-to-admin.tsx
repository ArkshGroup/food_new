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

export default function ContactRequestAdminNotification({
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
      <Preview>New contact request for {siteName}!</Preview>
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
                New Contact Request Received
              </Text>
              <Text className="text-base text-slate-500 mt-2">
                A new contact request has been submitted on your website.
                Details are below:
              </Text>
            </Section>

            {/* Contact Details */}
            <Section className="bg-slate-50 rounded-md p-6 mb-8">
              <Text className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Contact Request Details
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
                    Message:
                  </Text>
                  <Text className="text-sm text-slate-600 leading-relaxed m-0">
                    {data.message}
                  </Text>
                </Section>
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
