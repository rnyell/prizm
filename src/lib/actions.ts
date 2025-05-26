"use server";

import type { Model } from "./types";

type Options = {
  apiKey: string;
};

export type LLMResponse = {
  response: string | null;
  error?: {
    message: string;
    cause?: string;
  };
};

export async function llm(
  model: Model,
  input: string,
  options: Options,
): Promise<LLMResponse> {
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
    console.log(data);
    const response = data.choices[0].message.content as string | null;
    return { response };
  } catch (error: unknown) {
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
