import type { Message } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import MessageBlob from "./message-blob";

interface Props {
  messages: Message[];
}

function MessagesArea({ messages }: Props) {
  return (
    <ScrollArea
      className="mx-auto p-4 pb-8 max-w-4xl h-full"
      style={{ display: "block" }}
    >
      {messages.length >= 1 &&
        messages.map((msg, i) => (
          <MessageBlob role={msg.role} content={msg.content} key={i} />
        ))}
    </ScrollArea>
  );
}

export default MessagesArea;
