import { useState, useCallback } from "react";

export function useClipboardWrite() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      return true;
    } catch (error) {
      setCopied(false);
      console.error("Copy failed!", error);
      return false;
    }
  }, []);

  return [copied, copy] as const;
}
