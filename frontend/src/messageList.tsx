import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface ChatResponse {
  original: string;
  regenerated?: string;
  timestamp: string;
}

interface Props {
  searches: string[];
  responses: ChatResponse[];
  setResponses: React.Dispatch<React.SetStateAction<ChatResponse[]>>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

const MessageListWithRegenerate: React.FC<Props> = ({
  searches,
  responses,
  setResponses,
  bottomRef,
}) => {
  const [isRegeneratingIndex, setIsRegeneratingIndex] = useState<number | null>(
    null
  );

  const handleRegenerate = async (index: number) => {
    const originalQuery = searches[index];
    if (!originalQuery) return;

    setIsRegeneratingIndex(index);

    try {
      const res = await axios.post(
        "https://don-ttrustme-chatbott.onrender.com/userinput",
        {
          search: originalQuery + " (explain this differently)",
        }
      );

      const newReply = res.data.reply || "No alternate response";
      const updated = [...responses];
      updated[index] = {
        ...updated[index],
        regenerated: newReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
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
      {searches.map((text, index) => {
        const res = responses[index];
        const responseText = res?.regenerated || res?.original;

        return (
          <div key={index} className="flex flex-col space-y-6">
            <div
              className={`ml-auto bg-blue-600 px-4 py-2 rounded-lg max-w-[70%] break-words text-right shadow 
                ${
                  text.length > 400 ? "text-base" : "text-xl"
                } cursor-default no-underline`}
            >
              {text}
            </div>

            <div
              className={`mr-auto bg-gray-800 px-4 py-2 rounded-lg max-w-[70%] break-words text-left shadow
    ${
      responseText?.length > 400 ? "text-base" : "text-xl"
    } cursor-default no-underline relative`}
            >
              {responseText}

              <div className="mt-2 flex justify-between items-center text-xs text-blue-400">
                {responseText?.split(" ").length > 100 ? (
                  <button
                    onClick={() => handleRegenerate(index)}
                    disabled={isRegeneratingIndex === index}
                    className="hover:text-blue-300 transition flex items-center space-x-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                ) : (
                  <div /> 
                )}

                {res?.timestamp && (
                  <span className="text-gray-400">{res.timestamp}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageListWithRegenerate;
