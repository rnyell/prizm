import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Model } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const models = {
  gemma: "google/gemma-3-27b-it:free",
  gemini: "google/gemini-2.0-flash-exp:free",
  maverick: "meta-llama/llama-4-maverick:free",
  scout: "meta-llama/llama-4-scout:free",
  nemotron: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
  mistral: "mistralai/mistral-small-3.1-24b-instruct:free",
  deepseek: "deepseek/deepseek-chat-v3-0324:free",
} as const;

export function getModel(key: keyof typeof models): Model {
  return models[key];
}
