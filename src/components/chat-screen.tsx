"use client";

import { type KeyboardEvent, useState, useReducer, useTransition } from "react";
import type { Model } from "@/lib/types";
import { llm as action } from "@/lib/actions";
import { ScrollArea } from "./ui/scroll-area";
import { InputField } from "./input-field";
import ChatBlob from "./chat-blob";

interface Props {
  model: Model;
}

type Message = {
  role: "user" | "system";
  content: string;
};

type State = Message[];

type Action =
  | {
      type: "add_input";
      role: "user";
      content: string;
    }
  | {
      type: "add_response";
      role: "system";
      content: string;
    };

const initialState: State = [];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add_input": {
      const { role, content } = action;
      const entry: Message = { role, content };
      return [...state, entry];
    }
    case "add_response": {
      const { role, content } = action;
      const entry: Message = { role, content };
      return [...state, entry];
    }
  }
}

function ChatScreen({ model }: Props) {
  const [messages, dispatch] = useReducer(reducer, initialState);
  const [pending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const isChatEmpty = messages.length < 1;

  function appendInput() {
    dispatch({ type: "add_input", role: "user", content: input });
    setInput("");
  }

  function appendResponse() {
    startTransition(async () => {
      const result = await action(model, input);
      if (result.response) {
        dispatch({
          type: "add_response",
          role: "system",
          content: result.response,
        });
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
    appendInput();
    appendResponse();
  }

  return (
    <div className="p-4 pb-10 h-svh relative">
      <ScrollArea className="h-full scrollbar-thin flex flex-col gap-2">
        {!isChatEmpty &&
          messages.map((message, i) => (
            <ChatBlob role={message.role} content={message.content} key={i} />
          ))}
      </ScrollArea>
      <div
        className="mt-4 w-3/5 max-w-2xl absolute z-10 left-1/2 -translate-x-1/2 rounded-xl border-[1.5px] border-zinc-500 bg-zinc-100"
        style={{ bottom: isChatEmpty ? "50%" : "1rem" }}
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
