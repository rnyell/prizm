"use client";

import type { ReactNode } from "react";
import { ConfigProvider } from "./config";
import { ThemeProvider } from "./theme";
import { ChatProvider } from "./chat";

interface Props {
  children: ReactNode;
  sidebarOpenState?: boolean;
}

export function AppProvider({ children }: Props) {
  return (
    <ConfigProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <ChatProvider>{children}</ChatProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
