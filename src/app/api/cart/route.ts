import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Assuming you have access to prisma and revalidateTag in this context
  const userId = session.user.id;
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  let cartCount = 0;
  if (cart) {
    cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  return NextResponse.json({ count: cartCount }, { status: 200 });
}
