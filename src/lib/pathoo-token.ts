import { pathaoConfig } from "@/config/pathao.config";
import axios from "axios";

let cachedToken: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
} | null = null;

const parseTokenExpiry = (accessToken: string): number => {
  try {
    const payloadSegment = accessToken.split(".")[1];
    if (!payloadSegment) {
      return 0;
    }

    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(Buffer.from(base64, "base64").toString()) as {
      exp?: number;
    };

    if (typeof payload.exp !== "number") {
      return 0;
    }

    // Refresh one minute before JWT expiry.
    return payload.exp * 1000 - 60_000;
  } catch {
    return 0;
  }
};

const initializeCachedToken = () => {
  const jwtExpiry = parseTokenExpiry(pathaoConfig.pathaoAccessToken);

  cachedToken = {
    accessToken: pathaoConfig.pathaoAccessToken,
    refreshToken: pathaoConfig.pathaoRefreshToken,
    expiresAt: jwtExpiry || pathaoConfig.expiresAt,
  };
};

initializeCachedToken();

export const invalidatePathaoTokenCache = () => {
  if (cachedToken) {
    cachedToken.expiresAt = 0;
  }
};

export const getPathaoAccessToken = async (): Promise<string> => {
  if (cachedToken?.accessToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.accessToken;
  }

  try {
    const res = await axios.post(
      `${pathaoConfig.pathaoUrl}/aladdin/api/v1/issue-token`,
      {
        client_id: pathaoConfig.pathaoClientId,
        client_secret: pathaoConfig.pathaoClientSecret,
        grant_type: "refresh_token",
        refresh_token:
          cachedToken?.refreshToken ?? pathaoConfig.pathaoRefreshToken,
      },
      {
        timeout: 15_000,
      },
    );

    const { access_token, refresh_token, expires_in } = res.data as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

    const jwtExpiry = parseTokenExpiry(access_token);

    cachedToken = {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt:
        jwtExpiry || Date.now() + expires_in * 1000 - 60_000,
    };

    return access_token;
  } catch (err) {
    console.error("[pathao] token refresh failed");
    return pathaoConfig.pathaoAccessToken;
  }
};
