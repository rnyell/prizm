"use client";

import { createContext, use, useEffect, useReducer, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { removeLocalStorageItem, readLocalStorage } from "@/lib/utils";
import * as Multiple from "./multiple-chat";
import * as Single from "./single-chat";
import { Model } from "@/types";

type SingleChat = {
  type: "single";
  store: Single.Store;
  dispatch: Dispatch<Single.Action>;
};

type MultipleChat = {
  type: "multiple";
  store: Multiple.Store;
  dispatch: Dispatch<Multiple.Action>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSyncedSubmit: (cb: () => void) => void;
};

type Context = {
  single: SingleChat;
  multiple: MultipleChat;
};

type Props = {
  children: ReactNode;
};

export const ChatContext = createContext<Context | null>(null);

export function ChatProvider({ children }: Props) {
  const [input, setInput] = useState("");
  const [singleStore, singleDispatch] = useReducer(
    Single.reducer,
    Single.initialStore,
  );
  const [multipleStore, multipleDispatch] = useReducer(
    Multiple.reducer,
    Multiple.initialStore,
  );

  function handleSyncedSubmit(fn: () => void) {
    setInput("");
    fn();
  }

  useEffect(() => {
    const key = Multiple.MULTIPLE_MODELS_STORAGE_NAME;
    const models = readLocalStorage<Model[]>(key);
    if (models && Array.isArray(models)) {
      removeLocalStorageItem(key);
      models.forEach((model) => {
        multipleDispatch({ type: "multiple/add_model", model });
      });
    }
  }, []);

  const contextValue: Context = {
    single: {
      type: "single",
      store: singleStore,
      dispatch: singleDispatch,
    },
    multiple: {
      type: "multiple",
      store: multipleStore,
      dispatch: multipleDispatch,
      input,
      setInput,
      handleSyncedSubmit,
    },
  };

  return (
    <ChatContext.Provider data-chat-context value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(type: "single"): SingleChat;
export function useChatContext(type: "multiple"): MultipleChat;
export function useChatContext(type: "single" | "multiple") {
  const context = use(ChatContext);
  if (!context) {
    throw new Error("ChatContext is not provided correctly.");
  }
  switch (type) {
    case "single": {
      return context.single;
    }
    case "multiple": {
      return context.multiple;
    }
  }
}
