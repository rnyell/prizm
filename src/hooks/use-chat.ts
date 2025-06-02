"use client";

import { useTransition } from "react";
import { readStreamableValue } from "ai/rsc";
import { toast } from "sonner";
import { useConfig, useChatContext } from "@/providers";
import { streamResponse } from "@/lib/actions";
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
          type: "single/add-input",
          model: model,
          role: "user",
          content: input,
        });
      }

      function appendResponse(input: string) {
        startTransition(async () => {
          const result = await streamResponse(model, input, { apiKey: apiKey! });
          dispatch({
            type: "single/stream-init",
            model: model,
            role: "system",
          });
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
          type: "multiple/add-input",
          model: model,
          role: "user",
          content: input,
        });
      }

      function appendResponse(input: string) {
        startTransition(async () => {
          const result = await streamResponse(model, input, { apiKey: apiKey! });
          dispatch({ type: "multiple/stream-init", model });
          if (result.response) {
            for await (const delta of readStreamableValue(result.response)) {
              console.log(delta);
              dispatch({ type: "multiple/stream-update", delta: delta ?? "" });
            }
          }
          if (result.error) {
            dispatch({
              type: "multiple/stream-update",
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
  }
}
