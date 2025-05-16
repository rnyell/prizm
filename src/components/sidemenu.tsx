"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  GeminiIcon,
  MetaIcon,
  DeepseekIcon,
  NvidiaIcon,
  MistralIcon,
} from "./icons";
import { LayoutTemplateIcon } from "lucide-react";

const items = [
  {
    title: "Gemini",
    url: "/gemini",
    icon: GeminiIcon,
  },
  {
    title: "Gemma",
    url: "/gemma",
    icon: GeminiIcon,
  },
  {
    title: "Maverick",
    url: "/maverick",
    icon: MetaIcon,
  },
  {
    title: "Scout",
    url: "/scout",
    icon: MetaIcon,
  },
  {
    title: "Deepseek",
    url: "/deepseek",
    icon: DeepseekIcon,
  },
  {
    title: "Nemotron",
    url: "/nemotron",
    icon: NvidiaIcon,
  },
  {
    title: "Mistral",
    url: "/mistral",
    icon: MistralIcon,
  },
];

function Sidemenu() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-zinc-100">
        <SidebarHeader></SidebarHeader>
        <SidebarTrigger className="absolute right-6 top-2" />
        <SidebarGroup>
          {/* <SidebarGroupLabel>Chat w/ models Simultaneously</SidebarGroupLabel> */}
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/m">
                    <div className="p-2 size-8 flex-center rounded-full bg-zinc-800">
                      <LayoutTemplateIcon className="size-full stroke-zinc-100" />
                    </div>
                    <div className="font-medium group-data-[collapsible=icon]:hidden">
                      Simultaneous Chat
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="my-8 bg-zinc-400" />
        <SidebarGroup>
          {/* <SidebarGroupLabel className="mb-4">Chat Separately</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link className="flex items-center gap-4" href={item.url}>
                      <item.icon className="size-8 fill-zinc-800" />
                      <div className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default Sidemenu;
