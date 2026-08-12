import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

export default function ResetPasswordEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body
        style={{ backgroundColor: "#f4f4f7", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{
            maxWidth: "480px",
            margin: "40px auto",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "32px",
          }}
        >
          <Section style={{ textAlign: "center" }}>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#222",
              }}
            >
              Reset your password
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#555", marginBottom: "24px" }}
            >
              We received a request to reset your password. Click the button
              below to set a new password.
            </Text>
            <Button
              href={resetUrl}
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "16px",
                textDecoration: "none",
                marginBottom: "24px",
                display: "inline-block",
              }}
            >
              Reset Password
            </Button>
            <Text
              style={{ fontSize: "14px", color: "#888", marginTop: "24px" }}
            >
              If you did not request a password reset, please ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
