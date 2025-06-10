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
  Welcome to Prizm — the gateway to seamless conversations with multiple AI models. Chat, compare, and explore AI responses side-by-side.

  You can Prizm directly within Telegram as a Mini App or access it anytime via \`przm.vercel.app\`, on your phone or desktop.

  Commands:
  /start
  /help
  `;

  await bot.api.sendMessage(chatId, replyMessage, { parse_mode: "Markdown" });
});

bot.command("help", async (ctx) => {
  const chatId = ctx.chatId;
  const replyMessage = `
  To use the app:

1. First, visit [Openrouter](https://openrouter.ai/settings/keys) to get your API Key. (It's recommended to open this link outside of the Telegram app for an easier login process, as you'll need to create an account on Openrouter to obtain your key)
2. Then paste your key in the designated section in the side menu.
3. That's it! Your AI models are now ready to use.
  `;

  await bot.api.sendMessage(chatId, replyMessage, { parse_mode: "Markdown" });
});

export default bot;
