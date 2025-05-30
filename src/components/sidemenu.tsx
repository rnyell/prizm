"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useConfig } from "@/providers";
import { sidemenuItems } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "./ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LayoutTemplateIcon, KeyRoundIcon } from "lucide-react";

function Sidemenu() {
  const { setApiKey } = useConfig();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("api-key");
    if (typeof apiKey === "string") {
      setApiKey(apiKey);
    } else {
      alert("failed to set api key for unknown reason. please try again!");
    }
    setOpen(false);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-zinc-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="rounded-xl" size="lg" asChild>
              <Link href="/m">
                <LayoutTemplateIcon className="size-7 fill-zinc-800" />
                <div className="group-data-[collapsible=icon]:hidden">
                  Simultaneous Chat
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-100">
        <SidebarSeparator className="my-6 bg-zinc-400" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {sidemenuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    className="rounded-xl"
                    size="lg"
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link className="flex items-center gap-4" href={item.url}>
                      <item.icon className="size-7 fill-zinc-800" />
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
      <SidebarFooter className="bg-zinc-100">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="p-3 flex items-center gap-4 rounded-xl border transition-[background-color] hover:bg-zinc-300 cursor-pointer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-zinc-100 group-data-[collapsible=icon]:bg-zinc-900 group-data-[collapsible=icon]:hover:bg-zinc-800">
            <KeyRoundIcon className="size-5" />
            <div className="text-sm group-data-[collapsible=icon]:hidden">
              Set your key
            </div>
          </PopoverTrigger>
          <PopoverContent className="min-w-72 text-sm" side="right" align="end">
            <div className="leading-[1.2]">
              To obtain your API key, visit{" "}
              <Link
                className="underline"
                href="https://openrouter.ai/settings/keys"
                target="_blank"
              >
                openrouter.ai
              </Link>
            </div>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input name="api-key" placeholder="Enter your API key" />
              <Button className="ml-auto" size="sm" type="submit">
                Submit
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Sidemenu;
