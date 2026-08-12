export const runtime = "nodejs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Client } from "basic-ftp"; // <-- Import the class directly
import { Readable } from "stream";
import { auth } from "@/lib/auth";
import { uploadToBucket } from "@/lib/s3";

const QR_UPLOAD_PATH = "qr";

// export async function POST(request: NextRequest) {
//   try {
//     const user = await auth();
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const file = formData.get("image") as File;

//     if (!(file && file instanceof File)) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const extension = file.name.split(".").pop();
//     const now = new Date();
//     const formattedDate = now
//       .toISOString()
//       .replace(/T/, ":")
//       .replace(/:/g, ":")
//       .replace(/\..+/, `:${now.getSeconds()}:${now.getMilliseconds()}`);
//     const filename = `${user.user.email}-${formattedDate}.${extension}`;
//     const remotePath = QR_UPLOAD_PATH;
//     const client = new Client();
//     client.ftp.verbose = true;

//     try {
//       await client.access({
//         host: process.env.FTP_HOST,
//         user: process.env.FTP_USER,
//         password: process.env.FTP_PASSWORD,
//         port: 21,
//         secure: false,
//       });

//       await client.ensureDir(remotePath);

//       const readableStream = Readable.from(buffer);
//       await client.uploadFrom(readableStream, filename);
//     } catch (ftpErr) {
//       console.error("❌ FTP upload failed:", ftpErr);
//       return NextResponse.json({ error: "FTP upload failed" }, { status: 500 });
//     } finally {
//       client.close();
//     }

//     return NextResponse.json({
//       success: true,
//       url: `https://hotelpeaceland.com/arksh-food-images/${QR_UPLOAD_PATH}/${filename}`,
//       filename,
//       message: "✅ Successfully uploaded image to FTP",
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!(file && file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());

    const now = new Date();
    const formattedDate = now
      .toISOString()
      .replace(/T/, ":")
      .replace(/:/g, ":")
      .replace(/\..+/, `:${now.getSeconds()}:${now.getMilliseconds()}`);
    const extension = file.name.split(".").pop();
    const filename = `${user.user.email}-${formattedDate}.${extension}`;
    const res = await uploadToBucket({
      bucket: "qr-upload",
      file: buffer,
      fileName: filename,
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      url: res.fileUrl,
      filename: res.fileKey,
      message: "✅ Successfully uploaded image to FTP",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
