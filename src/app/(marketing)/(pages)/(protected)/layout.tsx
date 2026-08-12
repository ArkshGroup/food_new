import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";
const CustomerProtectedRootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const isAuthenticated = await auth();

  // console.log("isAuthenticated:", isAuthenticated);
  // if (!isAuthenticated) {
  //   redirect("/auth/login");
  // }

  return (
    <div id="main-content" tabIndex={-1} className="outline-none">
      {children}
    </div>
  );
};

export default CustomerProtectedRootLayout;
