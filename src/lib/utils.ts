import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GeminiIcon,
  MetaIcon,
  DeepseekIcon,
  NvidiaIcon,
  MistralIcon,
  QwenIcon,
} from "@/components/icons";
import type { Model, Title, Details, Models, Name, Message } from "@/types";

export { generateId } from "ai";

export function createMarkdown(messages: Message[], model: Model) {
  let content = "";
  messages
    .filter((msg) => msg.model === model)
    .forEach((msg) => {
      if (msg.role === "user") {
        content += `${msg.content}\n\n`;
      }
      if (msg.role === "system") {
        content += `${msg.content}\n\n---\n\n`;
      }
    });
  return content;
}

export function readLocalStorage<T>(key: string): T | undefined {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      const parsedValue = JSON.parse(value);
      if (parsedValue) {
        return parsedValue as T;
      }
    }
  } catch {}
}

export function writeLocalStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO add link for all
const models: Models = {
  gemini: {
    model: "google/gemini-2.0-flash-exp:free",
    name: "gemini-flash",
    context: 1048576,
    overview:
      "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to Gemini Flash 1.5, while maintaining quality on par with larger models like Gemini Pro 1.5. It introduces notable enhancements in multimodal understanding, coding capabilities, complex instruction following, and function calling. These advancements come together to deliver more seamless and robust agentic experiences.",
    logo: GeminiIcon,
  },
  gemma: {
    model: "google/gemma-3-27b-it:free",
    name: "gemma-3",
    context: 1,
    overview:
      "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 27B is Google's latest open source model, successor to Gemma 2",
    logo: GeminiIcon,
  },
  gpt: {
    model: "openai/gpt-oss-120b:free",
    name: "gpt-oss",
    context: 1310000,
    overview:
      "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized to run on a single H100 GPU with native MXFP4 quantization. The model supports configurable reasoning depth, full chain-of-thought access, and native tool use, including function calling, browsing, and structured output generation.",
    logo: GeminiIcon,
  },
  devstral: {
    model: "mistralai/devstral-2512:free",
    name: "devstral",
    context: 262144,
    overview: `Devstral 2 is a state-of-the-art open-source model by Mistral AI specializing in agentic coding. It is a 123B-parameter dense transformer model supporting a 256K context window.\n\nDevstral 2 supports exploring codebases and orchestrating changes across multiple files while maintaining architecture-level context. It tracks framework dependencies, detects failures, and retries with corrections—solving challenges like bug fixing and modernizing legacy systems. The model can be fine-tuned to prioritize specific languages or optimize for large enterprise codebases. It is available under a modified MIT license.`,
    logo: MistralIcon,
  },
  mistral: {
    model: "mistralai/mistral-small-3.1-24b-instruct:free",
    name: "mistral",
    context: 128000,
    overview: `Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities.\n\nIt provides state-of-the-art performance in text-based reasoning and vision tasks, including image analysis, programming, mathematical reasoning, and multilingual support across dozens of languages. Equipped with an extensive 128k token context window and optimized for efficient local inference, it supports use cases such as conversational agents, function calling, long-document comprehension, and privacy-sensitive deployments.`,
    link: "https://openrouter.ai/mistralai/devstral-2512:free",
    logo: MistralIcon,
  },
  qwen: {
    model: "qwen/qwen3-coder:free",
    name: "qwen3-coder",
    context: 2620000,
    overview: `Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over repositories. The model features 480 billion total parameters, with 35 billion active per forward pass (8 out of 160 experts).\n\nPricing for the Alibaba endpoints varies by context length. Once a request is greater than 128k input tokens, the higher pricing is used.`,
    logo: QwenIcon,
  },
  deepseek: {
    model: "deepseek/deepseek-r1-0528:free",
    name: "deepseek-r1",
    context: 163840,
    overview:
      "DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous versions. Pre-trained on nearly 15 trillion tokens, the reported evaluations reveal that the model outperforms other open-source models and rivals leading closed-source models.",
    logo: DeepseekIcon,
  },
  nemotron: {
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    name: "nemotron-3-nano",
    context: 131072,
    overview: `NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems.\n\nThe model is fully open with open-weights, datasets and recipes so developers can easily customize, optimize, and deploy the model on infrastructure for maximum privacy and security.`,
    note: "Note: For the free endpoint, all prompts and output are logged to improve the provider's model and its product and services. Please do not upload any personal, confidential, or otherwise sensitive information.",
    logo: NvidiaIcon,
  },
  llama: {
    model: "meta-llama/llama-3.3-70b-instruct:free",
    name: "llama-3.3",
    context: 131000,
    overview:
      "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimized for multilingual dialogue use cases and outperforms many of the available open source and closed chat models on common industry benchmarks.",
    logo: MetaIcon,
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
    title: "Gemini",
    icon: GeminiIcon,
  },
  {
    title: "Gemma",
    icon: GeminiIcon,
  },
  {
    title: "GPT",
    icon: MistralIcon,
  },
  {
    title: "Devstral",
    icon: MistralIcon,
  },
  {
    title: "Mistral",
    icon: MistralIcon,
  },
  {
    title: "Qwen",
    icon: QwenIcon,
  },
  {
    title: "Deepseek",
    icon: DeepseekIcon,
  },
  {
    title: "Nemotron",
    icon: NvidiaIcon,
  },
];

export const toolbarItems = [
  { name: "Gemini", icon: GeminiIcon },
  { name: "Gemma", icon: GeminiIcon },
  { name: "GPT", icon: MetaIcon },
  { name: "Devstral", icon: MistralIcon },
  { name: "Mistral", icon: MistralIcon },
  { name: "Qwen", icon: QwenIcon },
  { name: "Deepseek", icon: DeepseekIcon },
  { name: "Nemotron", icon: NvidiaIcon },
  { name: "Llama", icon: MetaIcon },
];
