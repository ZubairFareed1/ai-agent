/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "../components/Header";
import Scrollbars from "rc-scrollbars";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/time";
import { MdDeleteOutline } from "react-icons/md";
// import { useConversation } from "../context/conversationContext";

export default function Allchat() {
  const { theme } = useTheme();
  // const { fetchConversation, deleteConversation, conversationData } = useConversation();
  const [conversations, setConversations] = useState([
    {
      id: 1,
      query: "How to learn React?",
      response:
        "React is a JavaScript library for building user interfaces. You can start learning by following the official React documentation.",
      dateTime: "2024-11-03 20:15:30",
    },
    {
      id: 2,
      query:
        "What is the difference between let, const, and var in JavaScript?",
      response:
        "In JavaScript, `let` and `const` are used to declare variables. `let` allows you to reassign values, while `const` is used for constants that cannot be reassigned.",
      dateTime: "2024-11-03 20:20:45",
    },
    {
      id: 3,
      query: "How to create a React component?",
      response:
        "A React component is a reusable piece of UI that can be rendered multiple times. You can create one using a function or a class component.",
      dateTime: "2024-11-03 20:25:12",
    },
    {
      id: 4,
      query: "What is the purpose of the useEffect hook in React?",
      response:
        "The `useEffect` hook in React is used to perform side effects in functional components. It's commonly used for tasks like fetching data, subscribing to events, or managing subscriptions.",
      dateTime: "2024-11-03 20:30:18",
    },
    {
      id: 5,
      query: "How to handle form submissions in React?",
      response:
        "In React, you can handle form submissions by using the `onSubmit` event on the form element. You can use state to manage form data and handle form submissions.",
      dateTime: "2024-11-03 20:35:27",
    },
    {
      id: 6,
      query: "What are the benefits of using Redux in React?",
      response:
        "Redux is a state management library for React applications. It helps manage complex state, makes state updates predictable, and simplifies state management in large applications.",
      dateTime: "2024-11-03 20:40:36",
    },
    {
      id: 7,
      query: "How to optimize performance in React?",
      response:
        "React provides tools like `React.memo`, `useMemo`, and `useCallback` to optimize performance. These techniques help prevent unnecessary re-renders and improve overall application performance.",
      dateTime: "2024-11-03 20:45:50",
    },
  ]);

  return (
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
          {conversations.map((item) => (
            <HistoryCard item={item} key={item.id} />
          ))}
        </Scrollbars>
      </div>
    </div>
  );
}

export function HistoryCard({ item }) {
  const { id, query, response, dateTime } = item;
  const { theme } = useTheme();
  const navigate = useNavigate();
  const deleteHandler = (e) => {
    e.stopPropagation()
    
  };

  return (
    <div
      className={`px-3 m-4 ${
        theme === "light"
          ? "hover:bg-blue-50 border-400"
          : "hover:surface-800 border-700"
      } border-1  flex gap-4 py-3 border-round-lg `}
      onClick={() => {
        navigate(`/conversation/${id}`);
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
          <span className="text-gray-500">{timeAgo(dateTime)}</span>
        </div>
        <div className="flex justify-content-between">
          <div className="flex flex-column justify-content-between gap-2">
            <h2
              className={`m-0 text-xl ${
                theme === "light" ? "text-700" : "text-200"
              } truncate-text`}
            >
              {query}
            </h2>
            <p className="m-0 truncate-text text-gray-500">{response}</p>
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
