"use client";

import { useTransition } from "react";
import { useChatContext } from "@/providers";
import { generateId } from "@/lib/utils";
import type { Model } from "@/types";

export function useChat() {
  const { dispatch } = useChatContext();
  const [pending, startTransition] = useTransition(); // TODO reconsider using `startTransition`

  function addInput(prompt: string, model: Model, apiKey: string) {
    const id = generateId();
    dispatch({ type: "multiple/add-input", id, model, content: prompt });
    getResponse(prompt, model, apiKey);
  }

  function getResponse(prompt: string, model: Model, apiKey: string) {
    const id = generateId();
    dispatch({ type: "multiple/res-init", id, model });

    startTransition(async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ prompt, model, apiKey }),
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
          dispatch({ type: "multiple/res-update", id, delta: chunk });
        }
      } catch (e) {
        console.log(e);
        dispatch({
          id,
          type: "multiple/res-update",
          delta: `Error occurred while generating response. Please try again.`,
        });
      }
    });
  }

  return { addInput, pending };
}
