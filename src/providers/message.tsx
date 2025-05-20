"use client";

import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import type { Model, Message } from "@/lib/types";

type Store = Map<Model, Message[]>;

type Action =
  | {
      type: "add_input";
      model: Model;
      role: "user";
      content: string;
    }
  | {
      type: "add_response";
      model: Model;
      role: "system";
      content: string;
    };

const initialStore: Store = new Map();

function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "add_input": {
      const state = new Map(store);
      const { model, role, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage: Message = { model, role, content };
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
    case "add_response": {
      const state = new Map(store);
      const { model, role, content } = action;
      const prevMessages = state.get(model) ?? [];
      const newMessage: Message = { model, role, content };
      state.set(model, [...prevMessages, newMessage]);
      return state;
    }
  }
}

interface Context {
  chatStore: Store;
  chatDispatch: Dispatch<Action>;
}

interface ProviderProps {
  children: ReactNode;
}

const MessageContext = createContext<Context | null>(null);

export function MessageProvider({ children }: ProviderProps) {
  const [chatStore, chatDispatch] = useReducer(reducer, initialStore);

  console.log("MessageProvider re-rendered");
  console.log(chatStore);

  const contextValue = { chatStore, chatDispatch };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("MessageContext is not provided!");
  }
  return context;
}
