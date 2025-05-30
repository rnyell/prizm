"use client";

import type { Dispatch, ReactNode } from "react";
import { createContext, use, useState, useReducer, useCallback } from "react";

interface Props {
  children: ReactNode;
}

interface Context {
  apiKey: string | undefined;
  setApiKey: (key: string) => void;
  appearance: {
    layout: "col" | "grid";
    input: "separate" | "sync";
  };
  setAppearance: Dispatch<Action>;
}

type Action =
  | {
      type: "layout";
      layout: "col" | "grid";
    }
  | {
      type: "input";
      input: "separate" | "sync";
    };

type Appearance = Context["appearance"];

function reducer(store: Appearance, action: Action): Appearance {
  switch (action.type) {
    case "layout": {
      return { ...store, layout: action.layout };
    }
    case "input": {
      return { ...store, input: action.input };
    }
  }
}

function getApiKey() {
  try {
    const apiKey = localStorage.getItem("api-key");
    if (apiKey) {
      return apiKey;
    }
  } catch (e) {
    console.warn(e);
  }
}

const ConfigContext = createContext<Context | null>(null);

const initialAppearance: Appearance = {
  layout: "col",
  input: "separate",
};

export function ConfigProvider({ children }: Props) {
  const [_apiKey, _setApiKey] = useState<string | undefined>(getApiKey);
  const [appearance, setAppearance] = useReducer(reducer, initialAppearance);

  const apiKey = _apiKey;
  const setApiKey = useCallback((key: string) => {
    try {
      localStorage.removeItem("api-key");
      localStorage.setItem("api-key", key);
    } catch (e) {
      console.warn(e);
    }
    _setApiKey(key);
  }, []);

  const contextValue = {
    apiKey,
    setApiKey,
    appearance,
    setAppearance,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = use(ConfigContext);
  if (!context) {
    throw new Error("ConfigContext is not provided correctly.");
  }
  return context;
}
