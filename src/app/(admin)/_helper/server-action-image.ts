import { uploadToBucket } from "@/lib/s3";
import { Client } from "basic-ftp";
import { Readable } from "stream";

const PRODUCT_UPLOAD_PATH = "products";

// export async function uploadImageToAPI(
//   file: File
// ): Promise<{ url: string; key: string }> {
//   const arrayBuffer = await file.arrayBuffer();
//   if (!arrayBuffer || arrayBuffer.byteLength === 0) {
//     throw new Error("No file content provided");
//   }
//   const fileBuffer = Buffer.from(arrayBuffer);

//   // Generate Unique Filename
//   const timestamp = Date.now();
//   const randomString = Math.random().toString(36).substring(2, 15);
//   const originalName = file.name || "upload.bin";
//   const extension = originalName.includes(".")
//     ? originalName.split(".").pop()
//     : "bin";
//   const filename = `${timestamp}-${randomString}.${extension}`;
//   const remotePath = PRODUCT_UPLOAD_PATH;
//   const client = new Client();
//   client.ftp.verbose = false;

//   try {
//     await client.access({
//       host: process.env.FTP_HOST!,
//       user: process.env.FTP_USER!,
//       password: process.env.FTP_PASSWORD!,
//       port: 21,
//       secure: false,
//     });

//     await client.ensureDir(remotePath);

//     const readableStream = Readable.from(fileBuffer);
//     await client.uploadFrom(readableStream, filename);
//   } catch (ftpErr) {
//     throw new Error("FTP upload failed");
//   } finally {
//     client.close();
//   }

//   return {
//     url: `https://hotelpeaceland.com/arksh-food-images/${PRODUCT_UPLOAD_PATH}/${filename}`,
//     key: filename,
//   };
// }

export async function uploadImageToAPI(file: File) {
  const { fileUrl, fileKey } = await uploadToBucket({
    bucket: "food",
    file,
    fileName: file.name,
    contentType: file.type,
  });
  return {
    url: fileUrl,
    key: fileKey,
  };
}
