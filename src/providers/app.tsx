"use client";

import type { ReactNode } from "react";
import { ConfigProvider } from "./config";
import { ChatProvider } from "./chat";

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ConfigProvider>
      <ChatProvider>{children}</ChatProvider>
    </ConfigProvider>
  );
}
