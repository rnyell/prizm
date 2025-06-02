"use client";

import { usePathname } from "next/navigation";
import { useChatContext } from "@/providers";
import { getModelDetailsByTitle } from "@/lib/utils";
import { TOOLBAR_HEIGHT } from "@/lib/constants";
import ModelDetails from "@/components/model-details";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Title } from "@/types";
import { DownloadIcon, TrashIcon } from "lucide-react";

function Toolbar() {
  const { store, dispatch } = useChatContext("single");
  const title = usePathname().substring(3) as Title;
  const details = getModelDetailsByTitle(title);
  const messages = store.get(details.model) ?? [];

  function downloadChat() {
    let content = "";
    messages
      .filter((msg) => msg.model === details.model)
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

  function clearChat() {
    dispatch({ type: "single/clear-messages", model: details.model });
  }

  return (
    <div
      className="p-2 sticky z-10 top-0 flex items-center border-b bg-tertiary-100"
      style={{ height: TOOLBAR_HEIGHT }}
    >
      <SidebarTrigger className="absolute left-4 top-1/2 -translate-y-1/2" />
      <ModelDetails details={details} className="grow" size="lg" />
      <div className="ml-auto pr-4 flex items-center gap-2 *:p-1.5 *:border-[1.5px] *:rounded-md *:hover:bg-tertiary-200 *:cursor-pointer">
        <div onClick={downloadChat}>
          <DownloadIcon className="size-4 stroke-[1.75]" />
        </div>
        <div onClick={clearChat}>
          <TrashIcon className="size-4 stroke-[1.75]" />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
