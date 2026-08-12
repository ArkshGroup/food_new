import { CustomerDetailsCard } from "@/app/(admin)/_components/customer/customer-details-card";
import { OrdersTable } from "@/app/(admin)/_components/customer/order-table";
import { adminService } from "@/app/(admin)/_services/index.service";

const CustomerDetailsRootPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: res } = await adminService.customer.getCustomerById({ id });

  if (res?.data == null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-foreground">
          Customer not found.
        </h2>
      </div>
    );
  }
  const {
    data: { customer, orders },
  } = res;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Customer Details
          </h1>
          <p className="text-muted-foreground mt-1">
            View customer information and order history
          </p>
        </div>
        <CustomerDetailsCard {...customer} />
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default CustomerDetailsRootPage;
