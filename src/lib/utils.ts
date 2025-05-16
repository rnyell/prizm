import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Model, ModelName, ModelDetails } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const models = {
  gemini: "google/gemini-2.0-flash-exp:free",
  gemma: "google/gemma-3-27b-it:free",
  maverick: "meta-llama/llama-4-maverick:free",
  scout: "meta-llama/llama-4-scout:free",
  nemotron: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
  mistral: "mistralai/mistral-small-3.1-24b-instruct:free",
  deepseek: "deepseek/deepseek-chat-v3-0324:free",
} as const;

export function getModelByName(key: ModelName): Model {
  return models[key];
}

const modelDetails = {
  gemini: {
    name: "gemini-2.0-flash-exp",
    context: 1048576,
    overview:
      "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to Gemini Flash 1.5, while maintaining quality on par with larger models like Gemini Pro 1.5. It introduces notable enhancements in multimodal understanding, coding capabilities, complex instruction following, and function calling. These advancements come together to deliver more seamless and robust agentic experiences.",
  },
  gemma: {
    name: "gemma-3-27b-it",
    context: 96000,
    overview:
      "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 27B is Google's latest open source model, successor to Gemma 2",
  },
  maverick: {
    name: "llama-4-maverick",
    context: 128000,
    overview:
      "Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE) architecture with 128 experts and 17 billion active parameters per forward pass (400B total). It supports multilingual text and image input, and produces multilingual text and code output across 12 supported languages. Optimized for vision-language tasks, Maverick is instruction-tuned for assistant-like behavior, image reasoning, and general-purpose multimodal interaction.\n\nMaverick features early fusion for native multimodality and a 1 million token context window. It was trained on a curated mixture of public, licensed, and Meta-platform data, covering ~22 trillion tokens, with a knowledge cutoff in August 2024. Released on April 5, 2025 under the Llama 4 Community License, Maverick is suited for research and commercial applications requiring advanced multimodal understanding and high model throughput.",
  },
  scout: {
    name: "llama-4-scout",
    context: 256000,
    overview:
      "Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a total of 109B. It supports native multimodal input (text and image) and multilingual output (text and code) across 12 supported languages. Designed for assistant-style interaction and visual reasoning, Scout uses 16 experts per forward pass and features a context length of 10 million tokens, with a training corpus of ~40 trillion tokens.\n\nBuilt for high efficiency and local or commercial deployment, Llama 4 Scout incorporates early fusion for seamless modality integration. It is instruction-tuned for use in multilingual chat, captioning, and image understanding tasks. Released under the Llama 4 Community License, it was last trained on data up to August 2024 and launched publicly on April 5, 2025.",
  },
  mistral: {
    name: "mistral-small-3.1-24b-instruct",
    context: 96000,
    overview:
      "Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text-based reasoning and vision tasks, including image analysis, programming, mathematical reasoning, and multilingual support across dozens of languages. Equipped with an extensive 128k token context window and optimized for efficient local inference, it supports use cases such as conversational agents, function calling, long-document comprehension, and privacy-sensitive deployments.",
  },
  nemotron: {
    name: "llama-3.1-nemotron-ultra-253b-v1",
    context: 131072,
    overview:
      "Llama-3.1-Nemotron-Ultra-253B-v1 is a large language model (LLM) optimized for advanced reasoning, human-interactive chat, retrieval-augmented generation (RAG), and tool-calling tasks. Derived from Meta’s Llama-3.1-405B-Instruct, it has been significantly customized using Neural Architecture Search (NAS), resulting in enhanced efficiency, reduced memory usage, and improved inference latency. The model supports a context length of up to 128K tokens and can operate efficiently on an 8x NVIDIA H100 node.",
  },
  deepseek: {
    name: "deepseek-chat-v3-0324",
    context: 163840,
    overview:
      "DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.\n\nIt succeeds the DeepSeek V3 model and performs really well on a variety of tasks.",
  },
};

export function getModelDetails(key: ModelName): ModelDetails {
  return modelDetails[key];
}
