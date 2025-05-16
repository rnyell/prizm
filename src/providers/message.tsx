"use client";

import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import type { Model, Message } from "@/lib/types";

type SectionStore = {
  sections: Model[];
  messages: Message[];
};

type SectionAction =
  | { type: "add_model"; model: Model }
  | { type: "remove_model"; model: Model }
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

type ChatStore = Map<Model, Message[]>;

type ChatAction =
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

const initialSection: SectionStore = {
  sections: [],
  messages: [],
};

function sectionReducer(
  store: SectionStore,
  action: SectionAction,
): SectionStore {
  switch (action.type) {
    case "add_model": {
      const sections = [...store.sections, action.model];
      return { ...store, sections };
    }
    case "remove_model": {
      const model = action.model;
      const sections = store.sections.filter((sect) => sect !== model);
      return { ...store, sections };
    }
    case "add_input": {
      const { model, role, content } = action;
      const messages = [...store.messages, { model, role, content }];
      return { ...store, messages };
    }
    case "add_response": {
      const { model, role, content } = action;
      const messages = [...store.messages, { model, role, content }];
      return { ...store, messages };
    }
  }
}

const initialChat: ChatStore = new Map();

function chatReducer(store: ChatStore, action: ChatAction): ChatStore {
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
  sectionStore: SectionStore;
  sectionDispatch: Dispatch<SectionAction>;
  chatStore: ChatStore;
  chatDispatch: Dispatch<ChatAction>;
}

interface ProviderProps {
  children: ReactNode;
}

const MessageContext = createContext<Context | null>(null);

export function MessageProvider({ children }: ProviderProps) {
  const [sectionStore, sectionDispatch] = useReducer(
    sectionReducer,
    initialSection,
  );
  const [chatStore, chatDispatch] = useReducer(chatReducer, initialChat);

  console.log("MessageProvider re-rendered");
  console.log(chatStore);

  const contextValue = {
    sectionStore,
    sectionDispatch,
    chatStore,
    chatDispatch,
  };

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
