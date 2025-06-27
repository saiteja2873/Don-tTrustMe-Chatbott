import React, { useState, useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import MessageListWithRegenerate from "./messageList";

function SearchBar() {
  const [inputText, setInputText] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [searches, setSearches] = useState<string[]>([]); // Stores previous entries
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [responses, setResponses] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null); // ✅ correct  


  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    try {

      const res = await axios.post(
        "https://don-ttrustme-chatbott.onrender.com/userinput",
        {
          search: inputText,
        }
      );

      const reply = res.data.reply || "No response received";

      setSubmitted(true);
      setSearches((prev) => [...prev, inputText]);
      setResponses((prev) => [...prev, reply]);
      setInputText("");

      if (textAreaRef.current) {
        textAreaRef.current.style.height = "80px";
      }

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      toast.success("Search submitted!");
    } catch (error) {
      console.error("Error sending search:", error);
      toast.error("Failed to send search");
    }
  };

  return (
    <div className="relative min-h-screen text-white p-4 pt-20 flex flex-col items-center bg-black">
      {/* ✅ Display past submitted searches (with scroll) */}
      <MessageListWithRegenerate
      searches={searches}
      responses={responses}
      setResponses={setResponses}
      bottomRef={bottomRef}
    />

      {/* ✅ Input form */}
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <div
          className={`
        absolute left-1/2 transform -translate-x-1/2
        transition-all duration-500 ease-in-out
        w-full max-w-[60%]
        ${submitted ? "top-[80%] translate-y-0" : "top-[40%] -translate-y-1/2"}
      `}
        >
          <textarea
            ref={textAreaRef}
            className="resize-none overflow-hidden text-center placeholder:text-center
          p-4 pt-[34px] w-full min-h-[100px] max-h-[200px] border-white border-2 rounded-2xl 
          text-white bg-black text-xl placeholder-gray-500"
            placeholder="Search Something!!"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              const el = textAreaRef.current;
              if (el) {
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
