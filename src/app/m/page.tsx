"use client";

import { type CSSProperties } from "react";
import ChatSection from "./chat-section";
import Toolbar from "./toolbar";
import { useSections } from "@/providers";

function Page() {
  const { sectionStore } = useSections();
  const count = sectionStore.models.length;

  const styles: CSSProperties = {
    gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
  };

  return (
    <div className="h-svh grid grid-rows-[auto_calc(100svh-60px)]">
      <Toolbar />
      <div className="h-full relative">
        <div className="h-full grid gap-x-1 bg-border" style={styles}>
          {sectionStore.models.map((model) => {
            return <ChatSection model={model} key={model} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
