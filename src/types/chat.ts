import { Model } from "./models";

export type ChatType = "single" | "multiple";

export type Role = "system" | "user";

export type Message = {
  model: Model;
  role: Role;
  content: string;
};
