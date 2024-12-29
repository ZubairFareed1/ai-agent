/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import "../../global.css";
import { useTheme } from "../../ThemeContext";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/time";
import { useConversation } from "../../context/conversationContext";

export default function AllHistory() {
  const { theme } = useTheme();
  const [conversationHistory, setConversationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { conversationData} = useConversation();

  useEffect(() => {
    const user_id = JSON.parse(sessionStorage.getItem("user_id"))
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/conversation-history/${user_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch history");
        const data = await response.json();
        setConversationHistory(data.conversations);
        sessionStorage.setItem('conversation_history', JSON.stringify(data.conversations))
        console.log("fetch history output",);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [conversationData]);

  if (loading) return <div className={` text-center ${theme=='light'?"text-gray-700":"text-200"}`}>Loading...</div>;

  return conversationHistory.length === 0 ? (
    <NoHistory theme={theme} />
  ) : (
    <div className="">
      {conversationHistory.map((item) => (
        <HistoryCard item={item} key={item.conversation_id} />
      ))}
    </div>
  );
}

export function HistoryCard({ item }) {
  const { fetchConversation, currentHistoryLoadHandler } = useConversation();
  const {
    conversation_id = "",
    first_query = "No query available",
    first_response = "No response available",
    started_at = new Date().toISOString(),
  } = item;
  const { theme } = useTheme();
  const navigate = useNavigate();

  const historyClickHandler = () => {
    navigate(`/conversation/${conversation_id}`);
    fetchConversation(conversation_id);
  };
  useEffect(() => {
    currentHistoryLoadHandler(historyClickHandler)
  }, [])


  return (
    <div
      className={`px-3 ${
        theme === "light"
          ? "hover:bg-blue-50 border-300"
          : "hover:surface-800 border-900"
      } cursor-pointer border-y-1 flex gap-4 py-3`}
      onClick={historyClickHandler}
    >
      <div className="flex align-items-center">
        <div
          className={`w-3rem h-3rem border-round-sm ${
            theme === "light" ? "bg-blue-400" : "surface-700"
          } flex align-items-center justify-content-center`}
        >
          <span className={`text-2xl font-semibold text-white`}>S</span>
        </div>
      </div>
      <div className="flex flex-column justify-content-between w-full gap-2">
        <div className="flex justify-content-between ">
          <span className="text-gray-500">Assistant</span>
          <span className="text-gray-500">{timeAgo(started_at)}</span>
        </div>
        <h2
          className={`m-0 text-xl ${
            theme === "light" ? "text-700" : "text-200"
          } truncate-text`}
        >
          {first_query}
        </h2>
        <p className="m-0 truncate-text text-gray-500">{first_response}</p>
      </div>
    </div>
  );
}

const NoHistory = ({ theme }) => {
  return (
    <div className="flex align-items-center justify-content-center">
      <span className={`${theme === "light" ? "text-800" : "text-white"}`}>
        No History
      </span>
    </div>
  );
};
