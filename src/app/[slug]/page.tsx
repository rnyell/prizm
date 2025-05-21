import type { ModelName } from "@/lib/types";
import { getModelByName, getModelDetails } from "@/lib/utils";
import ModelDetails from "@/components/model-details";
import ChatScreen from "./chat-screen";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  params: Promise<{ slug: ModelName }>;
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const model = getModelByName(slug);
  const details = getModelDetails(slug);

  return (
    <div className="h-svh relative grid grid-rows-[auto_calc(100svh-65px)]">
      <div className="p-2 h-[65px] sticky z-10 top-0 flex-center border-b bg-zinc-100">
        <SidebarTrigger className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" />
        <ModelDetails details={details} />
      </div>
      <div>
        <ChatScreen model={model} />
      </div>
    </div>
  );
}

export default Page;
