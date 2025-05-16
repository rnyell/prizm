"use client";

import { type KeyboardEvent, useState, useTransition } from "react";
import { useConfig, useMessages } from "@/providers";
import { toast } from "sonner";
import { llm as action } from "@/lib/actions";
import { ScrollArea } from "./ui/scroll-area";
import { InputField } from "./input-field";
import ChatBlob from "./chat-blob";
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
    chatDispatch({
      type: "add_input",
      model: model,
      role: "user",
      content: input,
    });
    setInput("");
  }

  function appendResponse() {
    if (!apiKey) {
      const msg = "You must provide your API_KEY in order to chat with models.";
      toast.error(msg);
      return;
    }
    startTransition(async () => {
      const result = await action(model, input, { apiKey });
      if (result.response) {
        chatDispatch({
          type: "add_response",
          model: model,
          role: "system",
          content: result.response,
        });
        if (result.error) {
          chatDispatch({
            type: "add_response",
            model: model,
            role: "system",
            content: `Error occurred while generating response. Please try again.`,
          });
        }
      }
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      appendInput();
      appendResponse();
    }
  }

  function handleClick() {
    if (!apiKey) {
      const msg = "You must provide your API_KEY in order to chat with models.";
      toast.error(msg);
      return;
    }
    appendInput();
    appendResponse();
  }

  return (
    <div className="p-4 pb-10 h-[calc(100svh-65px)] relative bg-zinc-50">
      <ScrollArea className="mx-auto max-w-4xl h-full scrollbar-thin flex flex-col gap-2">
        {messages.length >= 1 &&
          messages.map((message, i) => (
            <ChatBlob role={message.role} content={message.content} key={i} />
          ))}
      </ScrollArea>
      <div
        className="mt-4 w-3/5 max-w-2xl absolute z-10 left-1/2 -translate-x-1/2 rounded-xl border-[1.5px] border-zinc-500 bg-zinc-100"
        style={{ bottom: messages.length < 1 ? "50%" : "1rem" }}
      >
        <InputField
          value={input}
          onChange={(v) => setInput(v)}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          pending={pending}
        />
      </div>
    </div>
  );
}

export default ChatScreen;
