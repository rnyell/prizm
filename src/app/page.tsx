import Link from "next/link";
import { TOOLBAR_HEIGHT } from "@/lib/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/theme-toggle";

function Page() {
  return (
    <div className="h-svh">
      <div
        className="p-2 sticky z-10 top-0 flex-x-center border-b bg-tertiary-100"
        style={{ height: TOOLBAR_HEIGHT }}
      >
        <SidebarTrigger />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className="h-[75%] grid content-center justify-items-center gap-6 grid-flow-row @4xl/root:grid-flow-col">
        <Link href="/m">
          <div className="p-4 min-w-xs @xl/root:min-w-md rounded-xl border transition-[background-color] bg-tertiary-100 hover:bg-tertiary-200">
            <h4 className="font-semibold">Simultaneous</h4>
            <p className="mt-2 text-tertiary-800">
              Chat with multiple assistants at once.
            </p>
          </div>
        </Link>
        <Link href="/s">
          <div className="p-4 min-w-xs @xl/root:min-w-md rounded-xl border transition-[background-color] bg-tertiary-100 hover:bg-tertiary-200">
            <h4 className="font-semibold">Separate</h4>
            <p className="mt-2 text-tertiary-800">
              Interact with each assistant separately.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Page;
