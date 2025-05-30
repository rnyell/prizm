import type { Metadata } from "next";
import type { Title } from "@/types";
import { getModelByTitle, getModelDetailsByTitle } from "@/lib/utils";
import { NAVBAR_HEIGHT } from "@/styles/constants";
import ModelDetails from "./model-details";
import ChatInterface from "./chat-interface";

interface Props {
  params: Promise<{ slug: Title }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const model = getModelByTitle(slug);
  const details = getModelDetailsByTitle(slug);

  return (
    <div
      className="h-svh relative grid"
      style={{ gridTemplateRows: `auto calc(100svh - ${NAVBAR_HEIGHT}px)` }}
    >
      <div
        className="p-2 sticky z-10 top-0 flex-center border-b bg-zinc-100"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <ModelDetails details={details} />
      </div>
      <div>
        <ChatInterface model={model} />
      </div>
    </div>
  );
}

export default Page;
