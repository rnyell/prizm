"use client";

import { useSections } from "@/providers";
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
        <div className="text-xl">
          Add a model by selecting it from the toolbar.
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
