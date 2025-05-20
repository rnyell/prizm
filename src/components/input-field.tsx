"use client";

import {
  type TextareaHTMLAttributes,
  type KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "lucide-react";

interface Props
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void;
  appendMessage: () => void;
  pending: boolean;
}

export function InputField({
  value,
  onChange,
  appendMessage,
  pending,
  ...props
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (textarea) {
      if (textarea.textLength < 24) {
        textarea.style.height = "auto";
      }
      if (textarea.textLength > 24) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      appendMessage();
    }
  }

  function handleClick() {
    appendMessage();
  }

  return (
    <div
      className={cn(
        "p-2 min-h-9 min-w-56 w-full max-w-2xl rounded-xl border-[1.5px] border-zinc-500 bg-zinc-100",
        value.length <= 24
          ? "flex items-center"
          : "grid grid-flow-row grid-rows-[1fr_auto]",
      )}
    >
      <textarea
        className="resize-none pt-1 pl-2 w-full min-h-9 max-h-80 focus:outline-0"
        ref={textareaRef}
        rows={1}
        minLength={1}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          resizeTextarea();
        }}
        onKeyDown={handleKeyDown}
        spellCheck
        {...props}
      />
      <Button
        className={cn("ml-auto rounded-xl", value.length > 25 && "row-start-2")}
        size="icon"
        disabled={pending}
        onClick={handleClick}
      >
        <ArrowUpIcon className="size-5" />
      </Button>
    </div>
  );
}
