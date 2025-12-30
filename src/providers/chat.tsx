"use client";

import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { readLocalStorage } from "@/lib/utils";
import { writeLocalStorage } from "@/lib/utils";
import type { Model, Message } from "@/types";

const MODELS_STORAGE_NAME = "multiple/models";

interface Props {
  children: ReactNode;
}

type Store = {
  models: Model[];
  messages: Message[];
  maximizedModel: Model | null;
};

type Action =
  | { type: "multiple/maximize-model"; model: Model }
  | { type: "multiple/minimize-model" }
  | { type: "multiple/add-model"; model: Model }
  | { type: "multiple/remove-model"; model: Model }
  | { type: "multiple/add-input"; id: string; model: Model; content: string }
  | { type: "multiple/res-init"; id: string; model: Model }
  | { type: "multiple/res-update"; id: string; delta: string };

type Context = {
  store: Store;
  dispatch: Dispatch<Action>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};

const initialStore: Store = {
  models: [],
  messages: [],
  maximizedModel: null,
};

function reducer(store: Store, action: Action): Store {
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
    case "multiple/add-input": {
      const { model, content, id } = action;
      const message = { id, model, content, role: "user" } as Message;
      const messages = [...store.messages, message];
      return { ...store, messages };
    }
    case "multiple/res-init": {
      const { id, model } = action;
      const message = { id, model, content: "", role: "assistant" } as Message;
      const messages = [...store.messages, message];
      return { ...store, messages };
    }
    case "multiple/res-update": {
      const { id, delta } = action;
      const current = store.messages.filter(
        (message) => message.id === id && message.role === "assistant",
      )[0];
      current.content = current.content + delta;
      const messages = store.messages;
      return { ...store, messages };
    }
  }
}

const ChatContext = createContext<Context | null>(null);

export function ChatProvider({ children }: Props) {
  const [input, setInput] = useState("");
  const [store, dispatch] = useReducer(reducer, initialStore);

  useEffect(() => {
    const key = MODELS_STORAGE_NAME;
    const models = readLocalStorage<Model[]>(key);
    if (Array.isArray(models)) {
      models.forEach((model) => {
        dispatch({ type: "multiple/add-model", model });
      });
    }
  }, []);

  const context: Context = {
    store,
    dispatch,
    input,
    setInput,
  };

  return (
    <ChatContext.Provider data-chat-context value={context}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("ChatContext is not provided correctly.");
  }
  return context;
}
