"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useConfig } from "@/providers";
import { cn, sidemenuItems } from "@/lib/utils";
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
import { KeyRoundIcon, BoxIcon, SunIcon, MoonIcon } from "lucide-react";

function Sidemenu() {
  const { setApiKey } = useConfig();
  const { theme, setTheme } = useTheme();
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

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("light");
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="pt-5 bg-tertiary-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="rounded-xl" size="lg" asChild>
              <Link href="/m">
                <BoxIcon className="size-7 stroke-[1.5] fill-indigo-500 stroke-zinc-800 dark:fill-zinc-950 dark:stroke-indigo-400" />
                <div className="group-data-[collapsible=icon]:hidden">
                  Simultaneous Chat
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-tertiary-100">
        <SidebarSeparator className="my-4 bg-tertiary-400" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {sidemenuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    className="rounded-xl"
                    size="lg"
                    isActive={pathname === item.url}
                    asChild
                  >
                    <Link className="flex items-center gap-4" href={item.url}>
                      <item.icon
                        className={cn(
                          "size-[1.675rem]",
                          pathname === item.url
                            ? "fill-indigo-500"
                            : "fill-tertiary-800",
                        )}
                      />
                      <div className="group-data-[collapsible=icon]:hidden dark:text-tertiary-700">
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
      <SidebarFooter className="bg-tertiary-100">
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="p-3 w-full flex items-center gap-4 rounded-xl border transition-[background-color] hover:bg-tertiary-300 cursor-pointer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-tertiary-100 group-data-[collapsible=icon]:bg-tertiary-900 group-data-[collapsible=icon]:hover:bg-tertiary-800">
              <KeyRoundIcon className="size-5" />
              <div className="text-sm group-data-[collapsible=icon]:hidden">
                Set your key
              </div>
            </PopoverTrigger>
            <PopoverContent className="min-w-72 text-sm" align="end">
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
        </div>
        <div>
          <div
            className="p-3 w-full flex items-center gap-4 rounded-xl border cursor-pointer transition-[background-color] hover:bg-tertiary-300 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-tertiary-100 group-data-[collapsible=icon]:bg-tertiary-900 group-data-[collapsible=icon]:hover:bg-tertiary-800"
            onClick={toggleTheme}
          >
            <div>
              {theme === "dark" && (
                <div
                  className="flex-center rounded-full group-data-[collapsible=icon]:text-tertiary-100"
                  onClick={() => setTheme("light")}
                >
                  <SunIcon className="size-5" />
                </div>
              )}
              {theme === "light" && (
                <div
                  className="flex-center rounded-full group-data-[collapsible=icon]:text-tertiary-100"
                  onClick={() => setTheme("dark")}
                >
                  <MoonIcon className="size-5" />
                </div>
              )}
            </div>
            <div className="text-sm group-data-[collapsible=icon]:hidden">
              Theme
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Sidemenu;
