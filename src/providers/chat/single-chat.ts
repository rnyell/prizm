"use client";

import type { Model, Message } from "@/types";

export type Store = Map<Model, Message[]>;

export type Action =
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

export const initialStore: Store = new Map();

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "single/append-input": {
      const state = new Map(store);
      const { model, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage = { model, role: "user", content } as Message;
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
    case "single/add-response": {
      const state = new Map(store);
      const { model, role, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage = { model, role, content };
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
    case "single/stream-init": {
      const state = new Map(store);
      const { model } = action;
      const messages = state.get(model) ?? [];
      const initMessage = { model, role: "system", content: "" } as Message;
      state.set(model, [...messages, initMessage]);
      return state;
    }
    case "single/stream-update": {
      const state = new Map(store);
      const { model, delta } = action;
      const messages = state.get(model) ?? [];
      const current = messages[messages.length - 1];
      current.content += delta;
      return state;
    }
    case "single/clear-messages": {
      const state = new Map(store);
      const model = action.model;
      state.set(model, []);
      return state;
    }
  }
}
