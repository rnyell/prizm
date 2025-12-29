import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidemenu from "@/components/sidemenu";

interface Props {
  children: ReactNode;
}

async function SidebarLayout({ children }: Props) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider className="h-svh" defaultOpen={defaultOpen}>
      <div
        className="w-full h-full grid grid-rows-1 grid-cols-1 md:grid-cols-[auto_1fr]"
        data-sidebar-layout
      >
        <Sidemenu />
        {children}
      </div>
    </SidebarProvider>
  );
}

export { SidebarLayout };
