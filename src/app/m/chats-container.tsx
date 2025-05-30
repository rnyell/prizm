"use client";

import { useEffect, useState } from "react";
import { useConfig, useChatContext } from "@/providers";
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

  useEffect(() => {
    if (maximizedModel) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [maximizedModel]);

  useEffect(() => {
    if (open === false) {
      dispatch({ type: "multiple/minimize_model" });
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
  const styles = appearance.layout === "col" ? colStyles : gridStyles;

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

  return (
    <div
      className="@container/chats h-full grid gap-px bg-border translate-0"
      style={styles}
    >
      {models.map((model) => (
        <ChatInterface model={model} key={model} />
      ))}
      {appearance.input === "sync" && (
        <InputWrapper
          className="w-4/5 fixed z-10 @lg/chats:w-2/3 @lg/chats:max-w-[720px] @xl/chats:max-w-[765px]"
          isEmpty={false}
        >
          <SyncedInputField />
        </InputWrapper>
      )}
      {maximizedModel && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[85svw] h-[95svh] max-w-[unset]! [&>button]:hidden">
            <div className="p-2 absolute top-5 left-5 z-50 cursor-pointer">
              <div onClick={() => dispatch({ type: "multiple/minimize_model" })}>
                <MinimizeIcon className="size-5 stroke-[2.25]" />
              </div>
            </div>
            <MessagesArea messages={maximizedMessages} />
            <InputWrapper className="lg:max-w-xl" isEmpty={false}>
              <InputField type="multiple" model={maximizedModel} />
            </InputWrapper>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ChatsContainer;
