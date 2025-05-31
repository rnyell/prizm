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
  useSidebar,
} from "./ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  KeyRoundIcon,
  BoxIcon,
  SunIcon,
  MonitorIcon,
  MoonIcon,
} from "lucide-react";

const themeItems = [
  { type: "light", icon: SunIcon },
  { type: "system", icon: MonitorIcon },
  { type: "dark", icon: MoonIcon },
];

function Sidemenu() {
  const { setApiKey } = useConfig();
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  console.log(state);

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
      <SidebarHeader className="pt-5 bg-zinc-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="rounded-xl" size="lg" asChild>
              <Link href="/m">
                <BoxIcon className="size-7 fill-indigo-400 stroke-zinc-800 stroke-[1.5]" />
                <div className="group-data-[collapsible=icon]:hidden">
                  Simultaneous Chat
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-100">
        <SidebarSeparator className="my-4 bg-zinc-400" />
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
                      <item.icon
                        className={cn(
                          "size-7",
                          pathname === item.url
                            ? "fill-indigo-500"
                            : "fill-zinc-800",
                        )}
                      />
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
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="p-3 flex items-center gap-4 rounded-xl border transition-[background-color] hover:bg-zinc-300 cursor-pointer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-zinc-100 group-data-[collapsible=icon]:bg-zinc-900 group-data-[collapsible=icon]:hover:bg-zinc-800">
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
          <div className="p-3 flex items-center gap-4 rounded-xl border">
            {themeItems.map((th) => (
              <div
                className={cn("h-full aspect-square flex-center rounded-full", {
                  "text-tertiary-400 light:text-tertiary-300": th.type === theme,
                })}
                onClick={() => setTheme(th.type)}
                key={th.type}
              >
                <th.icon className="size-4" />
              </div>
            ))}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Sidemenu;
