import { NuqsAdapter } from "nuqs/adapters/next/app";
import type React from "react";
import { SessionProvider } from "./session-provider";
import { Toaster } from "sonner";
import TanstackQueryProvider from "./tanstack-query-provider";
import { TooltipProvider } from "../ui/tooltip";
import { SidebarProvider } from "../ui/sidebar";
import CurrencyProvider from "./currency-converesion-provider";
import ScrollToTop from "./scroll-to-top";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TanstackQueryProvider>
        <NuqsAdapter>
          <TooltipProvider>
            <SidebarProvider>
              <CurrencyProvider>
                <ScrollToTop>{children}</ScrollToTop>
              </CurrencyProvider>
            </SidebarProvider>
          </TooltipProvider>
          <Toaster
            closeButton
            duration={2000}
            position="top-right"
            offset={{
              top: 80,
            }}
            richColors
          />
        </NuqsAdapter>
      </TanstackQueryProvider>
    </SessionProvider>
  );
};

export default Provider;
