"use client";

import { toast } from "sonner";
import { useChatContext } from "@/providers";
import { createMarkdown, getModelDetails } from "@/lib/utils";
import { CHAT_HEADER_HEIGHT_REM } from "@/lib/constants";
import ModelDetails from "@/components/model-details";
import { DownloadIcon, MaximizeIcon, XIcon } from "lucide-react";
import type { Model } from "@/types";

interface Props {
  model: Model;
}

function ChatHeader({ model }: Props) {
  const { store, dispatch } = useChatContext("multiple");
  const details = getModelDetails(model);

  function downloadChat() {
    const content = createMarkdown(store.messages, details.model);
    if (content.length < 5) {
      toast.warning(
        "The chat history is quite empty. Please start a conversation first.",
      );
      return;
    }
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `export-chat-${details.name}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function maximizeModel() {
    dispatch({ type: "multiple/maximize-model", model });
  }

  function closeModel() {
    dispatch({ type: "multiple/remove-model", model });
    if (store.maximizedModel === model) {
      dispatch({ type: "multiple/minimize-model" });
    }
  }

  return (
    <div
      className="p-1 flex items-center border-b bg-background"
      style={{ height: CHAT_HEADER_HEIGHT_REM }}
    >
      <div className="grow flex-x-center gap-4">
        {details.logo && <details.logo className="size-3.5 fill-tertiary-700" />}
        <ModelDetails size="sm" details={details} />
      </div>
      <div className="ml-auto flex items-center gap-2 *:p-1 *:rounded *:bg-tertiary-100 *:hover:bg-tertiary-200 *:cursor-pointer">
        <div onClick={downloadChat}>
          <DownloadIcon className="size-3 stroke-[2.25] dark:stroke-zinc-300" />
        </div>
        <div onClick={maximizeModel}>
          <MaximizeIcon className="size-3 stroke-[2.25] dark:stroke-zinc-300" />
        </div>
        <div onClick={closeModel}>
          <XIcon className="size-3 stroke-[2.25] dark:stroke-zinc-300" />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
