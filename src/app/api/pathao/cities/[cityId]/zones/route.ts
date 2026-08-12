import { pathaoApi } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cityId: string }> }
) {
  const resolvedParams = await params;

  try {
    const res = await pathaoApi.get(
      `/aladdin/api/v1/cities/${resolvedParams.cityId}/zone-list`
    );
    const zonesList =
      res?.data?.data?.data ||
      res?.data?.data ||
      res?.data;

    if (Array.isArray(zonesList)) {
      return NextResponse.json(zonesList);
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error("Error fetching zones:", error);
    return NextResponse.json([]);
  }
}
