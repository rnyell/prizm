interface Props {
  role: "user" | "system";
  content: string;
}

function ChatBlob({ role, content }: Props) {
  switch (role) {
    case "system": {
      return (
        <div className="max-w-[400px]">
          <div>{content}</div>
        </div>
      );
    }
    case "user": {
      return (
        <div className="ml-auto max-w-[350px] bg-sky-600">
          <div>{content}</div>
        </div>
      );
    }
  }
}

export default ChatBlob;
