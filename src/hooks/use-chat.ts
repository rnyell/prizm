"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useConfig, useChatContext } from "@/providers";
import { llm as action } from "@/lib/actions";
import { TEXTAREA_MIN_LENGTH } from "@/lib/constants";
import type { ChatType, Model } from "@/types";

export function useChat(type: ChatType, model: Model) {
  const { apiKey } = useConfig();
  const [pending, startTransition] = useTransition();

  switch (type) {
    case "single": {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { dispatch, store } = useChatContext("single");

      function appendInput(input: string) {
        if (input.trim().length < TEXTAREA_MIN_LENGTH) {
          const msg = "Your input should have at least 2 characters.";
          toast.warning(msg);
          return;
        }
        dispatch({
          type: "single/add_input",
          model: model,
          role: "user",
          content: input,
        });
      }

      function appendResponse(input: string) {
        startTransition(async () => {
          const result = await action(model, input, { apiKey: apiKey! });
          if (result.response) {
            dispatch({
              type: "single/add_response",
              model: model,
              role: "system",
              content: result.response,
            });
          }
          if (result.error) {
            console.error(result.error);
            dispatch({
              type: "single/add_response",
              model: model,
              role: "system",
              content: `Error occurred while generating response. Please try again.`,
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
        appendInput(input);
        appendResponse(input);
      }

      return {
        type,
        pending,
        appendInput,
        appendResponse,
        append,
        dispatch,
        store,
      };
    }
    case "multiple": {
      // const context = use(ChatContext);
      // if (!context) {
      //   throw new Error("ChatContext is not provided correctly.");
      // }
      // const { dispatch } = context.multiple;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { dispatch, store } = useChatContext("multiple");

      function appendInput(input: string) {
        if (input.trim().length < TEXTAREA_MIN_LENGTH) {
          const msg = "Your input should have at least 2 characters.";
          toast.warning(msg);
          return;
        }
        dispatch({
          type: "multiple/add_input",
          model: model,
          role: "user",
          content: input,
        });
      }

      function appendResponse(input: string) {
        startTransition(async () => {
          const result = await action(model, input, { apiKey: apiKey! });
          if (result.response) {
            dispatch({
              type: "multiple/add_response",
              model: model,
              role: "system",
              content: result.response,
            });
          }
          if (result.error) {
            console.error(result.error);
            dispatch({
              type: "multiple/add_response",
              model: model,
              role: "system",
              content: `Error occurred while generating response. Please try again.`,
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
        appendInput(input);
        appendResponse(input);
      }

      return {
        type,
        pending,
        appendInput,
        appendResponse,
        append,
        dispatch,
        store,
      };
    }
  }
}
