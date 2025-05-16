"use server";

import type { Model } from "./types";

// const API_KEY = process.env.OPENROUTER_API_KEY;

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
  options: Options
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

// const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     model: "microsoft/phi-4-reasoning-plus:free",
//     messages: [{ role: "user", content: "question" }],
//     stream: true,
//   }),
// });

// const reader = response.body?.getReader();
// if (!reader) {
//   throw new Error("Response body is not readable");
// }

// const decoder = new TextDecoder();
// let buffer = "";

// try {
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;

//     buffer += decoder.decode(value, { stream: true });

//     while (true) {
//       const lineEnd = buffer.indexOf("\n");
//       if (lineEnd === -1) break;

//       const line = buffer.slice(0, lineEnd).trim();
//       buffer = buffer.slice(lineEnd + 1);

//       if (line.startsWith("data: ")) {
//         const data = line.slice(6);
//         if (data === "[DONE]") break;

//         try {
//           const parsed = JSON.parse(data);
//           const content = parsed.choices[0].delta.content;
//           if (content) {
//             console.log(content);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     }
//   }
// } finally {
//   reader.cancel();
// }
