import {
  ORDER_MARKET_TYPE,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  Prisma,
  SALES_CHANNEL,
} from "@prisma/client";

interface IOrderGetById
  extends Prisma.OrderGetPayload<{
    include: {
      items: true;
      customer: {
        omit: {
          password: true;
          updatedAt: true;
        };
      };
      orderShippingDetails: true;
    };
  }> {}

interface IOrderGetAll
  extends Prisma.OrderGetPayload<{
    include: {
      customer: {
        omit: {
          password: true;
          updatedAt: true;
          arkshFoodPoint: true;
        };
      };
      items: true;
      orderShippingDetails: false;
    };
  }> {
  items: {
    totalPrice: number;
    unitSellingPrice: number;
    specialPrice: number;
    productApproxWeight: number;
  }[];
  arkshFoodPoint: number;
  subTotalAmount: number;
  totalItems: number;
  totalAmount: number;
  discountAmount: number;
  deliveryCharge: number;
}

interface PathaoOrderResponse {
  message: string;
  type: "success" | "error";
  code: number;
  data: {
    consignment_id: string;
    merchant_order_id: number;
    order_status: string;
    delivery_fee: number;
  };
}
