import { pathaoApi } from "@/lib/axios";
import { getFallbackPathaoCities } from "@/lib/pathao-fallback-cities";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await pathaoApi.get("/aladdin/api/v1/city-list");
    const citiesList =
      res?.data?.data?.data ||
      res?.data?.data ||
      res?.data;

    if (Array.isArray(citiesList) && citiesList.length > 0) {
      return NextResponse.json(citiesList);
    }
    return NextResponse.json(getFallbackPathaoCities());
  } catch (error) {
    console.error("[pathao] cities fetch failed, using fallback list", error);
    return NextResponse.json(getFallbackPathaoCities());
  }
}
