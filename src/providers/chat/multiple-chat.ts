"use client";

import { writeLocalStorage } from "@/lib/utils";
import type { Model, Message } from "@/types";

export const MODELS_STORAGE_NAME = "multiple/models";

export type Store = {
  models: Model[];
  messages: Message[];
  maximizedModel: Model | null;
};

export type Action =
  | { type: "multiple/add-model"; model: Model }
  | { type: "multiple/remove-model"; model: Model }
  | { type: "multiple/maximize-model"; model: Model }
  | { type: "multiple/minimize-model" }
  | { type: "multiple/append-input"; model: Model; content: string }
  | { type: "multiple/stream-init"; id: string; model: Model }
  | { type: "multiple/stream-update"; id: string; delta: string };

export const initialStore: Store = {
  models: [],
  messages: [],
  maximizedModel: null,
};

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "multiple/add-model": {
      const models = [...store.models, action.model];
      writeLocalStorage(MODELS_STORAGE_NAME, models);
      return { ...store, models };
    }
    case "multiple/remove-model": {
      const model = action.model;
      const models = store.models.filter((mod) => mod !== model);
      const messages = store.messages.filter((msg) => msg.model !== model);
      writeLocalStorage(MODELS_STORAGE_NAME, models);
      return { ...store, models, messages };
    }
    case "multiple/maximize-model": {
      return { ...store, maximizedModel: action.model };
    }
    case "multiple/minimize-model": {
      return { ...store, maximizedModel: null };
    }
    case "multiple/append-input": {
      const { model, content } = action;
      const newMessage = { model, role: "user", content } as Message;
      const messages = [...store.messages, newMessage];
      return { ...store, messages };
    }
    case "multiple/stream-init": {
      const { id, model } = action;
      const initMessage = { id, model, role: "system", content: "" } as Message;
      const messages = [...store.messages, initMessage];
      return { ...store, messages };
    }
    case "multiple/stream-update": {
      const { id, delta } = action;
      const current = store.messages.filter(
        (message) => message.id === id && message.role === "system",
      )[0];
      current.content = current.content + delta;
      const messages = store.messages;
      return { ...store, messages };
    }
  }
}
