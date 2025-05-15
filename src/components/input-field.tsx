"use client";

import { type TextareaHTMLAttributes, useRef, useEffect } from "react";
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
  onClick: () => void;
  pending: boolean;
}

export function InputField({
  value,
  onChange,
  onClick,
  pending,
  ...props
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (textarea) {
      if (textarea.textLength < 25) {
        textarea.style.height = "auto";
      }
      if (textarea.textLength > 25) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <div
      className={cn("p-2 w-full min-h-9", {
        "flex items-center": value.length <= 25,
        "grid grid-flow-row grid-rows-[1fr_auto]": value.length > 25,
      })}
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
        spellCheck
        {...props}
      />
      <Button
        className={cn("ml-auto rounded-xl", {
          "row-start-2": value.length > 25,
        })}
        size="icon"
        disabled={pending}
        onClick={onClick}
      >
        <ArrowUpIcon className="size-5" />
      </Button>
    </div>
  );
}
