import marketingService from "../../../_services/index.service";
import Link from "next/link";
import CheckOutClientWrapper from "../../../_components/checkout/check-out-client-wrapper";
export const dynamic = "force-dynamic";

const Checkout = async () => {
  const { data } = await marketingService.cart.getCartItems();
  const { data: userDetails } = await marketingService.user.getUserProfile();
  const { data: discountCode } =
    await marketingService.discount.getAllDiscountCode();

  if (!userDetails) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Not Authorized
        </h1>
        <p className="text-muted-foreground mb-6">
          Please sign in to access the checkout page.
        </p>
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  // if (!data) {
  //   redirect("/");
  // }
  // if (!(data?.length > 0)) {
  //   redirect("/");
  // }

  return (
    <>
      <CheckOutClientWrapper
        userDetails={userDetails}
        cartItems={data!}
        availableCode={discountCode}
      />
    </>
  );
};

export default Checkout;
