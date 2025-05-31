"use client";

import { useChatContext } from "@/providers";
import { getModelDetails } from "@/lib/utils";
import ModelDetails from "@/components/model-details";
import { DownloadIcon, MaximizeIcon, XIcon } from "lucide-react";
import type { Model } from "@/types";
import { CHAT_HEADER_HEIGHT } from "@/styles/constants";

interface Props {
  model: Model;
}

function ChatHeader({ model }: Props) {
  const { store, dispatch } = useChatContext("multiple");
  const details = getModelDetails(model);

  function downloadChat() {
    let content = "";
    store.messages
      .filter((msg) => msg.model === model)
      .forEach((msg) => {
        if (msg.role === "user") {
          content += `${msg.content}\n\n`;
        }
        if (msg.role === "system") {
          content += `${msg.content}\n\n---\n\n`;
        }
      });
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
    dispatch({ type: "multiple/maximize_model", model });
  }

  function closeModel() {
    dispatch({ type: "multiple/remove_model", model });
    if (store.maximizedModel === model) {
      dispatch({ type: "multiple/minimize_model" });
    }
  }

  return (
    <div
      className="p-1 flex items-center border-b bg-background"
      style={{ height: CHAT_HEADER_HEIGHT }}
    >
      <ModelDetails className="grow" size="sm" details={details} />
      <div className="ml-auto flex items-center gap-2 *:p-1 *:rounded *:cursor-pointer">
        <div className="bg-zinc-100" onClick={downloadChat}>
          <DownloadIcon className="size-3 stroke-[2.25]" />
        </div>
        <div className="bg-zinc-100" onClick={maximizeModel}>
          <MaximizeIcon className="size-3 stroke-[2.25]" />
        </div>
        <div className="bg-zinc-100" onClick={closeModel}>
          <XIcon className="size-3 stroke-[2.25]" />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
