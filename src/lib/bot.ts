import { join } from "node:path";
import { Bot, Keyboard, InlineKeyboard, InputFile } from "grammy";

// const BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? process.env.BASE_URL_DEV!
//     : process.env.BASE_URL_PROD!;

const TOKEN =
  process.env.NODE_ENV === "development"
    ? process.env.BOT_TOKEN_DEV!
    : process.env.BOT_TOKEN_PROD!;

const bot = new Bot(TOKEN);

const customKeyboard = new Keyboard()
  .text("Privacy Notes")
  .row()
  .text("Support")
  .row()
  .resized();

bot.command("start", async (ctx) => {
  const chatId = ctx.chatId;
  const message = `
Welcome to Prizm — the gateway to seamless conversations with multiple AI models\\.

You can use Prizm directly within Telegram or access it via __[przm\\.vercel\\.app](https://przm.vercel.app)__\\.

Use /help command to learn how to activate and work with the app\\.


If you encounter any issues, please contact us through @PrizmChatSupportBot\\.
‌
  `;

  await ctx.api.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: customKeyboard,
  });
});

const helpMenuButtons = new InlineKeyboard()
  .text(` Setting the API Key `, "apikey")
  .row()
  .text(` A Quick Visual Guide `, "visual")
  .row()
  .text(` Syncing Input Filed `, "input")
  .row();

bot.command("help", async (ctx) => {
  const message = `
Tap any button to get detailed instructions.

For additional help or questions, feel free to message our support bot @PrizmChatSupportBot.
`;
  await ctx.reply(message, {
    reply_markup: helpMenuButtons,
  });
});

bot.callbackQuery("apikey", async (ctx) => {
  const chatId = ctx.chatId as number;
  const imgPath = join(process.cwd(), "public", "guides", "apikey.png");
  const img = new InputFile(imgPath);
  const caption = `
To set your API Key:

1\\. First, visit __[Openrouter](https://openrouter.ai/settings/keys)__ to get your API Key\\. \\(It's recommended to open this link \\"outside\\" of the Telegram app for an easier login process, as you'll need to create an account on Openrouter to obtain your key\\.\\)

2\\. Then paste your key in the designated section in the sidebar as shown in the picture\\.
  `;

  await ctx.api.sendPhoto(chatId, img, {
    caption: caption,
    parse_mode: "MarkdownV2",
  });
});

bot.callbackQuery("visual", async (ctx) => {
  const chatId = ctx.chatId as number;
  const imgPath = join(process.cwd(), "public", "guides", "visual.png");
  const img = new InputFile(imgPath);
  const caption = `A visual guide on how to utilize toolbar controls.`;
  await ctx.api.sendPhoto(chatId, img, { caption });
});

bot.callbackQuery("input", async (ctx) => {
  const chatId = ctx.chatId as number;
  const imgPath = join(process.cwd(), "public", "guides", "input.jpg");
  const img = new InputFile(imgPath);
  const caption = `
There are two kinds of input fields to interact with models:

*Separate:* Each model has its own input field, so you can chat with them individually\\.
*Sync:* Use a single input field to chat with multiple models simultaneously\\.
  `;

  await ctx.api.sendPhoto(chatId, img, {
    caption: caption,
    parse_mode: "MarkdownV2",
  });
});

/** handling custom keyboard buttons, received via `customKeyboard` */
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  if (text === "Privacy Notes") {
    const message = `
*Privacy Notes*


*No Storage*
Chat conversations are stored only temporarily in the browser's memory\\. Conversations are never sent to or saved on external servers or databases\\. Only the OpenRouter API key is stored in your browser's localStorage to maintain communication with AI models\\.

*Ephemeral Sessions*
All chat data is cleared when the app is closed, the page is refreshed, or the browser tab is exited, ensuring no chat history remains after the session ends\\. This may not provide a proper UX but this is a reasonable compromise to prioritize the privacy and keep your dumb questions asked to AI safe and unseen\\. So basically closing your browser acts as a kill\\-switch\\!
    `;

    await ctx.reply(message, {
      parse_mode: "MarkdownV2",
    });
    return;
  }

  if (text === "Support") {
    await ctx.reply("@PrizmChatSupportBot", {
      parse_mode: "MarkdownV2",
    });
    return;
  }
});

export { bot };

/** 
 * MarkdownV2 notes:
 * Symbols:  
    _   *   [   ]   (   )   ~   `   >   #   +   -   =   |   {   }   .   !
 * must be escaped with "\\".
*/
