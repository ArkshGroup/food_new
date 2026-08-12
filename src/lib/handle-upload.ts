export const uploadImageFile = async (file: File) => {
  if (!file) {
    throw new Error("No file provided.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to upload image.");
  }

  return response.json() as Promise<{
    success: boolean;
    url: string;
    filename: string;
    message: string;
  }>;
};

export const handleImageUploadFromRichTextEditor = async (file: File) => {
  try {
    return await uploadImageFile(file);
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const isImageFile = (file: File) => {
  if (file.type.startsWith("image/")) {
    return true;
  }

  return /\.(jpe?g|png|gif|webp|bmp|svg|heic|heif)$/i.test(file.name);
};
