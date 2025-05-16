import type { ModelDetails } from "@/lib/types";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  details: ModelDetails;
}

function ModelDetails({ details }: Props) {
  return (
    <div className="p-2">
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
            <ScrollArea className="h-[75svh] whitespace-pre-line">
              {details.overview}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ModelDetails;
