"use client";

import { useTransition } from "react";
import { readStreamableValue } from "ai/rsc";
import { toast } from "sonner";
import { useConfig, useChatContext } from "@/providers";
import { streamResponse } from "@/lib/actions";
import { generateId } from "@/lib/utils";
import { TEXTAREA_MIN_LENGTH } from "@/lib/constants";
import type { ChatType, Model } from "@/types";

export const maxDuration = 45;

export function useChat(type: ChatType, model: Model) {
  const { apiKey } = useConfig();
  const [pending, startTransition] = useTransition();

  switch (type) {
    case "single": {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { dispatch, store } = useChatContext("single");

      function appendInput(input: string) {
        dispatch({
          type: "single/append-input",
          model: model,
          content: input,
        });
      }

      function appendResponse(input: string) {
        dispatch({ type: "single/stream-init", model: model });
        startTransition(async () => {
          const result = await streamResponse(model, input, { apiKey: apiKey! });
          if (result.response) {
            for await (const delta of readStreamableValue(result.response)) {
              dispatch({
                type: "single/stream-update",
                model: model,
                delta: delta ?? "",
              });
            }
          }
          if (result.error) {
            dispatch({
              type: "single/stream-update",
              model: model,
              delta: `Error occurred while generating response. Please try again.`,
            });
          }
        });
      }

      function append(input: string) {
        if (!apiKey) {
          toast.error(
            "You must provide your API_KEY in order to chat with models.",
          );
          return;
        }
        if (input.trim().length < TEXTAREA_MIN_LENGTH) {
          const msg = "Your input should have at least 2 characters.";
          toast.warning(msg);
          return;
        }
        appendInput(input);
        appendResponse(input);
      }

      return {
        type,
        store,
        dispatch,
        pending,
        append,
        appendInput,
        appendResponse,
      };
    }
    case "multiple": {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { store, dispatch } = useChatContext("multiple");

      function appendInput(input: string) {
        dispatch({
          type: "multiple/append-input",
          model: model,
          content: input,
        });
      }

      async function appendResponse(input: string) {
        const id = generateId(12);
        dispatch({ type: "multiple/stream-init", model, id });
        try {
          const result2 = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ apiKey, model, prompt: input }),
          });

          const reader = result2.body?.getReader();
          const decoder = new TextDecoder();

          if (!reader) return;

          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((line) => line.trim());

            for (const line of lines) {
              if (line.startsWith("0:")) {
                try {
                  const delta = JSON.parse(line.slice(2));
                  dispatch({ type: "multiple/stream-update", id, delta });
                } catch (e) {
                  console.error("Error parsing chunk:", e);
                  dispatch({
                    type: "multiple/stream-update",
                    id: id,
                    delta: `Error occurred while generating response. Please try again.`,
                  });
                }
              }
            }
          }
        } catch (e) {
          console.error(e);
          dispatch({
            type: "multiple/stream-update",
            id: id,
            delta: `Error occurred while generating response. Please try again.`,
          });
        }
      }

      async function append(input: string) {
        if (!apiKey) {
          toast.error(
            "You must provide your API_KEY in order to chat with models.",
          );
          return;
        }
        if (input.trim().length < TEXTAREA_MIN_LENGTH) {
          const msg = "Your input should have at least 2 characters.";
          toast.warning(msg);
          return;
        }
        appendInput(input);
        await appendResponse(input);
      }

      return {
        type,
        store,
        dispatch,
        pending,
        append,
        appendInput,
        appendResponse,
      };
    }
  }
}
