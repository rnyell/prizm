import { TOOLBAR_HEIGHT } from "@/lib/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";

function Main() {
  // TODO unify toolbars
  return (
    <div className="h-svh grid">
      <div
        className="p-2 sticky z-10 top-0 flex-x-center border-b bg-tertiary-100"
        style={{ height: TOOLBAR_HEIGHT }}
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
