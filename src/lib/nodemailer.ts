import { render } from "@react-email/components";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = Number(process.env.SMTP_PORT);
const SMTP_USER = process.env.SMTP_USER as string;
const SMTP_PASS = process.env.SMTP_PASS as string;

export const runtime = "node";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  connectionTimeout: 15000,
  // logger: process.env.NODE_ENV !== "production",
  // debug: process.env.NODE_ENV !== "production",
});

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  reactComponent: React.ReactElement;
};

export async function sendEmail({
  to,
  subject,
  reactComponent,
}: SendEmailOptions) {
  try {
    await transporter.verify();

    const html = await render(reactComponent);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Arksh Food" <${SMTP_USER}>`,
      to,
      subject,
      html,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
