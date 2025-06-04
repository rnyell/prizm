import type { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AppProvider } from "@/providers/app";
import Sidemenu from "@/components/sidemenu";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { template: "%s", default: "Prism" },
  description: `The Multi-Model AI Chat Experience`,
  icons: {
    icon: "/seo/logo.svg",
    apple: "/seo/logo.svg",
  },
  openGraph: {
    type: "website",
    url: "mupt.vercel.app",
    title: `The Multi-Model AI Chat Experience | Seamless Conversations with Multiple AI Models`,
    description:
      "Chat with multiple AI models simultaneously, compare their responses side-by-side in real-time. Ideal for AI research, testing, model analysis.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`relative antialiased ${fontVariables}`}>
        <AppProvider sidebarOpenState={defaultOpen}>
          <div
            className="w-full h-full grid grid-rows-1 grid-cols-1 md:grid-cols-[auto_1fr] selection:text-white selection:bg-indigo-500"
            data-root
          >
            <Sidemenu />
            <div data-children>{children}</div>
            <Toaster richColors />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
