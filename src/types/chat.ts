import { Model } from "./models";

export type ChatType = "single" | "multiple";

export type Role = "assistant" | "user";

type UserMessage = {
  role: "user";
  status?: "edited";
};

type SystemMessage = {
  role: "assistant";
  status?: "completed" | "canceled" | "hanged";
};

export type Message = (UserMessage | SystemMessage) & {
  id?: string;
  model: Model;
  content: string;
};
