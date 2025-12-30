import type { ReactNode } from "react";
import { SidebarLayout } from "@/layouts/sidebar-layout";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  return <SidebarLayout>{children}</SidebarLayout>;
}

export default Layout;
