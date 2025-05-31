import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GeminiIcon,
  MetaIcon,
  DeepseekIcon,
  NvidiaIcon,
  MistralIcon,
} from "@/components/icons";
import type { Model, Title, Details, Models, Name } from "@/types";

const models: Models = {
  gemini: {
    model: "google/gemini-2.0-flash-exp:free",
    name: "gemini-2.0-flash-exp",
    context: 1048576,
    overview:
      "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to Gemini Flash 1.5, while maintaining quality on par with larger models like Gemini Pro 1.5. It introduces notable enhancements in multimodal understanding, coding capabilities, complex instruction following, and function calling. These advancements come together to deliver more seamless and robust agentic experiences.",
  },
  gemma: {
    model: "google/gemma-3-27b-it:free",
    name: "gemma-3-27b-it",
    context: 96000,
    overview:
      "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 27B is Google's latest open source model, successor to Gemma 2",
  },
  maverick: {
    model: "meta-llama/llama-4-maverick:free",
    name: "llama-4-maverick",
    context: 128000,
    overview:
      "Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE) architecture with 128 experts and 17 billion active parameters per forward pass (400B total). It supports multilingual text and image input, and produces multilingual text and code output across 12 supported languages. Optimized for vision-language tasks, Maverick is instruction-tuned for assistant-like behavior, image reasoning, and general-purpose multimodal interaction.\n\nMaverick features early fusion for native multimodality and a 1 million token context window. It was trained on a curated mixture of public, licensed, and Meta-platform data, covering ~22 trillion tokens, with a knowledge cutoff in August 2024. Released on April 5, 2025 under the Llama 4 Community License, Maverick is suited for research and commercial applications requiring advanced multimodal understanding and high model throughput.",
  },
  scout: {
    model: "meta-llama/llama-4-scout:free",
    name: "llama-4-scout",
    context: 256000,
    overview:
      "Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a total of 109B. It supports native multimodal input (text and image) and multilingual output (text and code) across 12 supported languages. Designed for assistant-style interaction and visual reasoning, Scout uses 16 experts per forward pass and features a context length of 10 million tokens, with a training corpus of ~40 trillion tokens.\n\nBuilt for high efficiency and local or commercial deployment, Llama 4 Scout incorporates early fusion for seamless modality integration. It is instruction-tuned for use in multilingual chat, captioning, and image understanding tasks. Released under the Llama 4 Community License, it was last trained on data up to August 2024 and launched publicly on April 5, 2025.",
  },
  mistral: {
    model: "mistralai/mistral-small-3.1-24b-instruct:free",
    name: "mistral-small-3.1-instruct",
    context: 96000,
    overview:
      "Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text-based reasoning and vision tasks, including image analysis, programming, mathematical reasoning, and multilingual support across dozens of languages. Equipped with an extensive 128k token context window and optimized for efficient local inference, it supports use cases such as conversational agents, function calling, long-document comprehension, and privacy-sensitive deployments.",
  },
  devstral: {
    model: "mistralai/devstral-small:free",
    name: "devstral-small",
    context: 131072,
    overview:
      "Devstral-Small-2505 is a 24B parameter agentic LLM fine-tuned from Mistral-Small-3.1, jointly developed by Mistral AI and All Hands AI for advanced software engineering tasks. It is optimized for codebase exploration, multi-file editing, and integration into coding agents, achieving state-of-the-art results on SWE-Bench Verified (46.8%).\n\nDevstral supports a 128k context window and uses a custom Tekken tokenizer. It is text-only, with the vision encoder removed, and is suitable for local deployment on high-end consumer hardware (e.g., RTX 4090, 32GB RAM Macs). Devstral is best used in agentic workflows via the OpenHands scaffold and is compatible with inference frameworks like vLLM, Transformers, and Ollama. It is released under the Apache 2.0 license.",
  },
  nemotron: {
    model: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
    name: "llama-3.1-nemotron-ultra-v1",
    context: 131072,
    overview:
      "Llama-3.1-Nemotron-Ultra-253B-v1 is a large language model (LLM) optimized for advanced reasoning, human-interactive chat, retrieval-augmented generation (RAG), and tool-calling tasks. Derived from Meta’s Llama-3.1-405B-Instruct, it has been significantly customized using Neural Architecture Search (NAS), resulting in enhanced efficiency, reduced memory usage, and improved inference latency. The model supports a context length of up to 128K tokens and can operate efficiently on an 8x NVIDIA H100 node.",
  },
  deepseek: {
    model: "deepseek/deepseek-chat-v3-0324:free",
    name: "deepseek-chat-v3",
    context: 163840,
    overview:
      "DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.\n\nIt succeeds the DeepSeek V3 model and performs really well on a variety of tasks.",
  },
};

export function getModelByTitle(key: Title): Model {
  return models[key].model;
}

export function getModelName(model: Model): Name {
  for (const m in models) {
    if (models[m as Title].model === model) {
      return models[m as Title].name;
    }
  }
  throw new Error("`model` is not valid.");
}

export function getModelDetails(model: Model): Details {
  for (const m in models) {
    if (models[m as Title].model === model) {
      return models[m as Title];
    }
  }
  throw new Error("`model` is not valid.");
}

export function getModelDetailsByTitle(key: Title): Details {
  return models[key];
}

export const sidemenuItems = [
  {
    title: "Google/Gemini",
    url: "/s/gemini",
    icon: GeminiIcon,
  },
  {
    title: "Google/Gemma",
    url: "/s/gemma",
    icon: GeminiIcon,
  },
  {
    title: "Meta/Maverick",
    url: "/s/maverick",
    icon: MetaIcon,
  },
  {
    title: "Meta/Scout",
    url: "/s/scout",
    icon: MetaIcon,
  },
  {
    title: "Mistral/Small",
    url: "/s/mistral",
    icon: MistralIcon,
  },
  {
    title: "Mistral/Devstral",
    url: "/s/devstral",
    icon: MistralIcon,
  },
  {
    title: "Deepseek/Chat",
    url: "/s/deepseek",
    icon: DeepseekIcon,
  },
  {
    title: "Nvidia/Nemotron",
    url: "/s/nemotron",
    icon: NvidiaIcon,
  },
];

export const toolbarItems = [
  { name: "Gemini", icon: GeminiIcon },
  { name: "Gemma", icon: GeminiIcon },
  { name: "Scout", icon: MetaIcon },
  { name: "Maverick", icon: MetaIcon },
  { name: "Mistral", icon: MistralIcon },
  { name: "Devstral", icon: MistralIcon },
  { name: "Deepseek", icon: DeepseekIcon },
  { name: "Nemotron", icon: NvidiaIcon },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
