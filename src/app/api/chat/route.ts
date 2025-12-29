import { OpenRouter } from "@openrouter/sdk";

// openrouter.models.list;

export async function POST(req: Request) {
  // TODO TEMP => send apiKey over request by users
  const apiKey = process.env.API_KEY;
  const { model, prompt } = await req.json();

  const openrouter = new OpenRouter({ apiKey });

  // TODO send all messages
  const result = openrouter.callModel({
    model,
    input: [{ role: "user", content: prompt }],
    reasoning: null,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const delta of result.getTextStream()) {
          controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return new Response(stream);
}
