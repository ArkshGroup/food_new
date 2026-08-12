import {
  PricePlanRequest,
  PricePlanResponse,
} from "@/app/api/pathao/price-plan/route";
import { pathaoConfig } from "@/config/pathao.config";
import axios from "axios";
import { getPathaoAccessToken, invalidatePathaoTokenCache } from "./pathoo-token";

export const pathaoApi = axios.create({
  baseURL: pathaoConfig.pathaoUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

pathaoApi.interceptors.request.use(async (config) => {
  const token = await getPathaoAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

pathaoApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (typeof error.config & { _pathaoRetried?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._pathaoRetried
    ) {
      originalRequest._pathaoRetried = true;
      invalidatePathaoTokenCache();
      const token = await getPathaoAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return pathaoApi(originalRequest);
    }

    return Promise.reject(error);
  },
);

export interface City {
  city_id: number;
  city_name: string;
}

export interface Zone {
  zone_id: number;
  zone_name: string;
}

export const apiClient = axios.create({
  baseURL: "/api",
});
/* ---------- Fetchers ---------- */
export const getCities = async (): Promise<City[]> => {
  try {
    const { data } = await apiClient.get<City[]>("/pathao/cities");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getZonesByCity = async (cityId: string): Promise<Zone[]> => {
  try {
    const { data } = await apiClient.get<Zone[]>(
      `/pathao/cities/${cityId}/zones`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPricePlan = async (
  data: PricePlanRequest,
): Promise<PricePlanResponse> => {
  try {
    if (data.store_id === undefined) {
      throw new Error("Store ID is undefined");
    }
    if (!data.recipient_city && !data.recipient_zone) {
      throw new Error("City ID or Zone ID must be provided");
    }
    const { data: pricePlanData } = await apiClient.post<PricePlanResponse>(
      "/pathao/price-plan",
      data,
    );
    return pricePlanData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
