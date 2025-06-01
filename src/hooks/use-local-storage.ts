"use client";

import { useState, useCallback } from "react";
import { readLocalStorage, writeLocalStorage } from "@/lib/utils";

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(() => {
    if (initialValue !== undefined) {
      const _value = readLocalStorage(key);
      if (_value === null) {
        writeLocalStorage(key, initialValue);
        return initialValue;
      }
    } else {
      return readLocalStorage(key);
    }
  });

  const writeValue = useCallback((key: string, value: T) => {
    writeLocalStorage(key, value);
    setValue(value);
  }, []);

  const removeItem = useCallback((key: string) => {
    try {
      localStorage.removeItem(key);
      setValue(undefined);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { value, writeValue, removeItem };
}
