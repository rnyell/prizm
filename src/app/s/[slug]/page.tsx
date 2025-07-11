import type { Metadata } from "next";
import type { Title } from "@/types";
import { getModelByTitle } from "@/lib/utils";
import { TOOLBAR_HEIGHT } from "@/lib/constants";
import ChatInterface from "./chat-interface";
import Toolbar from "./toolbar";

interface Props {
  params: Promise<{ slug: Title }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Prizm | ${slug}` };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const model = getModelByTitle(slug);

  return (
    <div
      className="h-svh relative grid"
      style={{ gridTemplateRows: `auto calc(100svh - ${TOOLBAR_HEIGHT}px)` }}
    >
      <Toolbar />
      <div className="overflow-clip">
        <ChatInterface model={model} />
      </div>
    </div>
  );
}

export default Page;
