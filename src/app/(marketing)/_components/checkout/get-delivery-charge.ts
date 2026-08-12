import { PricePlanData } from "@/app/api/pathao/price-plan/route";
import { countries } from "@/constant/delivery-available-countries";
import { DELIVERY_TYPE, DELIVERY_METHOD, PAYMENT_METHOD } from "@prisma/client";

export const getDeliveryCharge = ({
  deliveryMethod,
  deliveryType,
  country,
  cartItems,
  pricePlanData,
  paymentMethod,
  subtotal,
  discountAmount,
}: {
  deliveryMethod: DELIVERY_METHOD;
  deliveryType: DELIVERY_TYPE;
  paymentMethod: PAYMENT_METHOD;
  country?: string;
  pricePlanData?: PricePlanData;
  discountAmount: number;
  cartItems: ICartGetAll[];
  subtotal: number;
}) => {
  const codCashHandlingFee = (codAmount: number): number =>
    Math.round(Math.max(0, codAmount) * 0.0025); // 0.25%

  // Threshold for free shipping is based on cart value (before discounts).
  const freeShippingBasis = Math.max(0, subtotal);

  // Free shipping threshold for domestic normal delivery
  const isDomestic =
    deliveryType === "INSIDE_VALLEY" || deliveryType === "OUTSIDE_VALLEY";
  if (
    isDomestic &&
    deliveryMethod === "NORMAL_DELIVERY" &&
    freeShippingBasis >= 2500
  ) {
    const base = 0;
    if (paymentMethod === PAYMENT_METHOD.CASH_ON_DELIVERY) {
      const codAmount = Math.max(0, subtotal - discountAmount) + base;
      return base + codCashHandlingFee(codAmount);
    }
    return base;
  }

  if (
    deliveryMethod === "SELF_COURIER" ||
    deliveryMethod === "INSTANT_DELIVERY"
  ) {
    return 0;
  }

  // Weight-based delivery pricing for domestic normal delivery:
  // - Inside Valley: minimum Rs. 99 for up to 2kg
  // - Outside Valley: minimum Rs. 150 for up to 2kg
  // - Above 2kg (up to 10kg): add Rs. 50 per extra kg (rounded up)
  if (deliveryMethod === "NORMAL_DELIVERY" && isDomestic) {
    const weightKg = cartItems.reduce(
      (acc, item) =>
        acc + (item.quantity * (item.product.approxWeight || 0)) / 1000,
      0,
    );

    const minimum = deliveryType === "INSIDE_VALLEY" ? 120 : 150;
    if (weightKg <= 2) {
      const base = minimum;
      if (paymentMethod === PAYMENT_METHOD.CASH_ON_DELIVERY) {
        const codAmount = Math.max(0, subtotal - discountAmount) + base;
        return base + codCashHandlingFee(codAmount);
      }
      return base;
    }

    const extraKg = Math.ceil(Math.min(weightKg, 10) - 2);
    const base = minimum + extraKg * 50;
    if (paymentMethod === PAYMENT_METHOD.CASH_ON_DELIVERY) {
      const codAmount = Math.max(0, subtotal - discountAmount) + base;
      return base + codCashHandlingFee(codAmount);
    }
    return base;
  }
  if (deliveryType === "INSIDE_VALLEY") {
    // Non-normal delivery modes already returned above.
    return 0;
  }

  if (deliveryType === "OUTSIDE_VALLEY") {
    // Non-normal delivery modes already returned above.
    return 0;
  }

  if (deliveryType === "INTERNATIONAL") {
    const countryData = countries.find((c) => c.name === country);
    const grams = cartItems.reduce(
      (acc, item) =>
        acc + (item.quantity * (item.product.approxWeight || 0)) / 1000,
      0,
    );

    if (countryData) {
      return Math.round(countryData.base_delivery_npr * grams);
    }
  }
  return 0;
};
