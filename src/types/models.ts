import type { JSX } from "react";

export type Model =
  | "google/gemma-3-27b-it:free"
  | "google/gemini-2.0-flash-exp:free"
  | "meta-llama/llama-4-maverick:free"
  | "meta-llama/llama-4-scout:free"
  | "meta-llama/llama-3.3-8b-instruct:free"
  | "mistralai/mistral-nemo:free"
  | "mistralai/devstral-small:free"
  | "mistralai/mistral-small-3.1-24b-instruct:free"
  | "deepseek/deepseek-chat:free"
  | "deepseek/deepseek-chat-v3-0324:free"
  | "nvidia/llama-3.1-nemotron-ultra-253b-v1:free"
  | "qwen/qwen3-14b:free";

export type Title =
  | "gemma"
  | "gemini"
  | "maverick"
  | "scout"
  | "llama-8b"
  | "nemo"
  | "devstral"
  | "mistral"
  | "deepseek"
  | "deepseek-v3"
  | "nemotron"
  | "qwen";

export type Name =
  | "gemini-2.0-flash-exp"
  | "gemma-3-27b-it"
  | "llama-4-maverick"
  | "llama-4-scout"
  | "llama-3.3-8b"
  | "mistral-small-3.1-instruct"
  | "mistral-nemo"
  | "devstral-small"
  | "deepseek-chat"
  | "deepseek-chat-v3"
  | "llama-3.1-nemotron-ultra-v1"
  | "qwen3-14b";

export type Details = {
  model: Model;
  name: Name;
  context: number;
  overview: string;
  logo?: ({ className }: { className?: string }) => JSX.Element;
};

export type Models = Record<Title, Details>;
