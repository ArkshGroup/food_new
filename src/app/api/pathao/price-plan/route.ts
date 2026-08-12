import { pathaoApi } from "@/lib/axios";
import { NextResponse } from "next/server";
export interface PricePlanRequest {
  store_id: number;
  item_type: number;
  delivery_type: number;
  item_weight: number;
  recipient_city: number;
  recipient_zone: number;
}

export interface PricePlanData {
  price: number;
  discount: number;
  promo_discount: number;
  plan_id: number;
  cod_enabled: number;
  cod_percentage: number;
  additional_charge: number;
  final_price: number;
}

export interface PricePlanResponse {
  message: string;
  type: "success" | "error";
  code: number;
  data: PricePlanData;
}

export async function POST(req: Request) {
  try {
    const body: PricePlanRequest = await req.json();
    const res = await pathaoApi.post<PricePlanResponse>(
      "/aladdin/api/v1/merchant/price-plan",
      body
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Price plan error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch price plan",
        type: "error",
        code: 500,
        data: null,
      },
      { status: 500 }
    );
  }
}
