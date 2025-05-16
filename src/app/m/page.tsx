import ChatScreen from "@/components/chat-screen";

function Page() {
  return (
    <div className="@container/chats h-full grid grid-cols-3 gap-px bg-zinc-200">
      <div className="bg-zinc-50">
        <ChatScreen model="meta-llama/llama-4-scout:free" />
      </div>
      <div className="bg-zinc-50">
        <ChatScreen model="deepseek/deepseek-chat-v3-0324:free" />
      </div>
      <div className="bg-zinc-50">
        <ChatScreen model="mistralai/mistral-small-3.1-24b-instruct:free" />
      </div>
    </div>
  );
}
// "w-full @md/chats:w-4/5 @lg/chats:w-3/5"
export default Page;
