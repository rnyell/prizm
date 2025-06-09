"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConfigProvider } from "./config";
import { ThemeProvider } from "./theme";
import { ChatProvider } from "./chat";

interface Props {
  children: ReactNode;
  sidebarOpenState?: boolean;
}

export function AppProvider({ children, sidebarOpenState }: Props) {
  return (
    <ConfigProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <ChatProvider>
          <SidebarProvider className="h-svh" defaultOpen={sidebarOpenState}>
            {children}
          </SidebarProvider>
        </ChatProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
