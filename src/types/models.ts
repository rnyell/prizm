export type Model =
  | "google/gemma-3-27b-it:free"
  | "google/gemini-2.0-flash-exp:free"
  | "meta-llama/llama-4-maverick:free"
  | "meta-llama/llama-4-scout:free"
  | "mistralai/mistral-small-3.1-24b-instruct:free"
  | "mistralai/devstral-small:free"
  | "nvidia/llama-3.1-nemotron-ultra-253b-v1:free"
  | "deepseek/deepseek-chat-v3-0324:free";

export type Title =
  | "gemma"
  | "gemini"
  | "maverick"
  | "scout"
  | "mistral"
  | "devstral"
  | "nemotron"
  | "deepseek";

export type Name =
  | "gemini-2.0-flash-exp"
  | "gemma-3-27b-it"
  | "llama-4-maverick"
  | "llama-4-scout"
  | "llama-3.1-nemotron-ultra-v1"
  | "mistral-small-3.1-instruct"
  | "devstral-small"
  | "deepseek-chat-v3";

export type Details = {
  model: Model;
  name: Name;
  context: number;
  overview: string;
};

export type Models = Record<Title, Details>;
