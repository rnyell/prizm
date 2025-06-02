"use client";

import type { Model, Message } from "@/types";

export type Store = Map<Model, Message[]>;

export type Action =
  | { type: "single/clear-messages"; model: Model }
  | {
      type: "single/add-input";
      model: Model;
      role: "user";
      content: string;
    }
  | {
      type: "single/add-response";
      model: Model;
      role: "system";
      content: string;
    }
  | {
      type: "single/stream-init";
      model: Model;
      role: "system";
    }
  | {
      type: "single/stream-update";
      model: Model;
      delta: string;
    };

export const initialStore: Store = new Map();

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "single/add-input": {
      const state = new Map(store);
      const { model, role, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage = { model, role, content };
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
      const { model, role } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage = { model, role, content: "" };
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
    case "single/stream-update": {
      const state = new Map(store);
      const { model, delta } = action;
      const prevMessages = state.get(model) ?? [];
      const current = prevMessages[prevMessages.length - 1];
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
