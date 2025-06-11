import { bot } from "@/lib/bot";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    await bot.init();
    await bot.handleUpdate(body);
    return Response.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return Response.json({ status: "failed" });
  }
}
