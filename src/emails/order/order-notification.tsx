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
  zone: string;
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
// Using a distinct color for Admin notifications
const accentColor = "#209aea"; // Changed accent color to a warning/notification yellow
const dummyImage = `${process.env.AUTH_URL}/images/product.webp`;

// **Admin specific URL** to view the order details in the admin panel
const adminOrderViewUrl = (orderId: string) =>
  `${process.env.ADMIN_URL}/admin/orders/${orderId}`;
const fallbackImageUrl = dummyImage;

export const dummyOrder: IOrderConfirmationData = {
  orderId: "123456",
  orderNumber: 1,
  customerName: "Alex Johnson",
  orderStatus: DummyORDER_STATUS.PENDING, // Changed status to PENDING for a new order
  paymentStatus: DummyPAYMENT_STATUS.UNPAID, // Changed status to UNPAID for a typical new order
  subTotalAmount: 750.0,
  deliveryCharge: 50.0,
  discountAmount: 20.0,
  totalAmount: 780.0,
  currency: CURRENCY.NPR,
  deliveryMethod: "Cash on Delivery", // Changed delivery method
  shippingDetails: {
    recipientName: "Alex Johnson",
    addressLine1: "123 Main St, Apt 4B",
    city: "Kathmandu",
    zone: "Kathmandu",
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
      unitSellingPrice: 40.0,
      specialPrice: 40.0,
      totalPrice: 40.0,
    },
  ],
};

export default function AdminNewOrderMail({
  order = dummyOrder,
}: {
  order: IOrderConfirmationData;
}) {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Html>
      <Head />
      <Preview>
        🚨 NEW ORDER CREATED by
        {order.customerName}
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
          {/* Using a bright yellow border for a notification */}
          <Container className="max-w-xl mx-auto my-10 bg-white rounded-lg shadow-xl p-6 border-t-4 border-accent">
            {/* Header Section - Changed for Admin */}
            <Section className="text-center mb-8">
              <Img
                src={`${process.env.AUTH_URL}/images/logo.png`}
                width="170"
                height="100"
                alt={siteName}
                className="mx-auto mb-4"
              />
              <Text className="text-2xl font-extrabold text-slate-800 m-0 mb-2">
                New Order Created!
              </Text>
              <Text className="text-lg font-semibold text-slate-600 m-0">
                Order Number: {order.orderNumber} has been placed by{" "}
                {order.customerName}.
              </Text>
            </Section>

            <hr className="border-t border-slate-200 mb-8" />

            {/* Order Summary - Adjusted Labels for Admin View */}
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
                    Customer Name:
                  </Text>
                  <Text className="m-0 mt-0.5 text-base font-bold text-slate-800">
                    {order.customerName}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className="p-3 w-1/2 border-r border-slate-200">
                  <Text className="m-0 text-sm text-slate-500">Delivery:</Text>
                  {/* Highlighting payment status for quick admin check */}
                  <Text
                    className={`m-0 mt-0.5 text-base font-bold ${order.paymentStatus === "PAID" ? "text-green-600" : "text-red-600"}`}
                  >
                    {order.deliveryMethod}
                  </Text>
                </Column>
                <Column className="p-3 w-1/2">
                  <Text className="m-0 text-sm text-slate-500">
                    Total Amount:
                  </Text>
                  <Text className="m-0 mt-0.5 text-base font-bold text-slate-800">
                    {formatCurrencyWithCurrencyParam({
                      amount: order.totalAmount,
                      currency: order.currency,
                    })}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Items List - Kept as is, it's vital data */}
            <Section className="mb-8">
              <Text className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Items Ordered ({order.items.length})
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

            {/* Totals and Shipping - Kept as is, it's vital data */}
            <Section className="py-4 border-y-2 border-slate-200 mb-8">
              <Row>
                <Column className="w-3/5 pr-4">
                  <Text className="text-base font-bold text-slate-800 m-0 mb-2">
                    Shipping Details:
                  </Text>
                  <Text className="text-sm text-slate-700 m-0 leading-snug">
                    Recipient:{order.shippingDetails.recipientName}
                    <br />
                    Address:{order.shippingDetails.addressLine1},
                    <br />
                    City:{order.shippingDetails.city}
                    <br />
                    Area: {order.shippingDetails.zone}
                    <br />
                    phone: {order.shippingDetails.phoneNumber}
                    <br />
                    Delivery Method:{order.deliveryMethod}
                    <br />
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

            {/* Call to Action - Changed for Admin */}
            <Section className="text-center mb-5">
              <Text className="text-lg text-slate-600 m-0 mb-4">
                Please log in to the admin panel to process this order.
              </Text>
            </Section>

            {/* Footer - Changed for Admin */}
            <Section className="text-center border-t border-slate-200 pt-5">
              <Text className="text-xs text-slate-400 m-0">
                This is an automated administrative notification from the{" "}
                {siteName} system.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
