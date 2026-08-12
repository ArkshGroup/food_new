import { loginValidationSchema } from "@/app/(auth)/_validation/login.validation";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import "next-auth/jwt";
import { toast } from "sonner";
import { CredentialsSignin } from "next-auth";

class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } =
          await loginValidationSchema.parseAsync(credentials);
        const doesUserExist = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });
        if (!doesUserExist) {
          throw new CustomError(
            "User Email does not exist , Please create an account"
          );
        }
        const passwordMatch = await bcrypt.compare(
          password,
          doesUserExist.password
        );

        if (!passwordMatch) {
          throw new CustomError(" Password does not match");
        }
        return {
          id: doesUserExist.id,
          email: doesUserExist.email,
          name: doesUserExist.userName,
          role: doesUserExist.role,
          userName: doesUserExist.userName || undefined,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role!;
        token.userName = user.userName!;
      }
      if (trigger === "update" && session?.userName) {
        token.userName = session.userName;
      }
      return token;
    },
    session({ token, session }) {
      if (token && token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token?.role;
        session.user.userName = token.userName;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
});
