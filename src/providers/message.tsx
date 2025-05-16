"use client";

import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import type { Model, Message } from "@/lib/types";

type ChatStore = Map<Model, Message[]>;

// type SectionStore = {
//   sections: Model[];
//   messages: Message[];
// };

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

interface Context {
  chatStore: ChatStore;
  chatDispatch: Dispatch<ChatAction>;
  // sections: SectionStore;
  // setApi: Dispatch<SetStateAction<string>>;
}

interface ProviderProps {
  children: ReactNode;
}

const initialState: ChatStore = new Map();

function reducer(store: ChatStore, action: ChatAction): ChatStore {
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

// function getApiKey() {
//   try {
//     const API_KEY = localStorage.getItem("api_key");
//     if (API_KEY) {
//       return API_KEY;
//     }
//   } catch (e) {
//     console.warn(e);
//   }
// }

const MessageContext = createContext<Context | null>(null);

export function MessageProvider({ children }: ProviderProps) {
  // const [api, setApi] = useState<string | undefined>(getApiKey);
  const [chatStore, chatDispatch] = useReducer(reducer, initialState);

  console.warn("MessageProvider re-rendered");
  console.log(chatStore);

  const contextValue = {
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
