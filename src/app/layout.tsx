import type { ReactNode } from "react";
import type { Metadata } from "next";
import { MessageProvider } from "@/providers/message";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidemenu from "@/components/sidemenu";
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: { template: "%s", default: "" },
  description: "Chat with multiple LLMs simultaneously",
  icons: {
    icon: "/seo/logo.png",
    apple: "/seo/logo.png",
  },
  openGraph: {
    type: "website",
    url: "stvts.vercel.app",
    images: "/seo/og.png",
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
      <body className={`relative bg-tertiary-950 ${fontVariables} antialiased`}>
        <MessageProvider>
          <SidebarProvider>
            <div className="w-full h-full grid grid-cols-[auto_1fr]">
              <Sidemenu />
              <div>{children}</div>
            </div>
          </SidebarProvider>
        </MessageProvider>
      </body>
    </html>
  );
}
