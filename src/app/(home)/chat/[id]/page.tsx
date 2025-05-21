// "use client";

// import { useState, useEffect, useRef } from "react";
// import { ArrowUp } from "lucide-react";
// import {
//   useAskQuestionMutation,
//   useUserChatsQuery,
// } from "@/redux/features/sessionSlice";
// import ChatSidebar from "@/components/ChatSidebar";
// import ChatMessage from "@/components/ChatMessage";
// import { useParams } from "next/navigation";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function Home() {
//   const params = useParams();
//     const id = params?.id as string;
//     console.log(id, "id");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
//   const [sessionId, setSessionId] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   console.log(sessionId, "sessionId");

//   // Fetch chat history
//   const { data, isLoading } = useUserChatsQuery(id);
//   console.log(data, "user chat data");

//   const [askQuestion, { isLoading: isAsking }] = useAskQuestionMutation();

//   // Initialize sessionId from localStorage
//   useEffect(() => {
//     const sessionIds = localStorage.getItem("sessionId") || "";
//     setSessionId(sessionIds);
//   }, []);

//   // Populate messages from chat history when data is available
//   useEffect(() => {
//     if (data?.data) {
//       const chatHistory = data.data
//         .map((chat: any) => [
//           {
//             role: "user" as const,
//             content: chat.message || "No question provided",
//           },
//           {
//             role: "assistant" as const,
//             content: chat.data?.reply || "No response provided",
//           },
//         ])
//         .flat();
//       setMessages(chatHistory);
//       setShowWelcomeMessage(false);
//       console.log(messages, "messages");
//     }
//   }, [data]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     // Add user message to state
//     const userMessage = { role: "user" as const, content: inputValue.trim() };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setShowWelcomeMessage(false);

//     try {
//       // Send user message to the server
//       const response = await askQuestion({
//         sessionId: sessionId,
//         message: inputValue.trim(),
//       }).unwrap();

//       // Add server response to messages (only once)
//       if (response?.success && response?.data?.reply) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant" as const,
//             content: response.data.reply,
//           },
//         ]);
//       } else {
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant" as const,
//           content: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#E9EBF8]  text-black font-[montserrat]">
//       {/* Sidebar */}
//       <ChatSidebar
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//         setIsSearchModalOpen={setIsSearchModalOpen}
//       />

//       {/* Main Content */}
//       <div className="lg:w-[947px] mx-auto flex flex-col h-full relative">
//         {/* Mobile menu toggle */}
//         <div
//           className="md:hidden absolute top-4 left-4 z-10"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <div className="w-6 h-0.5 bg-white mb-1.5"></div>
//           <div className="w-6 h-0.5 bg-white mb-1.5"></div>
//           <div className="w-6 h-0.5 bg-white"></div>
//         </div>

//         {/* Header */}
//         <div className="h-4"></div>

//         {/* Messages */}
//         {showWelcomeMessage ? (
//           <div className="flex-1 flex items-center justify-center p-4">
//             <div className="text-center">
//               <p className="lg:text-[33px] text-xl text-[#33CDF0] font-medium font-[montserrat]">
//                 Hello! Ask me about business growth, leadership, or strategy
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
//             {isLoading ? (
//               <div className="text-center">Loading chat history...</div>
//             ) : (
//               messages.map((message, index) => (
//                 <ChatMessage
//                   key={`${message.role}-${index}`}
//                   message={message}
//                   isLoading={
//                     index === messages.length - 1 &&
//                     message.role === "assistant" &&
//                     isAsking
//                   }
//                 />
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         )}

//         <div className="p-4">
//           <form onSubmit={handleSubmit} className="relative">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder=" For best results, be specific with your requests."
//               className="w-full bg-white  placeholder-[#929494] text-black rounded-2xl lg:py-9 py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#01336F]"
//             />
//             <button
//               type="submit"
//               disabled={!inputValue.trim() || isAsking}
//               className="absolute right-2 top-1/2 transform  -translate-y-1/2 p-2 mr-2 rounded-full bg-[#01336F] text-[#005163] "
//             >
//               <ArrowUp className="h-4 w-4 text-white" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import {
  useAskQuestionMutation,
  useUserChatsQuery,
} from "@/redux/features/sessionSlice";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";
import { useParams } from "next/navigation";
// import ChatMessage from "@/components/ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const params = useParams();
  const id = params?.id as string;
  console.log(id, "id");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat history
  const { data, isLoading } = useUserChatsQuery(id);

  const [askQuestion, { isLoading: isAsking }] = useAskQuestionMutation();

  // Initialize sessionId from localStorage
  useEffect(() => {
    const sessionIds = localStorage.getItem("sessionId") || crypto.randomUUID();
    localStorage.setItem("sessionId", sessionIds);
    setSessionId(sessionIds);
  }, []);

  // Populate messages from chat history when data is available
  useEffect(() => {
    if (data?.data) {
      const chatHistory = data.data.map((chat: any) => ({
        role: chat.role === "question" ? "user" : "assistant",
        content: chat.message || "No content provided",
      }));
      setMessages(chatHistory);
      setShowWelcomeMessage(false);
    }
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: "user" as const, content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowWelcomeMessage(false);

    try {
      const response = await askQuestion({
        sessionId: id,
        message: inputValue.trim(),
      }).unwrap();

      if (response?.success && response?.data?.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant" as const,
            content: response.data.reply,
          },
        ]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  // Skeleton UI component for loading state
  const SkeletonMessage = () => (
    <div className="mb-6 max-w-4xl animate-pulse">
      <div className="p-4 rounded-lg flex items-start space-x-2">
        <div className="size-6 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  // Spinner component for loading
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-4">
      <div className="w-8 h-8 border-4 border-t-[#01336F] border-gray-300 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#E9EBF8] text-black font-[montserrat]">
      <ChatSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />

      <div className="lg:w-[947px] mx-auto flex flex-col h-full relative">
        <div
          className="md:hidden absolute top-4 left-4 z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>

        <div className="h-4"></div>

        {/* Messages */}
        {showWelcomeMessage && !isLoading ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="lg:text-[33px] text-xl text-[#33CDF0] font-medium font-[montserrat]">
                Hello! Ask me about business growth, leadership, or strategy
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
            {isLoading ? (
              <div className="space-y-4">
                <LoadingSpinner />
                <SkeletonMessage />
                <SkeletonMessage />
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage
                    key={`${message.role}-${index}`}
                    message={message}
                    isLoading={
                      index === messages.length - 1 &&
                      message.role === "assistant" &&
                      isAsking
                    }
                  />
                ))}
                {isAsking && <LoadingSpinner />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        )}

        <div className="p-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder=" For best results, be specific with your requests."
              className="w-full bg-white placeholder-[#929494] text-black rounded-2xl lg:py-9 py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#01336F]"
              disabled={isAsking}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isAsking}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 mr-2 rounded-full bg-[#01336F] text-[#005163]"
            >
              <ArrowUp className="h-4 w-4 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
