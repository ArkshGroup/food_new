import { NextResponse } from "next/server";
import prisma from "@/lib/db";

function shuffleInPlace<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const provided = req.headers.get("x-cron-secret");
    if (provided !== secret) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
  }

  const url = new URL(req.url);
  const countParam = url.searchParams.get("count");
  const count = Math.max(1, Math.min(50, Number(countParam ?? 12) || 12));

  // Eligible = visible + in stock. (We keep logic simple; adjust if needed.)
  const eligible = await prisma.product.findMany({
    where: {
      isVisible: true,
      stockQuantity: { gt: 0 },
    },
    select: { id: true },
  });

  const ids = shuffleInPlace(eligible.map((p) => p.id)).slice(0, count);

  await prisma.$transaction([
    prisma.product.updateMany({
      where: {
        isFlashSale: true,
        ...(ids.length > 0 ? { id: { notIn: ids } } : {}),
      },
      data: { isFlashSale: false },
    }),
    prisma.product.updateMany({
      where: { id: { in: ids } },
      data: { isFlashSale: true },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    selectedCount: ids.length,
    countRequested: count,
  });
}
