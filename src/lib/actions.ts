"use server";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { createStreamableValue, StreamableValue } from "ai/rsc";
import type { Model } from "@/types";

type Options = {
  apiKey: string;
};

export type GeneratedResponse = {
  response: string | null;
  error?: {
    message: string;
    cause?: string;
  };
};

export async function generateResponse(
  model: Model,
  input: string,
  options: Options,
): Promise<GeneratedResponse> {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
    Authorization: `Bearer ${options.apiKey}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    model: model,
    stream: false,
    messages: [{ role: "user", content: input }],
  });
  try {
    const res = await fetch(url, { method: "POST", headers, body });
    if (!res.ok) {
      return {
        response: null,
        error: {
          message: "`res` was not ok!",
          cause: "fetch_failed",
        },
      };
    }
    const data = await res.json();
    const response = data.choices[0].message.content as string | null;
    console.dir(data, { depth: 2 });
    return { response };
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
      const { textStream } = streamText({
        model: openrouter(model),
        prompt: input,
        temperature: 0.45,
        onError: ({ error }) => {
          console.error("Error occured while streaming.", error);
        },
      });
      for await (const delta of textStream) {
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
