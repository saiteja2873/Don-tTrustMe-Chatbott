import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  searches: string[];
  responses: string[];
  setResponses: React.Dispatch<React.SetStateAction<string[]>>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

const MessageListWithRegenerate: React.FC<Props> = ({
  searches,
  responses,
  setResponses,
  bottomRef,
}) => {
  const [isRegeneratingIndex, setIsRegeneratingIndex] = useState<number | null>(null);

  const handleRegenerate = async (index: number) => {
    const originalQuery = searches[index];
    if (!originalQuery) return;

    setIsRegeneratingIndex(index); // 🔁 Start loading

    try {
      const res = await axios.post(
        "https://don-ttrustme-chatbott.onrender.com/userinput",
        {
          search: originalQuery + " (explain this differently)",
        }
      );

      const newReply = res.data.reply || "No alternate response";
      const updated = [...responses];
      updated[index] = newReply;
      setResponses(updated);

      toast.success("Regenerated!");
    } catch (err) {
      console.error("Error during regenerate:", err);
      toast.error("Failed to regenerate");
    } finally {
      setIsRegeneratingIndex(null); 
    }
  };

  return (
    <div className="absolute top-20 left-0 right-0 px-6 py-2 overflow-y-auto max-h-[calc(100vh-250px)] space-y-4">
      {searches.map((text, index) => (
        <div key={index} className="flex flex-col space-y-6">
          <div
            className={`ml-auto bg-blue-600 px-4 py-2 rounded-lg max-w-[70%] break-words text-right shadow 
              ${text.length > 400 ? "text-base" : "text-xl"} cursor-default no-underline`}
          >
            {text}
          </div>

          <div
            className={`mr-auto bg-gray-800 px-4 py-2 rounded-lg max-w-[70%] break-words text-left shadow
              ${responses[index]?.length > 400 ? "text-base" : "text-xl"} cursor-default no-underline`}
          >
            {responses[index]}

            {responses[index]?.split(" ").length > 100 && (
              <button
                onClick={() => handleRegenerate(index)}
                disabled={isRegeneratingIndex === index}
                className="mt-2 text-xs text-blue-400 no-underline cursor-pointer hover:text-blue-300 transition flex items-center space-x-1"
              >
                {isRegeneratingIndex === index ? (
                  <>
                    <span className="animate-spin h-4 w-4 inline-block border-t-2 border-blue-400 rounded-full"></span>
                    <span>Regenerating...</span>
                  </>
                ) : (
                  <>🔁 Regenerate</>
                )}
              </button>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageListWithRegenerate;
