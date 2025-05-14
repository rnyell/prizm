"use client";

import { useRef, useEffect, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "./ui/button";

interface Props
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void;
  pending?: boolean;
}

export function AutoResizeTextarea({
  className,
  value,
  onChange,
  pending,
  ...props
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <div className="mx-auto w-3/5 min-h-9 rounded-xl border-[1.5px] border-zinc-600">
      <textarea
        className={cn(
          "resize-none py-2 px-2 w-full min-h-9 max-h-80 focus:outline-0",
          className
        )}
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
      <div className="p-2 flex items-center">
        <Button
          className="ml-auto rounded-xl"
          size="icon"
          type="submit"
          disabled={pending}
        >
          <ArrowUpIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
