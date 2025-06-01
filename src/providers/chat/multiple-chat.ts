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
  | { type: "multiple/add_model"; model: Model }
  | { type: "multiple/remove_model"; model: Model }
  | {
      type: "multiple/add_input";
      model: Model;
      role: "user";
      content: string;
    }
  | {
      type: "multiple/add_response";
      model: Model;
      role: "system";
      content: string;
    }
  | { type: "multiple/maximize_model"; model: Model }
  | { type: "multiple/minimize_model" };

export const initialStore: Store = {
  models: [],
  messages: [],
  maximizedModel: null,
};

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "multiple/add_model": {
      const models = [...store.models, action.model];
      writeLocalStorage(MULTIPLE_MODELS_STORAGE_NAME, models);
      return { ...store, models };
    }
    case "multiple/remove_model": {
      const model = action.model;
      const models = store.models.filter((mod) => mod !== model);
      const messages = store.messages.filter((msg) => msg.model !== model);
      writeLocalStorage(MULTIPLE_MODELS_STORAGE_NAME, models);
      return { ...store, models, messages };
    }
    case "multiple/add_input": {
      const { model, role, content } = action;
      const messages = [...store.messages, { model, role, content }];
      return { ...store, messages };
    }
    case "multiple/add_response": {
      const { model, role, content } = action;
      const messages = [...store.messages, { model, role, content }];
      return { ...store, messages };
    }
    case "multiple/maximize_model": {
      return { ...store, maximizedModel: action.model };
    }
    case "multiple/minimize_model": {
      return { ...store, maximizedModel: null };
    }
  }
}
