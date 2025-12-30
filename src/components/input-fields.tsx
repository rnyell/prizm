"use client";

import type {
  ReactNode,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  TextareaHTMLAttributes,
} from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useChatContext, useConfig } from "@/providers";
import { useIsMobile, useChat } from "@/hooks";
import { cn } from "@/lib/utils";
import { TEXTAREA_BASE_LENGTH, TEXTAREA_MIN_LENGTH } from "@/lib/constants";
import { Button } from "./ui/button";
import { ArrowUpIcon, SparklesIcon } from "lucide-react";
import type { Model } from "@/types";

interface WrapperProps {
  children: ReactNode;
  synced?: boolean;
}

interface FieldProps {
  model: Model;
  type: "single" | "multiple";
}

interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void | Dispatch<SetStateAction<string>>;
}

export function InputWrapper({ children, synced = false }: WrapperProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "w-4/5 z-10 left-1/2 rounded-xl bottom-8 @lg/interface:w-2/3 @lg/interface:max-w-2xl before:content-[''] before:absolute before:-z-10 before:inset-x-0 before:top-0 before:-bottom-1/2 before:bg-background",
        "data-[input-type=separate]:absolute data-[input-type=separate]:-translate-x-1/2 data-[input-type=separate]:bg-background",
        "data-[input-type=sync]:overflow-hidden data-[input-type=sync]:fixed data-[input-type=sync]:translate-x-[calc(-50%+2.5rem)] data-[input-type=sync]:@md/interfaces:w-4/5 data-[input-type=sync]:@lg/interfaces:w-7/10 data-[input-type=sync]:@lg/interfaces:max-w-[720px] data-[input-type=sync]:@xl/interfaces:max-w-[760px]",
        isMobile && "data-[input-type=sync]:bottom-6",
      )}
      data-input-type={synced ? "sync" : "separate"}
    >
      {children}
    </div>
  );
}

export function UnsyncedInput({ type, model }: FieldProps) {
  const { apiKey } = useConfig();
  const { addInput, pending } = useChat();
  const { appearance } = useConfig();
  const [value, setValue] = useState("");

  const isSyncedInput = appearance.input === "sync" && type === "multiple";

  function addUserInput() {
    if (!apiKey) {
      toast.error("You must provide your API_KEY in order to chat with models.");
      return;
    }
    if (value.trim().length < TEXTAREA_MIN_LENGTH) {
      toast.warning("Your input should have at least 3 characters.");
      return;
    }
    addInput(value, model, apiKey);
    setValue("");
  }

  function handleChange(str: string) {
    setValue(str);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addUserInput();
    }
  }

  function handleClick() {
    addUserInput();
  }

  return (
    <div
      className={cn(
        "p-2 w-full rounded-[inherit] border-[1.5px] border-tertiary-500 dark:border-tertiary-300 bg-tertiary-100 max-sm:p-1.5 max-sm:border max-sm:border-tertiary-400 dark:max-sm:border-tertiary-200",
        value.length <= TEXTAREA_BASE_LENGTH
          ? "flex items-center"
          : "grid grid-flow-row grid-rows-[1fr_auto]",
        isSyncedInput && "hidden",
      )}
    >
      <Textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={cn(
          "ml-auto rounded-lg max-sm:p-1.5 max-sm:size-8 @max-xs/interface:size-7",
          value.length > TEXTAREA_BASE_LENGTH && "row-start-2",
        )}
        size="icon"
        disabled={pending}
        onClick={handleClick}
      >
        <ArrowUpIcon className="size-5 max-sm:size-4" />
      </Button>
    </div>
  );
}

export function SyncedInput() {
  const { apiKey } = useConfig();
  const { addInput, pending } = useChat();
  const { store, input, setInput } = useChatContext();

  function addUserInputs() {
    if (!apiKey) {
      toast.error("You must provide your API_KEY in order to chat with models.");
      return;
    }
    if (input.trim().length < TEXTAREA_MIN_LENGTH) {
      toast.warning("Your input should have at least 3 characters.");
      return;
    }
    store.models.forEach((model) => {
      addInput(input, model, apiKey);
    });
    setInput("");
  }

  function handleChange(str: string) {
    setInput(str);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addUserInputs();
    }
  }

  function handleClick() {
    addUserInputs();
  }

  return (
    <div
      className={cn(
        "p-2 min-w-52 w-full rounded-xl border-[1.5px] border-tertiary-500 dark:border-tertiary-300 bg-tertiary-100 max-md:min-w-42 max-sm:p-1.5 max-sm:border max-sm:border-tertiary-400 dark:max-sm:border-tertiary-300",
        input.length <= TEXTAREA_BASE_LENGTH
          ? "flex items-center"
          : "grid grid-flow-row grid-rows-[1fr_auto]",
      )}
    >
      <Textarea
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={cn(
          "ml-auto rounded-lg",
          input.length > TEXTAREA_BASE_LENGTH && "row-start-2",
        )}
        size="icon"
        disabled={pending}
        onClick={handleClick}
      >
        <SparklesIcon className="size-4 max-sm:size-3.5" />
      </Button>
    </div>
  );
}

export function Textarea({ value, onChange, ...props }: TextareaProps) {
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    const textarea = fieldRef.current;
    if (textarea) {
      if (textarea.textLength < TEXTAREA_BASE_LENGTH) {
        textarea.style.height = "auto";
      }
      if (textarea.textLength > TEXTAREA_BASE_LENGTH) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <textarea
      className="resize-none pt-1.5 pl-2 w-full min-h-9 max-h-80 focus:outline-0 max-sm:min-h-8 @max-xs/interface:text-sm @max-xs/interface:pt-2"
      ref={fieldRef}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        resizeTextarea();
      }}
      rows={1}
      spellCheck
      {...props}
    />
  );
}
