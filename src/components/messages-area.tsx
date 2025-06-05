import type { Message } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import MessageBlob from "./message-blob";

interface Props {
  messages: Message[];
}

function MessagesArea({ messages }: Props) {
  return (
    <ScrollArea className="mx-auto px-4 pb-8 max-w-4xl h-full">
      {messages.length >= 1 &&
        messages.map((msg, i) => (
          <MessageBlob role={msg.role} content={msg.content} key={i} />
        ))}
    </ScrollArea>
  );
}

export default MessagesArea;
