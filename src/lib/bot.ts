import { join } from "node:path";
import { Bot, InlineKeyboard, InputFile } from "grammy";
// import { type ConversationFlavor, conversations } from "@grammyjs/conversations";

// const BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.BASE_URL_DEV!
//     : process.env.BASE_URL_PROD!;

const TOKEN =
  process.env.NODE_ENV === "development"
    ? process.env.BOT_TOKEN_DEV!
    : process.env.BOT_TOKEN_PROD!;

// const bot = new Bot<ConversationFlavor<Context>>(TOKEN);
// bot.use(conversations());

const bot = new Bot(TOKEN);

bot.command("start", async (ctx) => {
  const chatId = ctx.chatId;
  const message = `
Welcome to Prizm — the gateway to seamless conversations with multiple AI models\\.

You can use Prizm directly within Telegram or access it via __[przm\\.vercel\\.app](https://przm.vercel.app)__, on your phone or desktop\\.

Use /help command to learn how to activate the app

See /notes to

If you encounter any issues, please contact us through @PrizmChatSupportBot\\.
  `;

  await ctx.api.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
  });
});

bot.command("notes", async (ctx) => {
  const message = `notes`;
  await ctx.reply(message, {
    parse_mode: "MarkdownV2",
  });
});

const inlineKeyboard = new InlineKeyboard()
  .text("How to set my API Key", "apikey")
  .row()
  .text("How to use synced input", "input")
  .row();

bot.command("help", async (ctx) => {
  await ctx.reply("help", {
    reply_markup: inlineKeyboard,
  });
});

bot.callbackQuery("apikey", async (ctx) => {
  const message = `
To set your API Key:

1\\. First, visit __[Openrouter](https://openrouter.ai/settings/keys)__ to get your API Key\\. \\(It's recommended to open this link \\"outside\\" of the Telegram app for an easier login process, as you'll need to create an account on Openrouter to obtain your key\\.\\)

2\\. Then paste your key in the designated section in the sidebar\\.

3\\. That's it\\! Your AI models are now ready to use\\.
  `;

  await ctx.reply(message, {
    parse_mode: "MarkdownV2",
  });
});

bot.callbackQuery("input", async (ctx) => {
  const chatId = ctx.chatId as number;
  const imgPath = join(process.cwd(), "public", "guides", "img.jpg");
  const img = new InputFile(imgPath);
  await ctx.api.sendPhoto(chatId, img, {
    caption: `caption`,
  });
});

// bot.command("setapikey", async (ctx) => {
//   await ctx.conversation.enter("setApiKey");
// });

export { bot };

/** 
 * MarkdownV2 notes:
 * Symbols:  
    _   *   [   ]   (   )   ~   `   >   #   +   -   =   |   {   }   .   !
 * must be escaped with "\\".
*/
