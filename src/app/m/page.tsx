import { TOOLBAR_HEIGHT_REM } from "@/lib/constants";
import { Toolbar } from "./toolbar";
import ChatsContainer from "./chats-container";

function Page() {
  return (
    <div
      className="h-svh grid"
      style={{ gridTemplateRows: `auto calc(100svh - ${TOOLBAR_HEIGHT_REM})` }}
    >
      <Toolbar />
      <ChatsContainer />
    </div>
  );
}

export default Page;
