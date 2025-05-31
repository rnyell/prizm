"use client";

import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme";
import { ConfigProvider } from "./config";
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
        defaultTheme="light"
        enableSystem
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
