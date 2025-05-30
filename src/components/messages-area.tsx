import type { Message } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import MessageBlob from "./message-blob";

interface Props {
  messages: Message[];
}

function MessagesArea({ messages }: Props) {
  return (
    <ScrollArea
      className="mx-auto p-4 max-w-4xl h-full"
      style={{ display: "block" }}
    >
      {messages.length >= 1 &&
        messages.map((message, i) => (
          <MessageBlob role={message.role} content={message.content} key={i} />
        ))}
    </ScrollArea>
  );
}

export default MessagesArea;
