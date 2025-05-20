import Markdown from "react-markdown";
// import styles from "@/styles/markdown.module.css";

interface Props {
  role: "user" | "system";
  content: string;
}

function MessageBlob({ role, content }: Props) {
  switch (role) {
    case "system": {
      return (
        <div className="px-2 pt-6 pb-16 max-w-chars-75">
          <div className="markdown prose text-pretty">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      );
    }
    case "user": {
      return (
        <div className="ml-auto p-2 max-w-[400px] rounded-xl bg-zinc-200">
          <div className="markdown text-pretty">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      );
    }
  }
}

export default MessageBlob;
