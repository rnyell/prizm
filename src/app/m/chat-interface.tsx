"use client";

import type { DataHTMLAttributes } from "react";
import { useChatContext } from "@/providers";
import { InputWrapper, InputField } from "@/components/input-field";
import MessagesArea from "@/components/messages-area";
import ChatHeader from "./chat-header";
import type { Model } from "@/types";

interface Props extends DataHTMLAttributes<HTMLDivElement> {
  model: Model;
}

function ChatInterface({ model, ...props }: Props) {
  const { store } = useChatContext("multiple");
  const messages = store.messages.filter((msg) => msg.model === model);

  return (
    <div
      className="@container/interface pb-2 h-full overflow-hidden relative bg-background"
      {...props}
    >
      <ChatHeader model={model} />
      <MessagesArea messages={messages} />
      <InputWrapper length={messages.length}>
        <InputField type="multiple" model={model} />
      </InputWrapper>
    </div>
  );
}

export default ChatInterface;
