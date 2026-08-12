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
  email: string;
  phoneNumber: string;
}

const contactUrl = `${process.env.AUTH_URL}/contact`;
const siteName = "Arksh Food";
const siteLogo = `${process.env.AUTH_URL}/images/logo.png`;
const dummyImage = `${process.env.AUTH_URL}/images/product.webp`;

export default function BulkInquiryMailForAdmin({
  product,
}: {
  product: IBulkInquiryProduct;
}) {
  const demoProduct: IBulkInquiryProduct = {
    productId: "PRD-12345",
    notes: "Please deliver as soon as possible.",
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "Premium Rice Bag",
    productQuantity: 50,
    productUnit: "kg",
    userId: "USER-789",
    email: "<Email>",
    phoneNumber: "<PhoneNumber>",
    productImage: dummyImage,
  };

  const data = product ?? demoProduct;

  const formatQuantity = (quantity: number, unit: string) =>
    `${quantity} ${unit}`;

  return (
    <Html>
      <Head>
        <style>
          {`
            @media only screen and (min-width: 600px) {
              .wrapper {
                padding: 32px !important;
              }
              .product-info {
                flex-direction: row !important;
                text-align: left !important;
              }
              .product-image {
                width: 100px !important;
                margin-right: 20px !important;
              }
              .title-text {
                font-size: 20px !important;
              }
            }
          `}
        </style>
      </Head>

      <Preview>New Bulk Inquiry Received for {data.productName}</Preview>

      <Tailwind>
        <Body className="bg-slate-100 font-sans">
          <Container className="wrapper max-w-[600px] w-full mx-auto my-10 bg-white rounded-lg shadow-md border-t-4 border-blue-600 p-5">
            {/* Header */}
            <Section className="text-center mb-8">
              <Img
                src={siteLogo}
                width="120"
                alt={siteName}
                className="mx-auto mb-4"
              />
              <Text className="title-text text-xl font-bold text-slate-800 m-0">
                New Bulk Inquiry!
              </Text>
              <Text className="text-base text-slate-500 mt-2">
                A customer has submitted a bulk inquiry on your website.
              </Text>
            </Section>

            {/* Product Details */}
            <Section className="bg-slate-50 rounded-md p-5 mb-8">
              <Text className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Product Details
              </Text>

              <Row className="product-info flex flex-col items-center text-center">
                <Column>
                  <Img
                    src={data.productImage}
                    width="80"
                    height="80"
                    alt={data.productName}
                    className="product-image rounded-md mx-auto mb-3 object-cover"
                  />
                </Column>
                <Column>
                  <Text className="text-base font-semibold text-slate-800 m-0 mb-1">
                    {data.productName}
                  </Text>
                  <Text className="text-sm text-slate-700 m-0">
                    <span className="font-bold">Quantity:</span>{" "}
                    {formatQuantity(data.productQuantity, data.productUnit)}
                  </Text>
                  <Text className="text-xs text-slate-400 mt-1">
                    <span className="font-semibold">Product ID:</span>{" "}
                    {data.productId}
                  </Text>
                </Column>
              </Row>

              {/* Contact Info */}
              <Section className="mt-5 pt-4 border-t border-dashed border-slate-200">
                <Text className="text-base font-semibold text-slate-800 mb-2">
                  Customer Phone Number:
                </Text>
                <Text className="text-sm text-slate-600 m-0">
                  {data.phoneNumber}
                </Text>
              </Section>

              <Section className="mt-5 pt-4 border-t border-dashed border-slate-200">
                <Text className="text-base font-semibold text-slate-800 mb-2">
                  Customer Email:
                </Text>
                <Text className="text-sm text-slate-600 m-0">{data.email}</Text>
              </Section>

              {data.notes && (
                <Section className="mt-5 pt-4 border-t border-dashed border-slate-200">
                  <Text className="text-base font-semibold text-slate-800 mb-2">
                    Customer Notes:
                  </Text>
                  <Text className="text-sm text-slate-600 m-0">
                    {data.notes}
                  </Text>
                </Section>
              )}
            </Section>

            {/* CTA */}
            <Section className="text-center mb-8">
              <Text className="text-xs text-slate-400 mt-6">
                Inquiry from User ID: {data.userId} | Submitted on:{" "}
                {data.createdAt.toLocaleDateString()}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center border-t border-slate-200 pt-4">
              <Text className="text-xs text-slate-400 m-0">
                This is an automated notification from {siteName}. Please do not
                reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
