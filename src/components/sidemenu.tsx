"use client";

import { type FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useConfig } from "@/providers";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { KeyRoundIcon, HomeIcon } from "lucide-react";

const menuItems = [
  {
    url: "/",
    tag: "Home",
    icon: HomeIcon,
  },
  {
    url: "/m",
    tag: "Multi",
    icon: HomeIcon,
  },
  {
    url: "/s",
    tag: "Normal",
    icon: HomeIcon,
  },
  {
    url: "/about",
    tag: "About",
    icon: HomeIcon,
  },
];

function Sidemenu() {
  const pathname = usePathname();
  const { setApiKey } = useConfig();
  const [open, setOpen] = useState(false);

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
      <div className="min-h-[10vh]"></div>
      <SidebarContent className="bg-tertiary-100">
        {/* <SidebarSeparator className="my-4 bg-tertiary-400" /> */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-6">
              {menuItems.map((item) => (
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
                        {item.tag}
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="p-3 w-full flex items-center gap-4 rounded-xl border border-tertiary-200 transition-[background-color] hover:bg-tertiary-200 cursor-pointer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:text-tertiary-100 group-data-[collapsible=icon]:bg-tertiary-900 group-data-[collapsible=icon]:hover:bg-tertiary-800">
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
              <Input
                className="placeholder:text-xs"
                name="api-key"
                placeholder="Enter your API key"
              />
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
