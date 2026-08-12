export interface OrderShippingDetails {
  id: number;
  orderId: string;
  recipientName: string;
  email: string;
  addressLine1: string;
  city: string;
  phoneNumber: string;
  latitude: number | null;
  longitude: number | null;
}

export interface IMyOrdersGetAll {
  id: string;
  customerId: string;
  orderNumber: number;
  subTotalAmount: number;
  totalAmount: number;
  deliveryCharge: number;
  discountAmount: number;
  updatedAt: string;
  createdAt: string;
  orderShippingDetails: OrderShippingDetails | null;
  itemsCount: number;
}
