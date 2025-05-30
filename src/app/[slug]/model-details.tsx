import type { Details } from "@/types";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  details: Details;
}

function ModelDetails({ details }: Props) {
  return (
    <div className="p-2">
      <SidebarTrigger className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer" />
      <Sheet>
        <SheetTrigger asChild>
          <div className="p-3 text-center text-lg font-semibold cursor-pointer">
            {details.name}
          </div>
        </SheetTrigger>
        <SheetContent className="p-2">
          <SheetHeader>
            <SheetTitle className="text-lg">{details.name}</SheetTitle>
            <SheetDescription>Context: {details.context}</SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <ScrollArea className="h-[75svh] whitespace-pre-line text-sm text-zinc-700">
              {details.overview}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ModelDetails;
