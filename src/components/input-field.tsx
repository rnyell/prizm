"use client";

import type {
  ReactNode,
  KeyboardEvent,
  TextareaHTMLAttributes,
  Dispatch,
  SetStateAction,
} from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useChatContext, useConfig } from "@/providers";
import { useChat } from "@/hooks/use-chat";
import { llm as action } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { TEXTAREA_BASE_LENGTH, TEXTAREA_MIN_LENGTH } from "@/lib/constants";
import { Button } from "./ui/button";
import { ArrowUpIcon, SparklesIcon } from "lucide-react";
import type { Model } from "@/types";
import { toast } from "sonner";

interface WrapperProps {
  children: ReactNode;
  className?: string;
  isEmpty: boolean;
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

export function InputWrapper({ children, className, isEmpty }: WrapperProps) {
  return (
    <div
      className={cn(
        "mt-4 w-9/10 absolute z-10 left-1/2 -translate-x-1/2 flex justify-center",
        "@md/interface:w-4/5 @lg/interface:w-2/3 @lg/interface:max-w-[720px]",
        isEmpty ? "bottom-1/2" : "bottom-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function InputField({ type, model }: FieldProps) {
  const { appearance } = useConfig();
  const { input, handleSyncedSubmit } = useChatContext("multiple");
  const { pending, append } = useChat(type, model);
  const [value, setValue] = useState("");
  const usingSyncedInput = type === "multiple" && appearance.input === "sync";

  function appendMessages() {
    if (usingSyncedInput) {
      append(input);
      return;
    }
    append(value);
    setValue("");
  }

  function handleChange(value: string) {
    if (usingSyncedInput) {
      return;
    }
    setValue(value);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (usingSyncedInput) {
        handleSyncedSubmit(appendMessages);
        return;
      } else {
        appendMessages();
        return;
      }
    }
  }

  function handleClick() {
    appendMessages();
  }

  return (
    <div
      className={cn(
        "p-2 min-h-9 w-full rounded-xl border-[1.5px] border-zinc-500 bg-zinc-100",
        value.length <= TEXTAREA_BASE_LENGTH
          ? "flex items-center"
          : "grid grid-flow-row grid-rows-[1fr_auto]",
        usingSyncedInput && "opacity-0",
      )}
    >
      <Textarea
        value={usingSyncedInput ? input : value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      <Button
        className={cn(
          "ml-auto rounded-lg",
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
  const { store, dispatch, input, setInput, handleSyncedSubmit } =
    useChatContext("multiple");
  const [pending, startTransition] = useTransition();

  function appendInput(model: Model, input: string) {
    if (input.trim().length < TEXTAREA_MIN_LENGTH) {
      toast.warning("Your input should have at least 2 characters.");
      return;
    }
    dispatch({
      type: "multiple/add_input",
      model: model,
      role: "user",
      content: input,
    });
  }

  function appendMessage() {
    if (!apiKey) {
      toast.error("You must provide your API_KEY in order to chat with models.");
      return;
    }
    store.models.forEach((model) => {
      appendInput(model, input);
    });
    startTransition(async () => {
      const promises = store.models.map((model) =>
        action(model, input, { apiKey: apiKey! }),
      );
      const setteled = await Promise.all(promises);
      const results = store.models.map((model, i) => ({
        model: model,
        result: setteled[i],
      }));
      results.forEach(({ model, result }) => {
        if (result.response) {
          dispatch({
            type: "multiple/add_response",
            model: model,
            role: "system",
            content: result.response,
          });
        }
        if (result.error) {
          console.error(result.error);
          dispatch({
            type: "multiple/add_response",
            model: model,
            role: "system",
            content: `Error occurred while generating response. Please try again.`,
          });
        }
      });
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSyncedSubmit(appendMessage);
    }
  }

  function handleClick() {
    handleSyncedSubmit(appendMessage);
  }

  return (
    <div
      className={cn(
        "p-2 min-h-9 min-w-42 w-full rounded-xl border-[1.5px] border-zinc-500 bg-zinc-100 md:min-w-52",
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
      className="resize-none pt-1 pl-2 w-full min-h-9 max-h-80 focus:outline-0"
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
