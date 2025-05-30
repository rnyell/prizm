import { NAVBAR_HEIGHT } from "@/styles/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Main() {
  return (
    <div className="h-svh grid">
      <div
        className="p-2 sticky z-10 top-0 flex-center border-b bg-zinc-100"
        style={{ height: NAVBAR_HEIGHT }}
      >
        <SidebarTrigger className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" />
      </div>
      <div className="p-4 justify-self-center text-xl">
        Select a model from the sidebar to start chatting with your AI assistant.
      </div>
    </div>
  );
}

export default Main;
