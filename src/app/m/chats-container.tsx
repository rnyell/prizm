"use client";

import { useEffect, useState } from "react";
import { useConfig, useChatContext } from "@/providers";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MessagesArea from "@/components/messages-area";
import {
  InputWrapper,
  InputField,
  SyncedInputField,
} from "@/components/input-field";
import { AddModelPopover } from "./toolbar";
import ChatInterface from "./chat-interface";
import { MinimizeIcon } from "lucide-react";

function ChatsContainer() {
  const [open, setOpen] = useState(false);
  const { appearance } = useConfig();
  const { store, dispatch } = useChatContext("multiple");
  const { layout, input } = appearance;
  const { messages, models, maximizedModel } = store;
  const maximizedMessages = messages.filter((m) => m.model === maximizedModel);
  const isMobile = useIsMobile();
  const isScrollableX = isMobile && layout === "cols";

  useEffect(() => {
    if (maximizedModel) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [maximizedModel]);

  useEffect(() => {
    if (open === false) {
      dispatch({ type: "multiple/minimize-model" });
    }
  }, [open, dispatch]);

  if (models.length === 0) {
    return (
      <div className="h-full grid place-content-center">
        <div className="p-4 text-xl">
          Add a model to get started. You can add more models later from the
          toolbar.
          <div className="mt-4 mx-auto w-max text-[0.9rem]">
            <AddModelPopover defaultOpen />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "@container/interfaces h-full max-h-full grid gap-px bg-border",
        "data-[layout=cols]:grid-rows-1",
        "data-[scrollable=true]:w-full data-[scrollable=true]:overflow-x-auto data-[scrollable=true]:snap-x data-[scrollable=true]:snap-proximity data-[scrollable=true]:flex data-[scrollable=true]:gap-[2px]",
        "data-[scrollable=false]:data-[input-type=sync]:translate-0 data-[input-type=sync]:overflow-y-hidden",
        "[&>[data-scroll-item=true]]:shrink-0 [&>[data-scroll-item=true]]:w-full [&>[data-scroll-item=true]]:snap-start",
        layout === "grid" && models.length === 1 ? "grid-rows-1" : "grid-rows-2",
        layout === "grid" && models.length <= 2 ? "grid-cols-1" : "grid-cols-2",
        layout === "grid" && models.length === 3
          ? "[&>:first-child]:col-span-2"
          : null,
      )}
      data-scrollable={isScrollableX}
      data-layout={layout}
      data-input-type={input}
      style={
        layout === "cols"
          ? { gridTemplateColumns: `repeat(${models.length}, minmax(0, 1fr))` }
          : undefined
      }
    >
      {models.map((model) => (
        <ChatInterface
          key={model}
          model={model}
          data-scroll-item={isScrollableX}
        />
      ))}
      {input === "sync" && (
        <InputWrapper length={1} synced>
          <SyncedInputField />
        </InputWrapper>
      )}
      {maximizedModel && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="p-0 w-max h-max max-w-[unset]! [&>button]:hidden">
            <div className="py-3 w-[80svw] h-[90svh] max-xs:w-[100svw] max-xs:h-[100svh]">
              <div className="p-2 absolute top-4 right-4 z-50 cursor-pointer">
                <div
                  onClick={() => dispatch({ type: "multiple/minimize-model" })}
                >
                  <MinimizeIcon className="size-5 stroke-[2.25]" />
                </div>
              </div>
              <MessagesArea messages={maximizedMessages} />
              <InputWrapper length={1}>
                <InputField type="multiple" model={maximizedModel} />
              </InputWrapper>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ChatsContainer;
