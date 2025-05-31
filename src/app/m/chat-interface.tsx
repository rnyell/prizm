"use client";

import { useChatContext } from "@/providers";
import { InputWrapper, InputField } from "@/components/input-field";
import MessagesArea from "@/components/messages-area";
import type { Model } from "@/types";

interface Props {
  model: Model;
}

function ChatInterface({ model }: Props) {
  const { store } = useChatContext("multiple");
  const messages = store.messages.filter((msg) => msg.model === model);

  return (
    <div className="@container/interface pb-10 h-full relative bg-background">
      <MessagesArea messages={messages} />
      <InputWrapper isEmpty={messages.length < 1}>
        <InputField type="multiple" model={model} />
      </InputWrapper>
    </div>
  );
}

export default ChatInterface;
