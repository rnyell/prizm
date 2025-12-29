"use client";

import { useChatContext } from "@/providers";
import { InputWrapper, UnsyncedInput } from "@/components/input-fields";
import MessagesArea from "@/components/messages-area";
import ChatHeader from "./chat-header";
import type { Model } from "@/types";

interface Props {
  model: Model;
  isScrollItem: boolean;
}

function ChatInterface({ model, isScrollItem }: Props) {
  const { store } = useChatContext("multiple");
  const messages = store.messages.filter((msg) => msg.model === model);

  return (
    <div
      className="@container/interface pb-2 h-full min-w-95 shrink-0 overflow-hidden relative bg-background data-[scroll-item=true]:shrink-0 data-[scroll-item=true]:w-full data-[scroll-item=true]:snap-start"
      data-scroll-item={isScrollItem}
    >
      <ChatHeader model={model} />
      <MessagesArea messages={messages} />
      <InputWrapper>
        <UnsyncedInput type="multiple" model={model} />
      </InputWrapper>
    </div>
  );
}

export default ChatInterface;
