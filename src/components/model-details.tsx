import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
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

const variants = cva("text-center cursor-pointer dark:text-zinc-100", {
  variants: {
    size: {
      sm: "text-sm font-medium",
      lg: "text-lg font-semibold",
    },
  },
});

type Props = {
  details: Details;
  className?: string;
} & VariantProps<typeof variants>;

function ModelDetails({ details, className, size }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={cn(variants({ size, className }))}>{details.name}</div>
      </SheetTrigger>
      <SheetContent className="p-2">
        <SheetHeader>
          <SheetTitle className="text-lg">{details.name}</SheetTitle>
          <SheetDescription>Context: {details.context}</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <ScrollArea className="h-[75svh] whitespace-pre-line text-sm text-tertiary-700">
            {details.overview}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ModelDetails;
