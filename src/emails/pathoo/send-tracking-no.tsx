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
  Row,
  Column,
  Link,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const siteName = "Arksh Food";
const accentColor = "#209aea";
const dummyImage = `${process.env.AUTH_URL}/images/product.webp`;

const fallbackImageUrl = dummyImage;

export const dummyOrder = {
  orderNumber: 1,
  trackingNumber: "https://www.arkshfood.com",
};

export default function SendTrackingNumberEmail({
  order = dummyOrder,
}: {
  order: typeof dummyOrder;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Your Order Number {order.orderNumber.toString()} is confirmed!
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                accent: accentColor,
              },
            },
          },
        }}
      >
        <Body className="bg-slate-50 font-sans">
          <Container className="max-w-xl mx-auto my-10 bg-white rounded-lg shadow-xl p-6 border-t-4 border-accent">
            {/* Header Section */}
            <Section className="text-center mb-8">
              <Img
                src={`${process.env.AUTH_URL}/images/logo.png`}
                width="170"
                height="100"
                alt={siteName}
                className="mx-auto mb-4"
              />
              <Text className="text-base text-slate-600 m-0 mb-5">
                Thank you for your order with {siteName}!
              </Text>
            </Section>
            {/* Call to Action */}
            <Section className="text-center mb-5">
              <Button
                target="_blank"
                href={order.trackingNumber}
                className="bg-accent text-white py-4 px-9 rounded-lg font-bold text-lg no-underline inline-block shadow-lg shadow-green-400/25"
              >
                Track Pathao Order
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
            <Section className="text-center border-t border-slate-200 pt-5">
              <Text className="text-xs text-slate-400 m-0">
                You are receiving this email to confirm your recent purchase
                from {siteName}. Please keep this email for your records.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
