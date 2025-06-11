import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const maxDuration = 45;

export async function POST(req: Request) {
  const { model, prompt, apiKey } = await req.json();

  const openrouter = createOpenRouter({ apiKey });

  const result = streamText({
    model: openrouter(model),
    temperature: 0.45,
    prompt,
    onError: ({ error }) => {
      console.error("Error occured while streaming.", error);
    },
  });

  return result.toDataStreamResponse();
}
