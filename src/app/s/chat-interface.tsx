"use client";

import { useChatContext } from "@/providers";
import { InputWrapper, UnsyncedInput } from "@/components/input-fields";
import MessagesArea from "@/components/messages-area";
import type { Model } from "@/types";

interface Props {
  model: Model;
}

function ChatInterface({ model }: Props) {
  const { store } = useChatContext("single");
  const messages = store.history.get(model) ?? [];

  return (
    <div className="@container/interface pb-10 h-full relative bg-background">
      <MessagesArea messages={messages} />
      <InputWrapper>
        <UnsyncedInput type="single" model={model} />
      </InputWrapper>
    </div>
  );
}

export default ChatInterface;
