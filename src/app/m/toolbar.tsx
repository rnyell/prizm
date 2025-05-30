"use client";

import { toast } from "sonner";
import { useChatContext, useConfig } from "@/providers";
import { cn, getModelByTitle, toolbarItems } from "@/lib/utils";
import { NAVBAR_HEIGHT } from "@/styles/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Columns3Icon,
  Grid2x2Icon,
  PlusIcon,
  TextCursorInputIcon,
} from "lucide-react";
import type { Model, Title } from "@/types";

export function Toolbar() {
  return (
    <div
      className="px-4 py-2 flex items-center gap-5 text-[0.8rem] sticky z-10 top-0 border-b bg-zinc-100"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <SidebarTrigger className="cursor-pointer" />
      <div>
        <AddModelPopover />
      </div>
      <div>
        <InputFieldPopover />
      </div>
      <div className="ml-auto">
        <LayoutPicker />
      </div>
    </div>
  );
}

export function AddModelPopover() {
  const { store, dispatch } = useChatContext("multiple");
  const { models } = store;

  function modelHandler(model: Model) {
    if (models.length < 4) {
      dispatch({ type: "multiple/add_model", model });
    } else {
      toast.warning("You can chat with only four models at once.", {
        position: "top-center",
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="py-1.5 px-2 flex items-center gap-1 text-xs font-medium rounded-full border hover:bg-zinc-200 cursor-pointer">
        <PlusIcon className="size-4 stroke-[1.75]" />
        <div>Add Model</div>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="grid grid-cols-[repeat(3,max-content)] gap-x-1.5 gap-y-2">
          {toolbarItems.map((item) => {
            const title = item.name.toLowerCase() as Title;
            const model = getModelByTitle(title);
            const isSelected = models.find((m) => m === model);

            return (
              <Button
                className="px-2 py-1.5 h-[unset] gap-1 border rounded-full text-xs text-zinc-900 bg-zinc-100 hover:bg-zinc-200 cursor-cell disabled:pointer-events-auto disabled:cursor-not-allowed"
                onClick={() => modelHandler(model)}
                disabled={Boolean(isSelected)}
                key={item.name}
              >
                <item.icon className="size-3.5 fill-zinc-800" />
                {item.name}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function InputFieldPopover() {
  const { appearance, setAppearance } = useConfig();
  const { input } = appearance;

  function inputTypeHandler(input: "separate" | "sync") {
    setAppearance({ type: "input", input });
  }

  return (
    <Popover>
      <PopoverTrigger className="py-1.5 px-2 flex items-center gap-1 text-xs font-medium rounded-full border hover:bg-zinc-200 cursor-pointer">
        <TextCursorInputIcon className="size-4 stroke-[1.75]" />
        <div>Input Type</div>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-max">
        <div className="flex flex-col gap-1 text-sm">
          <div
            className={cn(
              "p-2 text-xs rounded-lg cursor-pointer",
              input === "separate"
                ? "text-zinc-100 bg-zinc-700"
                : "hover:bg-zinc-300",
            )}
            onClick={() => inputTypeHandler("separate")}
          >
            Separate
          </div>
          <div
            className={cn(
              "p-2 text-xs rounded-lg cursor-pointer",
              input === "sync"
                ? "text-zinc-100 bg-zinc-700"
                : "hover:bg-zinc-300",
            )}
            onClick={() => inputTypeHandler("sync")}
          >
            Sync
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function LayoutPicker() {
  const { appearance, setAppearance } = useConfig();
  const { layout } = appearance;

  function layoutHandler(layout: "col" | "grid") {
    setAppearance({ type: "layout", layout });
  }

  return (
    <div className="overflow-hidden flex items-center gap-px rounded-md border bg-border">
      <div
        className={cn(
          "py-1.5 px-2",
          layout === "col"
            ? "bg-zinc-700 stroke-zinc-200"
            : "bg-zinc-200 stroke-zinc-600 cursor-pointer",
        )}
        onClick={() => layoutHandler("col")}
      >
        <Columns3Icon className="size-4 stroke-inherit" />
      </div>
      <div
        className={cn(
          "py-1.5 px-2",
          layout === "grid"
            ? "bg-zinc-700 stroke-zinc-200"
            : "bg-zinc-200 stroke-zinc-600 cursor-pointer",
        )}
        onClick={() => layoutHandler("grid")}
      >
        <Grid2x2Icon className="size-4 stroke-inherit" />
      </div>
    </div>
  );
}
