"use client";

import {
  type KeyboardEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import type { Model } from "@/lib/types";
import { llm, type LLMResponse } from "@/lib/actions";
import { AutoResizeTextarea } from "./textarea";
import ChatBlob from "./chat-blob";

interface Props {
  model: Model;
}

type Message = {
  role: "user" | "system";
  content: string;
};

const initialState: LLMResponse = {
  input: null,
  response: null,
};

function ChatScreen({ model }: Props) {
  const [state, action, pending] = useActionState(llm, initialState);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        const formDate = new FormData();
        formDate.append("model", model);
        formDate.append("input", input);
        startTransition(() => {
          action(formDate);
        });
      }
      setInput("");
    }
  }

  useEffect(() => {
    if (state.input) {
      const newMessage: Message = { role: "user", content: state.input };
      setMessages((messages) => [...messages, newMessage]);
    }
  }, [state.input]);

  useEffect(() => {
    if (state.response) {
      const newMessage: Message = { role: "system", content: state.response };
      setMessages((messages) => [...messages, newMessage]);
    }
  }, [state.response]);

  return (
    <div className="p-2">
      <div className="mt-10 flex flex-col gap-2">
        {messages.length ? (
          messages.map((message, i) => (
            <div key={i}>
              <ChatBlob role={message.role} content={message.content} />
            </div>
          ))
        ) : (
          <div>Yo!</div>
        )}
      </div>
      <div className="mt-4">
        <form action={action}>
          <input hidden readOnly name="model" value={model} />
          <AutoResizeTextarea
            name="input"
            value={input}
            onChange={(v) => setInput(v)}
            onKeyDown={handleKeyDown}
            pending={pending}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatScreen;
