import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const maxDuration = 45;

export async function POST(req: Request) {
  const { model, prompt, apiKey } = await req.json();

  const openrouter = createOpenRouter({ apiKey });

  const result = streamText({
    model: openrouter(model),
    prompt,
  });

  return result.toDataStreamResponse();
}
