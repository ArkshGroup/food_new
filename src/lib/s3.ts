import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

const minioConfig = {
  endpoint: "https://minio-oks404ksgws8sc0wg8kcgok0.209.50.229.110.sslip.io",
  credentials: {
    accessKeyId: "admin",
    secretAccessKey: "UAURHvZtUY25qkBuESxs1KhwU2orMNHB",
  },
  region: "us-west-1",
  forcePathStyle: true,
};

const s3 = new S3Client({
  ...minioConfig,
});

const bucketName = {
  food: "food",
  "qr-upload": "qr-upload",
};

export async function uploadToBucket({
  bucket,
  file,
  fileName,
  contentType,
}: {
  bucket: keyof typeof bucketName;
  file: any;
  fileName?: string;
  contentType?: string;
}) {
  const fileKey = fileName
    ? `${Date.now()}-${uuid()}-${fileName}`
    : `${Date.now()}-${uuid()}`;

  const arrayBuffer =
    file instanceof Buffer ? file : Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName[bucket],
      Key: fileKey,
      Body: arrayBuffer,
      ContentType: contentType || "application/octet-stream",
    })
  );

  const fileUrl = `${minioConfig.endpoint}/${bucket}/${fileKey}`;
  return { fileKey, fileUrl };
}
