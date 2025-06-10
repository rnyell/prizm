import { NextRequest, NextResponse } from "next/server";
import bot from "@/lib/bot";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  try {
    await bot.init();
    await bot.handleUpdate(body);
    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "failed" });
  }
};
