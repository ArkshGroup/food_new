/**
 * Encodes pathname segments so Next/Image and the optimizer can fetch
 * remote URLs that contain spaces or other reserved characters.
 */
export function encodeRemoteUrlForImage(url: string): string {
  if (!url || url.startsWith("/")) return url;
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    parsed.pathname =
      "/" +
      segments
        .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
        .join("/");
    return parsed.href;
  } catch {
    return url;
  }
}
