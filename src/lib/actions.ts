"use server";

import { streamText } from "ai";
import { createStreamableValue, StreamableValue } from "@ai-sdk/rsc";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { Model } from "@/types";

type Options = {
  apiKey: string;
};

export type StreamResult = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: StreamableValue<string, any> | null;
  error?: {
    message: string;
    cause?: string;
  };
};

export async function streamResponse(
  model: Model,
  input: string,
  options: Options,
): Promise<StreamResult> {
  const { apiKey } = options;
  if (!apiKey) {
    return {
      response: null,
      error: {
        message: "No API Key is provided!",
        cause: "auth",
      },
    };
  }
  const openrouter = createOpenRouter({ apiKey });
  const stream = createStreamableValue("");
  try {
    (async () => {
      const result = streamText({
        model: openrouter(model),
        prompt: input,
        temperature: 0.45,
        onError: ({ error }) => {
          console.error("Error occured while streaming.", error);
        },
      });
      for await (const delta of result.textStream) {
        stream.update(delta);
      }
      stream.done();
    })();
    return { response: stream.value };
  } catch (error) {
    console.error(error);
    return {
      response: null,
      error: {
        message: "Something went wrong!",
        cause: "unexpected",
      },
    };
  }
}
