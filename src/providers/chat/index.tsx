"use client";

import { createContext, use, useReducer, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import * as Multiple from "./multiple-chat";
import * as Single from "./single-chat";

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

  function handleSyncedSubmit(cb: () => void) {
    setInput("");
    cb();
  }

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
