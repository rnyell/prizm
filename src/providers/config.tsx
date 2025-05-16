"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface Context {
  apiKey: string | undefined;
  setApiKey: (key: string) => void;
}

const ConfigContext = createContext<Context | null>(null);

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

export function ConfigProvider({ children }: ProviderProps) {
  const [apiKey, setApiKey] = useState<string | undefined>(getApiKey);

  const contextValue = {
    apiKey,
    setApiKey: (key: string) => {
      try {
        localStorage.setItem("api-key", key);
      } catch (e) {
        console.warn(e);
      }
      setApiKey(key);
    },
  };

  return (
    <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("ConfigContext is not provided correctly.");
  }
  return context;
}
