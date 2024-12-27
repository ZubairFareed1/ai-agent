/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Scrollbars from "rc-scrollbars";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/time";
import { MdDeleteOutline } from "react-icons/md";
import { useConversation } from "../context/conversationContext";
// import { useConversation } from "../context/conversationContext";

export default function Allchat() {
  const { theme } = useTheme();
  // const { fetchConversation, deleteConversation, conversationData } = useConversation();


    const [conversationHistory, setConversationHistory] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
          console.log(data.conversations);
          console.log("fetch history output",);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }, []);

  return loading ? (
  <div>
    <p>Loading...</p>
  </div>
):(  
    <div className="h-screen lg:px-3 lg:py-5 ">
      <div
        className={`h-full flex flex-column border-1 border-round-lg ${
          theme === "light" ? "bg-white  border-400 " : "surface-800 border-700"
        }`}
      >
        <div className="">
          <Header />
        </div>
        <Scrollbars className="h-full ">
          {conversationHistory.map((item) => (
            <HistoryCard item={item} key={item.conversation_id} />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
}

export function HistoryCard({ item }) {
  const { conversation_id, first_query, first_response, started_at } = item;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const deleteHandler = (e) => {
    e.stopPropagation()
    
  };
  const { fetchConversation } = useConversation()

  return (
    <div
      className={`px-3 m-4 ${
        theme === "light"
          ? "hover:bg-blue-50 border-400"
          : "hover:surface-800 border-700"
      } border-1  flex gap-4 py-3 border-round-lg `}
      onClick={() => {
        navigate(`/conversation/${conversation_id}`);
        fetchConversation(conversation_id);
      }}
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
      <div className="flex flex-column justify-content-between gap-2 w-full">
        <div className="flex justify-content-between">
          <span className="text-gray-500">Assistant</span>
          <span className="text-gray-500">{timeAgo(started_at)}</span>
        </div>
        <div className="flex justify-content-between">
          <div className="flex flex-column justify-content-between gap-2">
            <h2
              className={`m-0 text-xl ${
                theme === "light" ? "text-700" : "text-200"
              } truncate-text`}
            >
              {first_query}
            </h2>
            <p className="m-0 truncate-text text-gray-500">{first_response}</p>
          </div>
          <div>
            <button className={`w-3rem h-3rem flex align-items-center justify-content-center border-circle border-1 ${theme === 'light' ? 'surface-300 border-500' : ' surface-700 border-900'} cursor-pointer`} onClick={deleteHandler}>
              <MdDeleteOutline className={`text-3xl ${theme === 'light' ? 'text-700' : 'text-300'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
