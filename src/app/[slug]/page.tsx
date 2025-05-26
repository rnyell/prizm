import type { Metadata } from "next";
import type { ModelName } from "@/lib/types";
import { getModelByName, getModelDetails } from "@/lib/utils";
import { NAVBAR_HEIGHT } from "@/styles/constants";
import ModelDetails from "./model-details";
import ChatScreen from "./chat-screen";

interface Props {
  params: Promise<{ slug: ModelName }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const model = getModelByName(slug);
  const details = getModelDetails(slug);

  return (
    <div
      className={`h-svh relative grid grid-rows-[auto_calc(100svh-${NAVBAR_HEIGHT}px)]`}
    >
      <div
        className={`p-2 h-[${NAVBAR_HEIGHT}px] sticky z-10 top-0 flex-center border-b bg-zinc-100`}
      >
        <ModelDetails details={details} />
      </div>
      <div>
        <ChatScreen model={model} />
      </div>
    </div>
  );
}

export default Page;
