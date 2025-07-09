"use client";

import type { Dispatch, ReactNode } from "react";
import { createContext, use, useReducer, useCallback, useEffect } from "react";
import { useLocalStorage } from "@/hooks";
import { writeLocalStorage, readLocalStorage } from "@/lib/utils";

export const APIKEY_STORAGE_NAME = "config/api-key";
const LAYOUT_STORAGE_NAME = "config/layout";
const INPUT_STORAGE_NAME = "config/input";

interface Props {
  children: ReactNode;
}

type Appearance = {
  layout: "cols" | "grid";
  input: "separate" | "sync";
};

interface Context {
  apiKey: string | undefined;
  setApiKey: (key: string) => void;
  appearance: Appearance;
  setAppearance: Dispatch<Action>;
}

type Action =
  | { type: "config/layout"; layout: "cols" | "grid" }
  | { type: "config/input"; input: "separate" | "sync" };

function reducer(store: Appearance, action: Action): Appearance {
  switch (action.type) {
    case "config/layout": {
      const layout = action.layout;
      writeLocalStorage(LAYOUT_STORAGE_NAME, layout);
      return { ...store, layout };
    }
    case "config/input": {
      const input = action.input;
      writeLocalStorage(INPUT_STORAGE_NAME, input);
      return { ...store, input };
    }
  }
}

const ConfigContext = createContext<Context | null>(null);

const initialAppearance: Appearance = {
  layout: "cols",
  input: "separate",
};

export function ConfigProvider({ children }: Props) {
  const [appearance, setAppearance] = useReducer(reducer, initialAppearance);
  const { value, writeValue, removeItem } =
    useLocalStorage<string>(APIKEY_STORAGE_NAME);

  useEffect(() => {
    const layout = readLocalStorage<"cols" | "grid">(LAYOUT_STORAGE_NAME);
    if (layout) {
      setAppearance({ type: "config/layout", layout });
    }

    const input = readLocalStorage<"separate" | "sync">(INPUT_STORAGE_NAME);
    if (input) {
      setAppearance({ type: "config/input", input });
    }
  }, []);

  const setApiKey = useCallback(
    (value: string) => {
      removeItem(APIKEY_STORAGE_NAME);
      writeValue(APIKEY_STORAGE_NAME, value);
    },
    [removeItem, writeValue],
  );

  const contextValue = {
    apiKey: value,
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
