import type { JSX, ReactNode } from "react";

export type Model =
  | "google/gemma-3-27b-it:free"
  | "google/gemini-2.0-flash-exp:free"
  | "meta-llama/llama-4-maverick:free"
  // | "meta-llama/llama-4-maverick-17b-128e-instruct:free"
  | "meta-llama/llama-4-scout:free"
  | "meta-llama/llama-3.3-8b-instruct:free"
  | "mistralai/mistral-nemo:free"
  | "mistralai/devstral-small-2505:free"
  | "mistralai/mistral-small-3.1-24b-instruct:free"
  | "deepseek/deepseek-chat:free"
  | "deepseek/deepseek-chat-v3-0324:free"
  | "nvidia/llama-3.3-nemotron-super-49b-v1:free"
  | "qwen/qwen3-14b:free"
  | "openrouter/cypher-alpha:free";

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
  | "qwen"
  | "cypher";

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
  | "llama-3.1-nemotron"
  | "qwen3-14b"
  | "cypher-alpha";

export type Details = {
  model: Model;
  name: Name;
  context: number;
  overview: string;
  logo?: ({ className }: { className?: string }) => JSX.Element | ReactNode;
};

export type Models = Record<Title, Details>;
