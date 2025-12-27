import type { ReactElement, ReactNode } from "react";

export type Model =
  | "google/gemini-2.0-flash-exp:free"
  | "google/gemma-3-27b-it:free"
  // | "google/gemma-3-12b-it:free"
  | "openai/gpt-oss-120b:free"
  // | "openai/gpt-oss-20b:free"
  | "mistralai/devstral-2512:free"
  // | "mistralai/mistral-7b-instruct:free"
  | "mistralai/mistral-small-3.1-24b-instruct:free"
  | "qwen/qwen3-coder:free"
  // | "qwen/qwen3-4b:free"
  // | "qwen/qwen-2.5-vl-7b-instruct:free"
  | "deepseek/deepseek-r1-0528:free"
  // | "tngtech/deepseek-r1t2-chimera:free"
  // | "tngtech/deepseek-r1t-chimera:free"
  // | "nex-agi/deepseek-v3.1-nex-n1:free"
  | "nvidia/nemotron-3-nano-30b-a3b:free"
  // | "nvidia/nemotron-nano-12b-v2-vl:free"
  | "meta-llama/llama-3.3-70b-instruct:free";

export type Title =
  | "gemini"
  | "gemma"
  | "gpt"
  | "devstral"
  | "mistral"
  | "qwen"
  | "deepseek"
  | "nemotron"
  | "llama";

export type Name =
  | "gemini-flash"
  | "gemma-3"
  | "gpt-oss"
  | "devstral"
  | "mistral"
  | "qwen3-coder"
  | "deepseek-r1"
  | "nemotron-3-nano"
  | "llama-3.3";

export type Details = {
  model: Model;
  name: Name;
  context: number;
  overview: string;
  note?: string;
  link?: string;
  logo?: ({ className }: { className?: string }) => ReactElement | ReactNode;
};

export type Models = Record<Title, Details>;
