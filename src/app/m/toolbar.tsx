"use client";

import { toast } from "sonner";
import { useChatContext, useConfig } from "@/providers";
import { cn, getModelByTitle, toolbarItems } from "@/lib/utils";
import { TOOLBAR_HEIGHT } from "@/lib/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import ThemeToggle from "@/components/theme-toggle";
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
      className="px-4 py-2 sticky z-10 top-0 flex items-center gap-5 text-[0.8rem] border-b bg-tertiary-100 max-md:gap-4 max-sm:gap-3"
      style={{ height: TOOLBAR_HEIGHT }}
    >
      <SidebarTrigger />
      <div>
        <AddModelPopover />
      </div>
      <div>
        <InputFieldPopover />
      </div>
      <div className="ml-auto">
        <LayoutPicker />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}

export function AddModelPopover({ defaultOpen = false }) {
  const { store, dispatch } = useChatContext("multiple");
  const { models } = store;

  function handleModelSelection(model: Model) {
    if (models.length < 4) {
      if (!models.includes(model)) {
        dispatch({ type: "multiple/add-model", model });
      } else {
        dispatch({ type: "multiple/remove-model", model });
      }
    } else if (models.length === 4 && models.includes(model)) {
      dispatch({ type: "multiple/remove-model", model });
    } else {
      toast.warning("You can chat with only four models at once.", {
        position: "top-center",
      });
    }
  }

  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger className="py-1.5 px-2 flex items-center gap-1 text-xs font-medium rounded-md border border-tertiary-200 transition-[background-color] hover:bg-tertiary-200 cursor-pointer dark:text-tertiary-700 max-sm:p-1.5 max-sm:aspect-square">
        <PlusIcon className="size-4 stroke-[1.75]" />
        <div className="max-sm:hidden">Add Model</div>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="grid grid-cols-[repeat(3,max-content)] gap-x-1.5 gap-y-2">
          {toolbarItems.map((item) => {
            const title = item.name.toLowerCase() as Title;
            const model = getModelByTitle(title);
            const isSelected = Boolean(models.find((m) => m === model));

            return (
              <Button
                className="px-2 py-1.5 h-[unset] gap-1 border rounded-full text-xs text-tertiary-900 bg-tertiary-100 hover:bg-tertiary-200 cursor-pointer data-[selected=true]:bg-indigo-500 data-[selected=true]:text-zinc-100! data-[selected=true]:[&>svg]:fill-zinc-100 dark:text-tertiary-600"
                data-selected={isSelected}
                onClick={() => handleModelSelection(model)}
                key={item.name}
              >
                <item.icon className="size-3.5 fill-tertiary-800 dark:fill-tertiary-700" />
                {title === "deepseek-v3" ? "deepseek" : item.name}
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
    setAppearance({ type: "config/input", input });
  }

  return (
    <Popover>
      <PopoverTrigger className="py-1.5 px-2 flex items-center gap-1 text-xs font-medium rounded-md border border-tertiary-200 transition-[background-color] hover:bg-tertiary-200 cursor-pointer dark:text-tertiary-700 max-sm:p-1.5 max-sm:aspect-square">
        <TextCursorInputIcon className="size-4 stroke-[1.75]" />
        <div className="max-sm:hidden">Input Type</div>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-max">
        <div className="flex flex-col gap-1 text-sm dark:text-tertiary-700">
          <div
            className={cn(
              "p-2 text-xs rounded-lg cursor-pointer",
              input === "separate"
                ? "text-zinc-100 bg-indigo-500 font-medium"
                : "hover:bg-tertiary-300",
            )}
            onClick={() => inputTypeHandler("separate")}
          >
            Separate
          </div>
          <div
            className={cn(
              "p-2 text-xs rounded-lg cursor-pointer",
              input === "sync"
                ? "text-zinc-100 bg-indigo-500 font-medium"
                : "hover:bg-tertiary-300",
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

  function layoutHandler(layout: "cols" | "grid") {
    setAppearance({ type: "config/layout", layout });
  }

  return (
    <div className="overflow-hidden flex items-center gap-px rounded-md border border-tertiary-200">
      <div
        className={cn(
          "py-1.5 px-2",
          layout === "cols"
            ? "bg-tertiary-700 stroke-tertiary-200"
            : "stroke-tertiary-600 cursor-pointer",
        )}
        onClick={() => layoutHandler("cols")}
      >
        <Columns3Icon className="size-4 stroke-inherit" />
      </div>
      <div
        className={cn(
          "py-1.5 px-2",
          layout === "grid"
            ? "bg-tertiary-700 stroke-tertiary-200"
            : "stroke-tertiary-600 cursor-pointer",
        )}
        onClick={() => layoutHandler("grid")}
      >
        <Grid2x2Icon className="size-4 stroke-inherit" />
      </div>
    </div>
  );
}
