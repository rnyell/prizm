"use client";

import type { ReactNode } from "react";
import { ConfigProvider } from "./config";
import { MessageProvider } from "./message";

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ConfigProvider>
      <MessageProvider>{children}</MessageProvider>
    </ConfigProvider>
  );
}
