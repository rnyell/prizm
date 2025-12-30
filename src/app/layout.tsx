import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AppProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";

import { Geist, Geist_Mono } from "next/font/google";

import "@/styles/globals.css";

export const metadata: Metadata = {
  applicationName: "Prizm",
  title: { template: "%s", default: "Prizm" },
  description: "Seamless conversations with multiple AI models",
  icons: {
    icon: "/seo/logo.svg",
    apple: "/seo/logo.svg",
  },
  openGraph: {
    type: "website",
    url: "przm.vercel.app",
    title: "Prizm | Multi-Model Chat Experience",
    description: `Chat with multiple AI models simultaneously and compare their responses side-by-side.`,
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

interface Props {
  children: ReactNode;
}

async function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`relative antialiased ${fontVariables}`}>
        <AppProvider>
          <div className="@container/root h-full">{children}</div>
          <Toaster richColors />
        </AppProvider>
      </body>
    </html>
  );
}

export default RootLayout;
