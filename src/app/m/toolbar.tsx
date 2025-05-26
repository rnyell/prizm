"use client";

import { toast } from "sonner";
import { useSections } from "@/providers";
import { cn, getModelByName } from "@/lib/utils";
import { NAVBAR_HEIGHT } from "@/styles/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  GeminiIcon,
  MetaIcon,
  DeepseekIcon,
  NvidiaIcon,
  MistralIcon,
} from "@/components/icons";
import { Columns3Icon, Grid2x2Icon, PlusIcon } from "lucide-react";
import type { Model, ModelName } from "@/lib/types";

const items = [
  { name: "Gemini", icon: GeminiIcon },
  { name: "Gemma", icon: GeminiIcon },
  { name: "Scout", icon: MetaIcon },
  { name: "Maverick", icon: MetaIcon },
  { name: "Mistral", icon: MistralIcon },
  { name: "Deepseek", icon: DeepseekIcon },
  { name: "Nemotron", icon: NvidiaIcon },
];

function Toolbar() {
  const { sectionStore, sectionDispatch } = useSections();
  const { layout, input } = sectionStore;

  function layoutHandler(layout: "col" | "grid") {
    sectionDispatch({ type: "set_layout", layout });
  }

  function textFieldTypeHandler(input: "separate" | "unit") {
    sectionDispatch({ type: "set_textfield", input });
  }

  return (
    <div
      className={`px-4 py-2 h-[${NAVBAR_HEIGHT}px] flex items-center gap-5 text-[0.8rem] sticky z-10 top-0 border-b bg-zinc-100`}
    >
      <SidebarTrigger className="cursor-pointer" />
      <div>
        <AddModelPopover />
      </div>
      <div>
        <Popover>
          <PopoverTrigger className="py-1.5 px-2 flex items-center gap-1 rounded-full border hover:bg-zinc-200 cursor-pointer">
            <div>Input Type</div>
          </PopoverTrigger>
          <PopoverContent className="p-2.5 w-max">
            <div className="flex flex-col gap-2 text-sm">
              <div
                className={cn(
                  "text-xs cursor-pointer",
                  input === "separate" ? "" : "",
                )}
                onClick={() => textFieldTypeHandler("separate")}
              >
                Separate
              </div>
              <div
                className={cn(
                  "text-xs cursor-pointer",
                  input === "unit" ? "" : "",
                )}
                onClick={() => textFieldTypeHandler("unit")}
              >
                Unit
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
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
    </div>
  );
}

function AddModelPopover() {
  const { sectionStore, sectionDispatch } = useSections();
  const { models } = sectionStore;

  function modelHandler(model: Model) {
    if (models.length < 4) {
      sectionDispatch({ type: "add_model", model });
    } else {
      toast.warning("You can chat with only four models at once.", {
        position: "top-center",
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="py-1.5 px-2 flex items-center gap-1 rounded-full border hover:bg-zinc-200 cursor-pointer">
        <PlusIcon className="size-4 stroke-[1.5]" />
        <div>Add Model</div>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <div className="grid grid-cols-[repeat(3,max-content)] gap-x-1.5 gap-y-2">
          {items.map((item) => {
            const modelName = item.name.toLowerCase() as ModelName;
            const model = getModelByName(modelName);
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

export { Toolbar, AddModelPopover };
