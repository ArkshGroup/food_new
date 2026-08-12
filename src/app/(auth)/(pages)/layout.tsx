import React from "react";

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="main-content" tabIndex={-1} className="outline-none min-h-screen w-full flex flex-col justify-center items-center bg-[#FAF8F5]">
      {children}
    </div>
  );
};

export default AuthRootLayout;
