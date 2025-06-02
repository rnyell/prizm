"use client";

import { useEffect, useState } from "react";
import { useConfig, useChatContext } from "@/providers";
import { useIsMobile } from "@/hooks";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MessagesArea from "@/components/messages-area";
import {
  InputField,
  InputWrapper,
  SyncedInputField,
} from "@/components/input-field";
import { AddModelPopover } from "./toolbar";
import ChatInterface from "./chat-interface";
import { MinimizeIcon } from "lucide-react";

function ChatsContainer() {
  const { appearance } = useConfig();
  const { store, dispatch } = useChatContext("multiple");
  const { messages, models, maximizedModel } = store;
  const maximizedMessages = messages.filter(
    (msg) => msg.model === maximizedModel,
  );
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const colStyles = {
    gridTemplateColumns: `repeat(${models.length}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
  };
  const gridStyles = {
    gridTemplateColumns: `repeat(${models.length <= 2 ? 1 : 2}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${models.length === 1 ? 1 : 2}, minmax(0, 1fr))`,
  };
  const styles = appearance.layout === "cols" ? colStyles : gridStyles;

  if (models.length === 0) {
    return (
      <div className="h-full grid place-content-center">
        <div className="p-4 text-xl">
          Add a model to get started. You can add more models later from the
          toolbar.
          <div className="mt-4 mx-auto w-max text-[0.9rem]">
            <AddModelPopover />
          </div>
        </div>
      </div>
    );
  }

  const isScrollable = appearance.layout === "cols" && isMobile;

  return (
    <div
      className={cn(
        "@container/interfaces h-full max-h-full grid gap-px bg-border translate-0",
        "data-[scrollable=true]:w-full data-[scrollable=true]:overflow-x-auto data-[scrollable=true]:snap-center data-[scrollable=true]:snap-x data-[scrollable=true]:snap-mandatory data-[scrollable=true]:flex data-[scrollable=true]:gap-[2px] data-[scrollable=true]:*:shrink-0 data-[scrollable=true]:*:w-full",
        "data-[scrollable=true]:data-[input-type=sync]:translate-none",
        appearance.layout === "grid" &&
          models.length === 3 &&
          "[&>:first-child]:col-span-2",
      )}
      data-scrollable={isScrollable}
      data-input-type={appearance.input}
      style={styles}
    >
      {models.map((model) => (
        <ChatInterface model={model} key={model} />
      ))}
      {appearance.input === "sync" && (
        <InputWrapper length={1} synced>
          <SyncedInputField />
        </InputWrapper>
      )}
      {maximizedModel && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="p-0 w-max h-max max-w-[unset]! [&>button]:hidden">
            <div className="py-3 w-[85svw] h-[95svh]">
              <div className="p-2 absolute top-4 right-4 z-50 cursor-pointer">
                <div
                  onClick={() => dispatch({ type: "multiple/minimize-model" })}
                >
                  <MinimizeIcon className="size-5 stroke-[2.25]" />
                </div>
              </div>
              <MessagesArea messages={maximizedMessages} />
              <InputWrapper className="lg:max-w-xl" length={1}>
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
