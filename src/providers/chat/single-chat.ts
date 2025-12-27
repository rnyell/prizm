"use client";

import type { Model, Message } from "@/types";

export type Store = {
  history: Map<Model, Message[]>;
  current: Model | null;
};

export type Action =
  | { type: "single/select-model"; model: Model }
  | { type: "single/clear-messages"; model: Model }
  | { type: "single/append-input"; model: Model; content: string }
  | { type: "single/stream-init"; model: Model }
  | { type: "single/stream-update"; model: Model; delta: string }
  | {
      type: "single/add-response";
      model: Model;
      role: "system";
      content: string;
    };

export const initialStore: Store = {
  history: new Map(),
  current: null,
};

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "single/select-model": {
      return { ...store, current: action.model };
    }
    case "single/append-input": {
      const history = new Map(store.history);
      const { model, content } = action;
      const prevMessages = history.get(model) ?? [];
      const newMessage = { model, role: "user", content } as Message;
      history.set(model, [...prevMessages, newMessage]);
      return { ...store, history };
    }
    case "single/add-response": {
      const history = new Map(store.history);
      const { model, role, content } = action;
      const prevMessages = history.get(model) ?? [];
      const newMessage = { model, role, content };
      history.set(model, [...prevMessages, newMessage]);
      return { ...store, history };
    }
    case "single/stream-init": {
      const history = new Map(store.history);
      const { model } = action;
      const messages = history.get(model) ?? [];
      const initMessage = { model, role: "system", content: "" } as Message;
      history.set(model, [...messages, initMessage]);
      return { ...store, history };
    }
    case "single/stream-update": {
      const history = new Map(store.history);
      const { model, delta } = action;
      const messages = history.get(model) ?? [];
      const current = messages[messages.length - 1];
      current.content += delta;
      return { ...store, history };
    }
    case "single/clear-messages": {
      const history = new Map(store.history);
      const model = action.model;
      history.set(model, []);
      return { ...store, history };
    }
  }
}
