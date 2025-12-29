import { TOOLBAR_HEIGHT_REM } from "@/lib/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import ChatInterface from "./chat-interface";

function Page() {
  return (
    <div className="h-svh grid">
      <div
        className="p-2 sticky z-10 top-0 flex-x-center border-b bg-tertiary-100"
        style={{ height: TOOLBAR_HEIGHT_REM }}
      >
        <SidebarTrigger />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      {/* <div className="p-4 text-center text-xl">
        Select a model from the sidebar to start chatting with your AI assistant.
      </div> */}
      <ChatInterface model="deepseek/deepseek-r1-0528:free" />
    </div>
  );
}

export default Page;
