"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useConfig, useMessages } from "@/providers";
import { llm as action } from "@/lib/actions";
import { InputWrapper, InputField } from "@/components/input-field";
import MessagesArea from "@/components/messages-area";
import type { Model } from "@/lib/types";

interface Props {
  model: Model;
}

function ChatScreen({ model }: Props) {
  const { apiKey } = useConfig();
  const { chatStore, chatDispatch } = useMessages();
  const [pending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const messages = chatStore.get(model) ?? [];

  function appendInput() {
    if (input.trim().length < 2) {
      const msg = "Your input should have at least 2 characters.";
      toast.warning(msg);
      return;
    }
    chatDispatch({
      type: "add_input",
      model: model,
      role: "user",
      content: input,
    });
    setInput("");
  }

  function appendResponse() {
    startTransition(async () => {
      const result = await action(model, input, { apiKey: apiKey! });
      if (result.response) {
        chatDispatch({
          type: "add_response",
          model: model,
          role: "system",
          content: result.response,
        });
      }
      if (result.error) {
        chatDispatch({
          type: "add_response",
          model: model,
          role: "system",
          content: `Error occurred while generating response. Please try again.`,
        });
      }
    });
  }

  function appendMessage() {
    if (!apiKey) {
      const msg = "You must provide your API_KEY in order to chat with models.";
      toast.error(msg);
      return;
    }
    appendInput();
    appendResponse();
  }

  return (
    <div className="pb-10 h-full relative bg-zinc-50">
      <MessagesArea messages={messages} />
      <InputWrapper style={{ bottom: messages.length < 1 ? "50%" : "1rem" }}>
        <InputField
          value={input}
          onChange={(v) => setInput(v)}
          appendMessage={appendMessage}
          pending={pending}
        />
      </InputWrapper>
    </div>
  );
}

export default ChatScreen;
