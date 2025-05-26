"use client";

import { useState, useTransition } from "react";
import { useConfig, useSections } from "@/providers";
import { toast } from "sonner";
import { llm as action } from "@/lib/actions";
import { getModelByFullName } from "@/lib/utils";
import { InputField, InputWrapper } from "@/components/input-field";
import MessagesArea from "@/components/messages-area";
import { XIcon } from "lucide-react";
import type { Model } from "@/lib/types";

interface Props {
  model: Model;
}

function ChatSection({ model }: Props) {
  const { apiKey } = useConfig();
  const { sectionStore, sectionDispatch } = useSections();
  const [pending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const messages = sectionStore.messages.filter((msg) => msg.model === model);
  const name = getModelByFullName(model);

  function appendInput() {
    if (input.trim().length < 2) {
      const msg = "Your input should have at least 2 characters.";
      toast.warning(msg);
      return;
    }
    sectionDispatch({
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
        sectionDispatch({
          type: "add_response",
          model: model,
          role: "system",
          content: result.response,
        });
      }
      if (result.error) {
        sectionDispatch({
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
    <div className="pb-10 h-full relative bg-background">
      <div className="p-1 flex items-center border-b">
        <div className="grow text-center text-sm font-medium">{name}</div>
        <div className="ml-auto">
          <div
            className="p-1 rounded bg-zinc-100 cursor-pointer"
            onClick={() => sectionDispatch({ type: "remove_model", model })}
          >
            <XIcon className="size-3 stroke-[2.25]" />
          </div>
        </div>
      </div>
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

export default ChatSection;
