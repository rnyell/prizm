import { OpenRouter } from "@openrouter/sdk";

// openrouter.models.list;

export async function POST(req: Request) {
  // TODO get apiKey from `db.json` ?
  const { model, prompt, apiKey } = await req.json();

  const openrouter = new OpenRouter({ apiKey });

  // TODO send all messages to make it context-aware
  const result = openrouter.callModel({
    model,
    input: [{ role: "user", content: prompt }],
    reasoning: null,
  });

  const encoder = new TextEncoder();

  // TODO handle images
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
