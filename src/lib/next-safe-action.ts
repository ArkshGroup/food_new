import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { auth } from "./auth";

export const baseActionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return {
        message: e.message || DEFAULT_SERVER_ERROR_MESSAGE,
        data: null,
        success: false,
      };
    }
    return {
      message: DEFAULT_SERVER_ERROR_MESSAGE,
      data: null,
      success: false,
    };
  },
});

export const publicActionClient = baseActionClient.use(async ({ next }) => {
  return next();
});

export const baseActionClientWithSession = baseActionClient.use(
  async ({ next }) => {
    const session = await auth();
    if (!session) {
      throw new Error("Session not found!");
    }
    const user = session.user;
    return next({ ctx: { user } });
  }
);

export const customerActionClient = baseActionClientWithSession.use(
  async ({ next }) => {
    const session = await auth();
    if (!session) {
      throw new Error("Customer session not found!");
    }
    return next();
  }
);

export const adminActionClient = baseActionClientWithSession.use(
  async ({ next }) => {
    const session = await auth();
    if (
      !session ||
      (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")
    ) {
      throw new Error("Admin session not found!");
    }
    return next();
  }
);
