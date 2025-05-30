import { Metadata } from "next";
import { NAVBAR_HEIGHT } from "@/styles/constants";
import { Toolbar } from "./toolbar";
import ChatsContainer from "./chats-container";

export const metadata: Metadata = {
  title: "",
};

function Page() {
  return (
    <div
      className="h-svh grid"
      style={{ gridTemplateRows: `auto calc(100svh - ${NAVBAR_HEIGHT}px)` }}
    >
      <Toolbar />
      <div className="h-full relative">
        <ChatsContainer />
      </div>
    </div>
  );
}

export default Page;
