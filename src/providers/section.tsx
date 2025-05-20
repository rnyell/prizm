"use client";

import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import type { Model, Message } from "@/lib/types";

type Store = {
  models: Model[];
  messages: Message[];
};

type Action =
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

const initialStore: Store = {
  models: [],
  messages: [],
};

function reducer(store: Store, action: Action): Store {
  switch (action.type) {
    case "add_model": {
      const models = [...store.models, action.model];
      return { ...store, models };
    }
    case "remove_model": {
      const model = action.model;
      const models = store.models.filter((sect) => sect !== model);
      return { ...store, models };
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

interface Context {
  sectionStore: Store;
  sectionDispatch: Dispatch<Action>;
}

interface ProviderProps {
  children: ReactNode;
}

const SectionContext = createContext<Context | null>(null);

export function SectionProvider({ children }: ProviderProps) {
  const [sectionStore, sectionDispatch] = useReducer(reducer, initialStore);

  console.log("SectionProvider re-rendered");
  console.log(sectionStore);

  const contextValue = { sectionStore, sectionDispatch };

  return (
    <SectionContext.Provider value={contextValue}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSections() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("SectionContext is not provided!");
  }
  return context;
}
