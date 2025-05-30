"use client";

import { useChatContext } from "@/providers";
import { getModelName } from "@/lib/utils";
import { DownloadIcon, MaximizeIcon, XIcon } from "lucide-react";
import type { Model } from "@/types";

interface Props {
  model: Model;
}

function ChatHeader({ model }: Props) {
  const { store, dispatch } = useChatContext("multiple");
  const name = getModelName(model);

  function handleDownload() {
    let content = "";
    store.messages
      .filter((msg) => msg.model === model)
      .forEach((msg) => {
        if (msg.role === "user") {
          content += `${msg.content}\n`;
        }
        if (msg.role === "system") {
          content += `${msg.content}\n---\n\n`;
        }
      });

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "content.md";
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
    <div className="p-1 flex items-center border-b">
      <div className="grow text-center text-sm font-medium">{name}</div>
      <div className="ml-auto flex items-center gap-2 *:p-1 *:rounded *:bg-zinc-100 *:cursor-pointer">
        <div onClick={handleDownload}>
          <DownloadIcon className="size-3 stroke-[2.25]" />
        </div>
        <div onClick={maximizeModel}>
          <MaximizeIcon className="size-3 stroke-[2.25]" />
        </div>
        <div onClick={closeModel}>
          <XIcon className="size-3 stroke-[2.25]" />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
