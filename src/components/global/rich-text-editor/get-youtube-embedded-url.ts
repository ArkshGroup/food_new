export function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Shorts (https://youtube.com/shorts/VIDEO_ID)
    if (parsedUrl.pathname.startsWith("/shorts/")) {
      const videoId = parsedUrl.pathname.split("/")[2];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Normal watch link (https://www.youtube.com/watch?v=VIDEO_ID)
    if (parsedUrl.searchParams.has("v")) {
      return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
    }

    // Share link (https://youtu.be/VIDEO_ID)
    if (parsedUrl.hostname === "youtube") {
      const videoId = parsedUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  } catch {
    return null;
  }
}
