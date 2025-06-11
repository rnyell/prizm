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

/** MarkdownV2 notes:
    Symbols:  _   *   [   ]   (   )   ~   `   >   #   +   -   =   |   {   }   .   !  must be escaped. */

bot.command("start", async (ctx) => {
  const chatId = ctx.chatId;
  const message = `
Welcome to Prizm — the gateway to seamless conversations with multiple AI models\\.

You can use Prizm directly within Telegram as a Mini App or access it via __[przm\\.vercel\\.app](https://przm.vercel.app)__, on your phone or desktop\\.

Use /help command to learn how to activate the app

If you encounter any issues, please contact us through @PrizmChatSupportBot.
  `;

  await bot.api.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
  });
});

bot.command("help", async (ctx) => {
  const chatId = ctx.chatId;
  const message = `
To use the app:

1\\. First, visit __[Openrouter](https://openrouter.ai/settings/keys)__ to get your API Key\\. \\(It's recommended to open this link \\"outside\\" of the Telegram app for an easier login process, as you'll need to create an account on Openrouter to obtain your key\\.\\)

2\\. Then paste your key in the designated section in the side menu\\.

3\\. That's it\\! Your AI models are now ready to use\\.
  `;

  await bot.api.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
  });
});

export { bot };
