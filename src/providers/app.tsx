"use client";

import type { ReactNode } from "react";
import { ConfigProvider } from "./config";
import { SectionProvider } from "./section";
import { MessageProvider } from "./message";

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ConfigProvider>
      <MessageProvider>
        <SectionProvider>{children}</SectionProvider>
      </MessageProvider>
    </ConfigProvider>
  );
}
