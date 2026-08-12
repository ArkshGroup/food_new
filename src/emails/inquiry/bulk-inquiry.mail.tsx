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

interface IBulkInquiryProduct {
  productId: string;
  notes: string | null;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  productName: string;
  productQuantity: number;
  productUnit: string;
  userId: string;
  productImage: string;
}

const siteName = "Arksh Food";
const siteLogo = `${process.env.AUTH_URL}/images/logo.png`;
const dummyImage = `${process.env.AUTH_URL}/images/product.webp`;
const browseUrl = `${process.env.AUTH_URL}/products`;

export default function BulkInquiryMail({
  product,
}: {
  product: IBulkInquiryProduct;
}) {
  const demoProduct: IBulkInquiryProduct = {
    productId: "PRD-12345",
    notes: "I’d like to know about delivery options.",
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "Premium Rice Bag",
    productQuantity: 50,
    productUnit: "kg",
    userId: "USER-789",
    productImage: dummyImage,
  };

  const data = product ?? demoProduct;

  const formatQuantity = (quantity: number, unit: string) =>
    `${quantity} ${unit}`;

  return (
    <Html>
      <Head />
      <Preview>Thanks for your bulk inquiry at {siteName}!</Preview>
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
                Thank You for Your Bulk Inquiry!
              </Text>
              <Text className="text-base text-slate-500 mt-2">
                We’ve received your inquiry and our team will get in touch with
                you shortly.
              </Text>
            </Section>

            {/* Product Summary */}
            <Section className="bg-slate-50 rounded-md p-6 mb-8">
              <Text className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Inquiry Summary
              </Text>

              <div className="flex items-start gap-4">
                <Img
                  src={data.productImage}
                  width="80"
                  height="80"
                  alt={data.productName}
                  className="rounded-md object-cover"
                />
                <div>
                  <Text className="text-lg font-semibold text-slate-800 m-0 mb-1">
                    {data.productName}
                  </Text>
                  <Text className="text-base text-slate-700 m-0">
                    <span className="font-bold">Quantity:</span>{" "}
                    {formatQuantity(data.productQuantity, data.productUnit)}
                  </Text>
                  <Text className="text-sm text-slate-400 mt-1">
                    <span className="font-semibold">Product ID:</span>{" "}
                    {data.productId}
                  </Text>
                </div>
              </div>

              {data.notes && (
                <Section className="mt-5 pt-4 border-t border-dashed border-slate-200">
                  <Text className="text-base font-semibold text-slate-800 mb-2">
                    Your Note:
                  </Text>
                  <Text className="text-sm text-slate-600 leading-relaxed m-0">
                    {data.notes}
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
                Continue Browsing
              </Button>
              <Text className="text-xs text-slate-400 mt-6">
                Inquiry submitted on: {data.createdAt.toLocaleDateString()}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center border-t border-slate-200 pt-4">
              <Text className="text-xs text-slate-400 m-0">
                You’re receiving this email because you submitted a bulk inquiry
                on {siteName}. If this wasn’t you, please ignore this message.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
