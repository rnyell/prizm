import { Bot } from "grammy";

const TOKEN =
  process.env.NODE_ENV === "development"
    ? process.env.BOT_TOKEN_DEV!
    : process.env.BOT_TOKEN_PROD!;

// const BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.BASE_URL_DEV!
//     : process.env.BASE_URL_PROD!;

const bot = new Bot(TOKEN);

bot.command("start", async (ctx) => {
  const chatId = ctx.chatId;
  const replyMessage = `
  Welcome!
  `;

  await bot.api.sendMessage(chatId, replyMessage, { parse_mode: "Markdown" });
});

bot.command("help", async (ctx) => {
  const chatId = ctx.chatId;
  const replyMessage = `
  To use the app:

  1. First visit [openrouter](https://openrouter.ai/settings/keys) to get your API Key
  2. Then paste it in the 
  3. That's it! Your AI models are ready to use.
  `;

  await bot.api.sendMessage(chatId, replyMessage, { parse_mode: "Markdown" });
});

export default bot;
