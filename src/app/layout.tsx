import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AppProvider } from "@/providers/app";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidemenu from "@/components/sidemenu";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: { template: "%s", default: "" },
  description: "Chat with multiple LLMs simultaneously",
  icons: {},
  openGraph: {
    type: "website",
    url: "mupt.vercel.app",
    images: undefined,
    title: "",
    description: "Chat with multiple LLMs simultaneously",
  },
};

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-mono",
});

const fontVariables = `${geistSans.variable} ${geistMono.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative ${fontVariables} antialiased`}>
        <AppProvider>
          <SidebarProvider>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-[auto_1fr]">
              <Sidemenu />
              <div>{children}</div>
              <Toaster richColors />
            </div>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  );
}
