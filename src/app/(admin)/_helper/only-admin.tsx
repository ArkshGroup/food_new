import { auth } from "@/lib/auth";

export const onlyAdminPage = async () => {
  const userSession = await auth();
  if (userSession?.user.role !== "ADMIN") {
    return <div>Access Denied</div>;
  }
};
