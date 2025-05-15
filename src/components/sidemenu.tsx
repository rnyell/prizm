"use client";

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
  GoogleIcon,
  MetaIcon,
  DeepseekIcon,
  NvidiaIcon,
  MistralIcon,
} from "./icons";
import { LayoutTemplateIcon } from "lucide-react";

const items = [
  {
    title: "Gemini",
    url: "gemini",
    icon: GoogleIcon,
  },
  {
    title: "Gemma",
    url: "gemma",
    icon: GoogleIcon,
  },
  {
    title: "Maverick",
    url: "maverick",
    icon: MetaIcon,
  },
  {
    title: "Scout",
    url: "scout",
    icon: MetaIcon,
  },
  {
    title: "Deepseek",
    url: "deepseek",
    icon: DeepseekIcon,
  },
  {
    title: "Nemotron",
    url: "nemotron",
    icon: NvidiaIcon,
  },
  {
    title: "Mistral",
    url: "mistral",
    icon: MistralIcon,
  },
];

function Sidemenu() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-zinc-100">
        <SidebarHeader></SidebarHeader>
        <SidebarTrigger className="absolute -right-8 top-2" />
        <SidebarGroup>
          {/* <SidebarGroupLabel>Chat w/ models Simultaneously</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/m">
                    <div className="p-2 size-8 flex-center rounded-full bg-zinc-900">
                      <LayoutTemplateIcon className="size-full stroke-zinc-100" />
                    </div>
                    <div className="font-medium group-data-[collapsible=icon]:hidden">
                      Chat Simultaneously
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="my-4 bg-zinc-500" />
        <SidebarGroup>
          {/* <SidebarGroupLabel className="mb-4">Chat Separately</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton size="lg" asChild>
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
