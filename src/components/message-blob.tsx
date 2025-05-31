"use client";

import Markdown from "react-markdown";
import { useClipboardWrite } from "@/hooks/use-clipboard";
import { CopyIcon, CopyCheckIcon } from "lucide-react";

interface Props {
  role: "user" | "system";
  content: string;
}

function MessageBlob({ role, content }: Props) {
  const [copied, copy] = useClipboardWrite();

  async function handleCopy() {
    await copy(content);
  }

  switch (role) {
    case "user": {
      return (
        <div className="ml-auto mt-2 p-2 w-[85%] max-w-[400px] relative rounded-xl bg-zinc-200">
          <div className="markdown text-pretty">
            <Markdown>{content}</Markdown>
          </div>
          <div
            className="p-1 absolute -left-8 bottom-0 rounded hover:bg-zinc-100 cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? (
              <CopyCheckIcon className="size-4 stroke-emerald-700" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </div>
        </div>
      );
    }
    case "system": {
      return (
        <div className="mt-6 mb-15 flex flex-col gap-2">
          <div className="p-2 max-w-chars-70">
            <div className="markdown prose text-pretty">
              <Markdown>{content}</Markdown>
            </div>
          </div>
          <div
            className="p-1 size-max rounded hover:bg-zinc-100 cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? (
              <CopyCheckIcon className="size-4 stroke-emerald-700" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </div>
        </div>
      );
    }
  }
}

export default MessageBlob;
