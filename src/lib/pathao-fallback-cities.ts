import { cities as fallbackCities } from "@/app/(marketing)/constant/cities.constant";

export type PathaoCity = {
  city_id: number;
  city_name: string;
};

export const getFallbackPathaoCities = (): PathaoCity[] =>
  fallbackCities.map((city) => ({
    city_id: Number(city.sn),
    city_name: city.name,
  }));
