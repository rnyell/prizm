import ChatScreen from "@/components/chat-screen";

function Main() {
  return (
    <div>
      <div>
        <ChatScreen model="google/gemma-3-27b-it:free" />
      </div>
    </div>
  );
}

export default Main;
