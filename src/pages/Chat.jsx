// import React from "react";
// import SearchHistory from "../components/chat/S  earchHistory";
import NewChatButton from "../components/chat/NewChatButton";
import AllHistory from "../components/chat/AllHistory";
import { Scrollbars } from "rc-scrollbars";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

import { HiChatAlt2 } from "react-icons/hi";
import Header from "../components/Header";
import Conversation from "../components/chat/Conversation";
import QueryCard from "../components/chat/QueryCard";
import { useConversation } from "../context/conversationContext";

import { useTheme } from "../ThemeContext";

export default function Chat() {
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const { conversationData } = useConversation();

  useEffect(() => {
    if (scrollRef.current) {
      const scrollbars = scrollRef.current;
      const isAtBottom =
        scrollbars.getScrollTop() + scrollbars.getClientHeight() >=
        scrollbars.getScrollHeight();

      if (isAtBottom) {
        scrollbars.scrollToBottom();
      }
    }
  }, [conversationData]); // Trigger on new messages

  return (
    <>
      <div className="flex h-screen lg:p-3 gap-5">
        {/* history section */}
        <div className=" lg:w-4 hidden h-full lg:flex flex-column">
          <div
            className={`h-full border-1 ${
              theme === "light"
                ? "bg-white  border-300"
                : "surface-800 border-800"
            }  border-round-lg flex flex-column overflow-hidden`}
          >
            <div
              className={`p-3 ${theme === "light" ? "" : "border-bottom-1"}`}
            >
              <NewChatButton />
            </div>

            <Scrollbars className="flex-auto" ref={scrollRef}>
              <AllHistory />
            </Scrollbars>
            <Link
              to="/allchats"
              className={`no-underline ${
                theme === "light" ? "text-gray-200" : "surface-600"
              } p-3 border-200 border-top-1 flex align-items-center gap-3`}
            >
              <HiChatAlt2
                className={`${
                  theme === "light" ? "text-gray-500" : "text-200"
                } text-4xl`}
              />
              <span
                className={`${
                  theme === "light" ? "text-800" : "text-200"
                } text-xl font-semibold`}
              >
                All Chats
              </span>
            </Link>
          </div>
        </div>

        {/* chat section */}
        <div
          className={`w-12 lg:w-8 h-full border-1 border-round-lg overflow-hidden flex flex-column relative ${
            theme === "light" ? "bg-white border-300" : "surface-800 border-700"
          }`}
        >
          <div className="">
            <Header />
          </div>

          {/* conversation */}
          <div className="h-full">
            <Scrollbars>
              <Conversation />
            </Scrollbars>
          </div>

          {/* Query */}
          <div className="w-full relative left-0 bottom-0 ">
            <QueryCard />
          </div>
        </div>
      </div>
    </>
  );
}
