//   {
//     id: 1,
//     timestamp: "2024-11-03T12:34:56Z",
//     role: "user",
//     message: "How can I handle authorization in a React application?",
//   },
/* eslint-disable react/prop-types */

import { useTheme } from "../../ThemeContext";
import { useConversation } from "../../context/conversationContext";
import { transformConversationData } from "../../utils/transformConversationData";
import { useLocation } from "react-router-dom";



export default function Conversation() {
  const { theme } = useTheme();
  const location = useLocation();
  const { conversationData } = useConversation();
  const formatedConversation = conversationData
    ? transformConversationData(conversationData)
    : [];
  return (
    <div className="flex flex-column gap-4 p-4">
      {location.pathname=== "/"?
        <div className="flex flex-column gap-4 align-items-center justify-content-center">
          <h1 className={`text-5xl  font-bold ${theme === 'light' ? 'text-gray-700' : 'text-200' } `}>What Can I help with?</h1>
          <img src="/chat_with_bot1.png" alt="Chat with bot" width={300} />
        </div>
      : formatedConversation.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          message={message.message}
        />
      ))}
    </div>
  );
}

function MessageBubble({ role, message }) {
  const { theme } = useTheme();
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div
        className={`p-2 md:p-3 border-round-md max-w-xs ${
          isUser ? `${theme==='light'? 'bg-blue-500':'bg-blue-300'}  text-white` : `${theme === 'light' ? 'surface-200 text-800' : 'surface-700 text-400'} shadow-1`
        }`}
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          borderRadius: "15px",
          maxWidth: "70%",
        }}
      >
        <p className="text-sm md:text-xl m-0">{message}</p>
      </div>
    </div>
  );
}
