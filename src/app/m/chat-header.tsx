"use client";

import { useChatContext } from "@/providers";
import { getModelName } from "@/lib/utils";
import { MaximizeIcon, XIcon } from "lucide-react";
import type { Model } from "@/types";

interface Props {
  model: Model;
}

function ChatHeader({ model }: Props) {
  const { store, dispatch } = useChatContext("multiple");
  const name = getModelName(model);

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
    <div className="p-1 flex items-center gap-2 border-b">
      <div className="grow text-center text-sm font-medium">{name}</div>
      <div className="ml-auto">
        <div
          className="p-1 rounded bg-zinc-100 cursor-pointer"
          onClick={maximizeModel}
        >
          <MaximizeIcon className="size-3 stroke-[2.25]" />
        </div>
      </div>
      <div>
        <div
          className="p-1 rounded bg-zinc-100 cursor-pointer"
          onClick={closeModel}
        >
          <XIcon className="size-3 stroke-[2.25]" />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
