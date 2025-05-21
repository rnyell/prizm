import Toolbar from "./toolbar";
import ChatsContainer from "./chats-container";

function Page() {
  return (
    <div className="h-svh grid grid-rows-[auto_calc(100svh-60px)]">
      <Toolbar />
      <div className="h-full relative">
        <ChatsContainer />
      </div>
    </div>
  );
}

export default Page;
