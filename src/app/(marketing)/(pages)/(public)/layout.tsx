import React from "react";
import { FooterSection } from "../../_components/footer";

const PublicRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      {children}
      <FooterSection />
    </main>
  );
};

export default PublicRootLayout;
