"use client";

import { useChatContext } from "@/providers";
import { InputWrapper, InputField } from "@/components/input-field";
import MessagesArea from "@/components/messages-area";
import type { Model } from "@/types";

interface Props {
  model: Model;
}

function ChatInterface({ model }: Props) {
  const { store } = useChatContext("single");
  const messages = store.get(model) ?? [];
  const isEmpty = messages.length < 1;

  return (
    <div className="@container/interface pb-10 h-full relative bg-zinc-50">
      <MessagesArea messages={messages} />
      <InputWrapper isEmpty={isEmpty}>
        <InputField type="single" model={model} />
      </InputWrapper>
    </div>
  );
}

export default ChatInterface;
