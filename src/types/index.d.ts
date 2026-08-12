import type { Icons } from "@/components/global/icons";
import { z } from "zod";

export type ActionResponse<T> = SafeActionFn<
  { message: string; data: null; success: boolean },
  undefined,
  readonly [],
  { formErrors: string[]; fieldErrors: unknown } | undefined,
  { message: string; data: T; meta: { totalPage: number }; success: boolean }
>;

export interface IPrismaResponse<T> {
  data: T;
  meta?: {
    totalPage?: number;
    currentPage?: number;
  };
  message: string;
  success: boolean;
}
export interface SideBarSiteMap {
  name: string;
  path: string;
  icon: keyof typeof Icons;
  visible: boolean;
  subPath?: {
    name: string;
    path: string;
    icon?: keyof typeof Icons;
  }[];
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

const envVariable = z.object({
  DATABASE_URL: z.string().min(1),

  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  INQUIRY_EMAIL: z.string().email(),

  NEXT_PUBLIC_CONVERSION_RATE: z.coerce.number().int().positive(),

  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),

  NEXT_PUBLIC_PATHOO_URL: z.string().url(),
  NEXT_PUBLIC_PATHOO_STORE_ID: z.coerce.number().int().positive(),
  PATHOO_ACCESS_TOKEN: z.string().min(1),
});

envVariable.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariable> {}
  }
}
