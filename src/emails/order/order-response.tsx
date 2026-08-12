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
// Import the Tailwind component
import { Tailwind } from "@react-email/tailwind";

import { CURRENCY, ORDER_STATUS, PAYMENT_STATUS } from "@prisma/client";
import { formatCurrencyWithCurrencyParam } from "@/helper/format-currency";

enum DummyORDER_STATUS {
  PENDING = "PENDING",
  DISPATCHED = "DISPATCHED",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

enum DummyPAYMENT_STATUS {
  UNPAID = "UNPAID",
  PAID = "PAID",
  ON_VERIFICATION = "ON_VERIFICATION",
}

interface IOrderItem {
  productName: string;
  productImage: string;
  quantity: number;
  unitSellingPrice: number;
  specialPrice: number;
  totalPrice: number;
}

interface IShippingDetails {
  recipientName: string;
  addressLine1: string;
  city: string;
  phoneNumber: string;
}

export interface IOrderConfirmationData {
  orderId: string;
  orderNumber: number;
  customerName: string;
  currency: CURRENCY;
  orderStatus: ORDER_STATUS | DummyORDER_STATUS;
  paymentStatus: PAYMENT_STATUS | DummyPAYMENT_STATUS;
  subTotalAmount: number;
  deliveryCharge: number;
  discountAmount: number;
  totalAmount: number;
  deliveryMethod: string;
  shippingDetails: IShippingDetails;
  items: IOrderItem[];
}

const siteName = "Arksh Food";
const accentColor = "#209aea";
const dummyImage = `${process.env.NEXT_PUBLIC_APP_URL}/images/product.webp`;
const trackingUrl = (orderId: string) =>
  `${process.env.NEXT_PUBLIC_APP_URL}/my-orders`;
const fallbackImageUrl = dummyImage;

export const dummyOrder: IOrderConfirmationData = {
  orderId: "123456",
  orderNumber: 1,
  customerName: "Alex Johnson",
  orderStatus: DummyORDER_STATUS.DISPATCHED,
  paymentStatus: DummyPAYMENT_STATUS.PAID,
  subTotalAmount: 750.0,
  deliveryCharge: 50.0,
  discountAmount: 20.0,
  totalAmount: 780.0,
  currency: CURRENCY.NPR,
  deliveryMethod: "Credit Card",
  shippingDetails: {
    recipientName: "Alex Johnson",
    addressLine1: "123 Main St, Apt 4B",
    city: "Kathmandu",
    phoneNumber: "9801234567",
  },
  items: [
    {
      productName: "Premium Organic Coffee Beans",
      productImage: dummyImage,
      quantity: 2,
      unitSellingPrice: 400.0,
      specialPrice: 380.0,
      totalPrice: 760.0,
    },
    {
      productName: "Artisan Chocolate Bar",
      productImage: dummyImage,
      quantity: 1,
      unitSellingPrice: 440.0,
      specialPrice: 80.0,
      totalPrice: 40.0,
    },
  ],
};

export default function OrderConfirmationMail({
  order = dummyOrder,
}: {
  order: IOrderConfirmationData;
}) {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

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
                src={`${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`}
                width="170"
                height="100"
                alt={siteName}
                className="mx-auto mb-4"
              />
              <Text className="text-base text-slate-600 m-0 mb-5">
                Thank you for your order with {siteName}!
              </Text>
            </Section>

            {/* Order Details Table */}
            <Section className="mb-8 border border-slate-200 rounded-lg overflow-hidden">
              <Row className="border-b border-slate-200">
                <Column className="p-3 w-1/2 bg-slate-50 border-r border-slate-200">
                  <Text className="m-0 text-sm text-slate-500">
                    Order Number:
                  </Text>
                  <Text className="m-0 mt-0.5 text-base font-bold text-slate-800">
                    {order.orderNumber}
                  </Text>
                </Column>
                <Column className="p-3 w-1/2 bg-slate-50">
                  <Text className="m-0 text-sm text-slate-500">
                    Total Items:
                  </Text>
                  <Text className="m-0 mt-0.5 text-base font-bold text-slate-800">
                    {totalItems}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className="p-3 w-1/2 border-r border-slate-200">
                  <Text className="m-0 text-sm text-slate-500">Delivery :</Text>
                  <Text className="m-0 mt-0.5 text-base font-bold text-slate-800">
                    {order.deliveryMethod}
                  </Text>
                </Column>
                <Column className="p-3 w-1/2">
                  <Text className="m-0 text-sm text-slate-500">Total:</Text>
                  <Text className="m-0 mt-0.5 text-base font-bold text-slate-800">
                    {formatCurrencyWithCurrencyParam({
                      amount: order.totalAmount,
                      currency: order.currency,
                    })}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Items List */}
            <Section className="mb-8">
              <Text className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Items in Your Order ({order.items.length})
              </Text>
              {order.items.map((item, index) => (
                <Row
                  key={index}
                  className={
                    index < order.items.length - 1
                      ? "mb-4 border-b border-dashed border-slate-200 pb-4"
                      : "mb-4 pb-4"
                  }
                >
                  {/* <Column className="w-[60px] align-top">
                    <Img
                      src={item.productImage || fallbackImageUrl}
                      width="50"
                      height="50"
                      alt={item.productName}
                      className="rounded-md object-cover"
                    />
                  </Column> */}
                  <Column className="pl-4 align-top">
                    <Text className="text-base font-semibold text-slate-800 m-0 mb-0.5">
                      {item.productName}
                    </Text>
                    <Text className="text-sm text-slate-600 m-0">
                      Qty: {item.quantity} &times;{" "}
                      {formatCurrencyWithCurrencyParam({
                        amount: item.specialPrice,
                        currency: order.currency,
                      })}
                    </Text>
                  </Column>
                  <Column className="align-top text-right">
                    <Text className="text-base font-bold text-slate-800 m-0">
                      {formatCurrencyWithCurrencyParam({
                        amount: item.totalPrice,
                        currency: order.currency,
                      })}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Totals and Shipping */}
            <Section className="py-4 border-y-2 border-slate-200 mb-8">
              <Row>
                <Column className="w-3/5 pr-4">
                  <Text className="text-base font-bold text-slate-800 m-0 mb-2">
                    Shipping To:
                  </Text>
                  <Text className="text-sm text-slate-700 m-0 leading-snug">
                    {order.shippingDetails.recipientName}
                    <br />
                    {order.shippingDetails.addressLine1},{" "}
                    {order.shippingDetails.city}
                    <br />
                    Phone: {order.shippingDetails.phoneNumber}
                  </Text>
                </Column>
                <Column className="w-2/5 text-right pl-4 border-l border-slate-200">
                  <Row className="mb-1">
                    <Column className="w-1/2">
                      <Text className="m-0 text-sm text-slate-500">
                        Subtotal:
                      </Text>
                    </Column>
                    <Column className="w-1/2">
                      <Text className="m-0 text-sm font-medium">
                        {formatCurrencyWithCurrencyParam({
                          amount: order.subTotalAmount,
                          currency: order.currency,
                        })}
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mb-1">
                    <Column className="w-1/2">
                      <Text className="m-0 text-sm text-slate-500">
                        Delivery:
                      </Text>
                    </Column>
                    <Column className="w-1/2">
                      <Text className="m-0 text-sm font-medium">
                        {formatCurrencyWithCurrencyParam({
                          amount: order.deliveryCharge,
                          currency: order.currency,
                        })}
                      </Text>
                    </Column>
                  </Row>
                  {order.discountAmount > 0 && (
                    <Row className="mb-1">
                      <Column className="w-1/2">
                        <Text className="m-0 text-sm text-red-600">
                          Discount:
                        </Text>
                      </Column>
                      <Column className="w-1/2">
                        <Text className="m-0 text-sm font-medium text-red-600">
                          -{" "}
                          {formatCurrencyWithCurrencyParam({
                            amount: order.discountAmount,
                            currency: order.currency,
                          })}
                        </Text>
                      </Column>
                    </Row>
                  )}
                  <Row className="mt-2 pt-2 border-t border-slate-200">
                    <Column className="w-1/2">
                      <Text className="m-0 text-base font-bold">
                        Order Total:
                      </Text>
                    </Column>
                    <Column className="w-1/2">
                      <Text className="m-0 text-base font-bold text-accent">
                        {formatCurrencyWithCurrencyParam({
                          amount: order.totalAmount,
                          currency: order.currency,
                        })}
                      </Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>

            {/* Call to Action */}
            <Section className="text-center mb-5">
              <Button
                href={trackingUrl(order.orderId.toString())}
                className="bg-accent text-white py-4 px-9 rounded-lg font-bold text-lg no-underline inline-block shadow-lg shadow-green-400/25"
              >
                View Your Order
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
