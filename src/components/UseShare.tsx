import { useState } from "react";
import { message } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import useAppStore from "../store/store";

const UseShare = () => {
  const generateShareableLink = useAppStore(
    (state) => state.generateShareableLink
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const link = generateShareableLink();
      await navigator.clipboard.writeText(link);
      setCopied(true);
      message.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      message.error("Failed to copy link");
      console.error("Clipboard error:", error);
    }
  };

  return (
    <div className="share-element">
      <button
        onClick={handleCopy}
       className="bg-#ffffff text-sm border border-#ddd px-4 py-1.5 rounded hover:bg-#e0e0e0 hover:text-#050c40 transition-colors gap-2"
      >
        <ShareAltOutlined />
        {copied ? "Copied!" : "Share"}
      </button>
    </div>
  );
};

export default UseShare;