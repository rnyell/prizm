import type { ModelName } from "@/lib/types";
import ChatScreen from "@/components/chat-screen";
import { getModel } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: ModelName }>;
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const model = getModel(slug);

  return (
    <div>
      <ChatScreen model={model} />
    </div>
  );
}

export default Page;
