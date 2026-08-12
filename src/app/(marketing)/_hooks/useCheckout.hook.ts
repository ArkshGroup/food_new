export const useCheckout = (cartItems: ICartGetAll[]) => {
  const getSubTotalCount = cartItems.reduce((total, items) => {
    return total + items.product.specialPrice * items.quantity;
  }, 0);

  const getDiscountAmount = (discountAmount: number) => {
    return discountAmount;
  };

  const getTotal = getSubTotalCount + getDiscountAmount(9);
};
