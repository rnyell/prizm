"use client";

import { useSections } from "@/providers";
import { AddModelPopover } from "./toolbar";
import ChatSection from "./chat-section";

function ChatsContainer() {
  const { sectionStore } = useSections();
  const layout = sectionStore.layout;
  const models = sectionStore.models;
  const count = models.length;

  const colStyles = {
    gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(1, minmax(0, 1fr))`,
  };
  const gridStyles = {
    gridTemplateColumns: `repeat(${count <= 2 ? 1 : 2}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${count === 1 ? 1 : 2}, minmax(0, 1fr))`,
  };
  const styles = layout === "col" ? colStyles : gridStyles;

  if (count === 0) {
    return (
      <div className="h-full grid place-content-center">
        <div className="p-4 text-xl">
          Add models by selecting them from the toolbar or the button bellow.
          <div className="mt-4 mx-auto w-max text-[0.9rem]">
            <AddModelPopover />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full grid gap-px bg-border" style={styles}>
      {models.map((model) => (
        <ChatSection model={model} key={model} />
      ))}
    </div>
  );
}

export default ChatsContainer;
