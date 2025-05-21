
// "use client";

// import { marked } from "marked";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// interface MessageProps {
//   message: {
//     role: "user" | "assistant";
//     content: string;
//   };
//   isLoading?: boolean;
// }

// export default function ChatMessage({
//   message,
//   isLoading = false,
// }: MessageProps) {
//   const [isTyping, setIsTyping] = useState(false);
//   const [formattedContent, setFormattedContent] = useState("");

//   useEffect(() => {
//     async function parseContent() {
//       if (message.role === "assistant") {
//         setIsTyping(isLoading);
//         if (!isLoading && message.content) {
//           const parsed = await marked.parseInline(message.content);
//           setFormattedContent(parsed);
//         }
//       }
//     }
//     parseContent();
//   }, [message.role, isLoading, message.content]);

//   if (message.role === "user") {
//     return (
//       <div className="mb-4 max-w-3xl ml-auto">
//         <div className="bg-[#55769F] text-white p-3 rounded-lg">
//           <p>{message.content || "No content available"}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-6 max-w-4xl">
//       <div className="p-4 rounded-lg flex items-start space-x-2">
//         <Image
//           src="/Group (1).svg"
//           alt="assistant"
//           width={40}
//           height={40}
//           className="size-6 rounded-full mb-2"
//         />
//         {isTyping ? (
//           <div className="flex space-x-2 items-center">
//             <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
//             <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse delay-75"></div>
//             <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
//           </div>
//         ) : (
//           <div
//             className="prose prose-invert max-w-none text-gray-700"
//             dangerouslySetInnerHTML={{
//               __html: marked.parse(message.content),
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { marked } from "marked";
import Image from "next/image";
import { useState, useEffect } from "react";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading = false }: MessageProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [formattedContent, setFormattedContent] = useState("");

  useEffect(() => {
    async function parseContent() {
      if (message.role === "assistant") {
        setIsTyping(isLoading);
        if (!isLoading && message.content) {
          const parsed = await marked.parseInline(message.content);
          setFormattedContent(parsed);
        }
      }
    }
    parseContent();
  }, [message.role, isLoading, message.content]);

  const LoadingSpinner = () => (
    <div className="flex justify-start items-center p-4">
      <div className="w-6 h-6 border-4 border-t-[#01336F] border-gray-300 rounded-full animate-spin"><h1></h1></div>
    </div>
  );

  if (message.role === "user") {
    return (
      <div className="mb-4 max-w-3xl ml-auto">
        <div className="bg-[#55769F] text-white p-3 rounded-lg">
          <p>{message.content || "No content available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 max-w-4xl">
      <div className="p-4 rounded-lg flex items-start space-x-2">
        <Image
          src="/Group (1).svg"
          alt="assistant"
          width={40}
          height={40}
          className="size-6 rounded-full mb-2"
        />
        {isTyping ? (
          <LoadingSpinner />
        ) : (
          <div
            className="prose prose-invert max-w-none text-gray-700"
            // dangerouslySetInnerHTML={{
            //   __html: formattedContent || marked.parse(message.content),
            // }}
            dangerouslySetInnerHTML={{
              __html: marked.parse(message.content),
            }}
          />
        )}
      </div>
    </div>
  );
}