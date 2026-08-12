// app/your-page/page.tsx

import { adminService } from "@/app/(admin)/_services/index.service";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams)?.id;

  if (!id || Array.isArray(id)) {
    return <div>Invalid ID</div>;
  }
  const { data } = await adminService.discount.getDiscountUsage({
    id: Number(id),
  });
  if (!data || data.length === 0) {
    return <div>No usage data found for this discount code.</div>;
  }
  return (
    <div>
      <h1>Discount Usage</h1>
      <ul>
        {data.map((usageRecord, index) => (
          <li key={index}>
            User ID: {usageRecord.user.id}, Email: {usageRecord.user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
