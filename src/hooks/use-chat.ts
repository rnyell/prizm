"use client";

import { useTransition } from "react";
import { generateId } from "@/lib/utils";
import type { Model } from "@/types";
import { useChatContext } from "@/providers";

export function useChat() {
  // const [messages, setMessages] = useState<Message[]>([]);
  const { dispatch } = useChatContext("multiple");
  const [pending, startTransition] = useTransition(); // TODO reconsider using `startTransition`

  function addInput(prompt: string, model: Model) {
    // const id = generateId();
    // const message: Message = { id, model, content: prompt, role: "user" };
    dispatch({ type: "multiple/append-input", model, content: prompt });
    getResponse(prompt, model);
  }

  function getResponse(prompt: string, model: Model) {
    const id = generateId();
    // const message: Message = { id, model, content: "", role: "assistant" };
    dispatch({ type: "multiple/stream-init", id, model });
    // setMessages((prev) => [...prev, message]);

    startTransition(async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ prompt, model }),
        });

        if (!res.ok) {
          // TODO thorw error
          return;
        }

        const reader = res.body?.getReader();

        if (!reader) {
          throw new Error("Response body not readable.");
        }

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          dispatch({ type: "multiple/stream-update", id, delta: chunk });
          // setMessages((prev) => {
          //   const index = prev.findIndex((m) => m.id === id);
          //   if (index === -1) {
          //     // TODO better handling
          //     return prev;
          //   }
          //   const next = [...prev];
          //   next[index] = {
          //     ...next[index],
          //     content: next[index].content + chunk,
          //   };
          //   return next;
          // });
        }
      } catch (e) {
        console.log(e);
        dispatch({
          id,
          type: "multiple/stream-update",
          delta: `Error occurred while generating response. Please try again.`,
        });
        // TODO
        // setMessages((prev) => {
        //   const index = prev.findIndex((m) => m.id === id);
        //   if (index !== -1) {
        //     prev[index].content = null
        //   }
        // });
      }
    });
  }

  return { addInput, pending };
}
