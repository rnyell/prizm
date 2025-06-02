"use client";

import type { Model, Message } from "@/types";
import { writeLocalStorage } from "@/lib/utils";

export const MULTIPLE_MODELS_STORAGE_NAME = "multiple/models";

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
  | {
      type: "multiple/add-input";
      model: Model;
      role: "user";
      content: string;
    }
  | {
      type: "multiple/add-response";
      model: Model;
      role: "system";
      content: string;
    }
  | {
      type: "multiple/stream-init";
      model: Model;
      role: "system";
    }
  | {
      type: "multiple/stream-update";
      piece: string;
    };

export const initialStore: Store = {
  models: [],
  messages: [],
  maximizedModel: null,
};

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "multiple/add-model": {
      const models = [...store.models, action.model];
      writeLocalStorage(MULTIPLE_MODELS_STORAGE_NAME, models);
      return { ...store, models };
    }
    case "multiple/remove-model": {
      const model = action.model;
      const models = store.models.filter((mod) => mod !== model);
      const messages = store.messages.filter((msg) => msg.model !== model);
      writeLocalStorage(MULTIPLE_MODELS_STORAGE_NAME, models);
      return { ...store, models, messages };
    }
    case "multiple/add-input": {
      const { model, role, content } = action;
      const messages = [...store.messages, { model, role, content }];
      return { ...store, messages };
    }
    case "multiple/add-response": {
      const { model, role, content } = action;
      const messages = [...store.messages, { model, role, content }];
      return { ...store, messages };
    }
    case "multiple/stream-init": {
      const { model, role } = action;
      const messages = [...store.messages, { model, role, content: "" }];
      return { ...store, messages };
    }
    case "multiple/stream-update": {
      const current = store.messages[store.messages.length - 1];
      current.content += action.piece;
      return store;
    }
    case "multiple/maximize-model": {
      return { ...store, maximizedModel: action.model };
    }
    case "multiple/minimize-model": {
      return { ...store, maximizedModel: null };
    }
  }
}
