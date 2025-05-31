"use client";

import type { Model, Message } from "@/types";

export type Store = Map<Model, Message[]>;

export type Action =
  | { type: "single/clear_messages"; model: Model }
  | {
      type: "single/add_input";
      model: Model;
      role: "user";
      content: string;
    }
  | {
      type: "single/add_response";
      model: Model;
      role: "system";
      content: string;
    };

export const initialStore: Store = new Map();

export function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "single/add_input": {
      const state = new Map(store);
      const { model, role, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage: Message = { model, role, content };
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
    case "single/add_response": {
      const state = new Map(store);
      const { model, role, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage: Message = { model, role, content };
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
    case "single/clear_messages": {
      const state = new Map(store);
      const model = action.model;
      state.set(model, []);
      return state;
    }
  }
}
