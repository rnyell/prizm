import { TOOLBAR_HEIGHT } from "@/lib/constants";
import { Toolbar } from "./toolbar";
import ChatsContainer from "./chats-container";

function Page() {
  return (
    <div
      className="h-svh grid"
      style={{ gridTemplateRows: `auto calc(100svh - ${TOOLBAR_HEIGHT}px)` }}
    >
      <Toolbar />
      <ChatsContainer />
    </div>
  );
}

export default Page;
