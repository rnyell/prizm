"use client";

import type {
  ReactNode,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  TextareaHTMLAttributes,
} from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import { readStreamableValue } from "ai/rsc";
import { toast } from "sonner";
import { useChatContext, useConfig } from "@/providers";
import { useChat, useIsMobile } from "@/hooks";
import { streamResponse } from "@/lib/actions";
import { cn, generateId } from "@/lib/utils";
import { TEXTAREA_BASE_LENGTH, TEXTAREA_MIN_LENGTH } from "@/lib/constants";
import { Button } from "./ui/button";
import { ArrowUpIcon, SparklesIcon } from "lucide-react";
import type { Model } from "@/types";

interface WrapperProps {
  children: ReactNode;
  className?: string;
  length: number;
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

export function InputWrapper({
  children,
  className,
  length,
  synced = false,
}: WrapperProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "w-full z-10 flex justify-center data-[align=center]:bottom-1/2 data-[align=bottom]:bottom-4 before:content-[''] before:absolute before:-z-10 before:inset-x-0 before:top-0 before:-bottom-1/2 before:bg-background",
        "data-[input-type=separate]:absolute data-[input-type=separate]:left-0 data-[input-type=separate]:bg-background",
        "data-[input-type=sync]:fixed data-[input-type=sync]:left-1/2 data-[input-type=sync]:-translate-x-1/2 data-[input-type=sync]:@md/interfaces:w-4/5 data-[input-type=sync]:@lg/interfaces:w-7/10 data-[input-type=sync]:@lg/interfaces:max-w-[720px] data-[input-type=sync]:@xl/interfaces:max-w-[765px]",
        isMobile
          ? "data-[input-type=sync]:bottom-5"
          : "data-[input-type=sync]:bottom-4 data-[input-type=sync]:4/5",
      )}
      data-align={length === 0 ? "center" : "bottom"}
      data-input-type={synced ? "sync" : "separate"}
    >
      <div
        className={cn(
          "w-9/10 @md/interface:w-4/5 @lg/interface:w-2/3 @lg/interface:max-w-[720px]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function InputField({ type, model }: FieldProps) {
  const { appearance } = useConfig();
  const { pending, append } = useChat(type, model);
  const { input } = useChatContext("multiple");
  const [value, setValue] = useState("");

  const usingSyncedInput = appearance.input === "sync" && type === "multiple";

  function appendMessages() {
    append(value);
    setValue("");
  }

  function handleChange(value: string) {
    setValue(value);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      appendMessages();
    }
  }

  function handleClick() {
    appendMessages();
  }

  return (
    <div
      className={cn(
        "p-2 w-full rounded-xl border-[1.5px] border-tertiary-500 bg-tertiary-100 max-sm:p-1.5 max-sm:border",
        value.length <= TEXTAREA_BASE_LENGTH
          ? "flex items-center"
          : "grid grid-flow-row grid-rows-[1fr_auto]",
        usingSyncedInput && "hidden",
      )}
    >
      <Textarea
        value={usingSyncedInput ? input : value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <Button
        className={cn(
          "ml-auto rounded-lg max-sm:p-1.5 max-sm:size-8",
          value.length > TEXTAREA_BASE_LENGTH && "row-start-2",
        )}
        size="icon"
        disabled={pending}
        onClick={handleClick}
      >
        <ArrowUpIcon className="size-5" />
      </Button>
    </div>
  );
}

export function SyncedInputField() {
  const { apiKey } = useConfig();
  const { store, dispatch, input, setInput } = useChatContext("multiple");
  const [pending, startTransition] = useTransition();

  function appendInput() {
    store.models.forEach((model) => {
      dispatch({ type: "multiple/append-input", content: input, model });
    });
  }

  const ids: string[] = [];

  function appendResponse() {
    const results = store.models.map(async (model) => {
      const id = generateId(12);
      ids.push(id);
      dispatch({ type: "multiple/stream-init", model, id });
      const result = await streamResponse(model, input, { apiKey: apiKey! });
      return result;
    });
    startTransition(async () => {
      results.forEach(async (result, index) => {
        const id = ids[index];
        const { response, error } = await result;
        if (response) {
          for await (const delta of readStreamableValue(response)) {
            dispatch({ type: "multiple/stream-update", delta: delta ?? "", id });
          }
        }
        if (error) {
          const delta = `Error occurred while generating response. Please try again.`;
          dispatch({ type: "multiple/stream-update", id, delta });
        }
      });
    });
  }

  function appendMessage() {
    if (!apiKey) {
      toast.error("You must provide your API_KEY in order to chat with models.");
      return;
    }
    if (input.trim().length < TEXTAREA_MIN_LENGTH) {
      toast.warning("Your input should have at least 2 characters.");
      return;
    }
    appendInput();
    appendResponse();
    setInput("");
  }

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
        "p-2 min-w-52 w-full rounded-xl border-[1.5px] border-tertiary-500 bg-tertiary-100 max-md:min-w-42 max-sm:p-1.5 max-sm:border",
        input.length <= TEXTAREA_BASE_LENGTH
          ? "flex items-center"
          : "grid grid-flow-row grid-rows-[1fr_auto]",
      )}
    >
      <Textarea value={input} onChange={setInput} onKeyDown={handleKeyDown} />
      <Button
        className={cn(
          "ml-auto rounded-lg",
          input.length > TEXTAREA_BASE_LENGTH && "row-start-2",
        )}
        size="icon"
        disabled={pending}
        onClick={handleClick}
      >
        <SparklesIcon className="size-4" />
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
      className="resize-none pt-1 pl-2 w-full min-h-9 max-h-80 focus:outline-0 max-sm:min-h-8"
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
