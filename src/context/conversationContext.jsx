/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import axios from "axios";
// import { transformConversationData } from '../utils/transformConversationData';
// Create the context
const ConversationContext = createContext();

// Custom hook for accessing the context
export const useConversation = () => useContext(ConversationContext);

// Provider Component
export const ConversationProvider = ({ children }) => {
  const [conversationData, setConversationData] = useState(
    JSON.parse(sessionStorage.getItem("conversationData")) || null
  );
  const [conversationId, setConversationId] = useState(
    JSON.parse(sessionStorage.getItem("conversationId")) || null
  );

  // Function to fetch conversation data
  const fetchConversation = async (id) => {
    console.log();
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/conversation/${id}`
      );
      // if (!response.ok) throw new Error('Failed to fetch conversation data');
      const data = await response.json();

      // Update state and session storage
      setConversationData(data);
      setConversationId(id);
      sessionStorage.setItem("conversationId", JSON.stringify(id));
      sessionStorage.setItem("conversationData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const continue_conversation = async (id, conversationId, query) => {
    const auth = await JSON.parse(sessionStorage.getItem("auth"));
    console.log(typeof conversationId);
    if(conversationId === null) return;
    
    console.log("Hello world");
    try {
      const url = "http://localhost:3000/api/users/continue_conversation";
      const payload = {
        user_id: id,
        conversation_id: conversationId,
        query_text: query,
      };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`, // Add token to Authorization header
        },
      });
      await fetchConversation(conversationId);
      // if (!response.ok) throw new Error('Failed to fetch conversation data');
      const data = response.data;
      console.log(data);
      // Update state and session storage
    //   setConversationData(data);
    //   sessionStorage.setItem('conversationData', JSON.stringify(data));
      // sessionStorage.setItem('conversationId', JSON.stringify(conversationId))
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };
  // useEffect(() => {
  //         continue_conversation(14, 10)
  // }, [])

  const new_conversation = async (id, query) => {
      try {
        const auth = await JSON.parse(sessionStorage.getItem("auth"));
      const url = "http://localhost:3000/api/users/new_conversation";
      const payload = {
        user_id: id,
        query_text: query,
      };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`, // Add token to Authorization header
        },
      });
      const data = response.data;
      console.log(data);
      // Update state and session storage
    //   setConversationData(data);
    //   setConversationId(data.conversation.conversation_id);
    //   sessionStorage.setItem("conversationData", JSON.stringify(data));
    //   sessionStorage.setItem("conversationId", JSON.stringify(data.conversation.conversation_id));
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };
  
  return (
    <ConversationContext.Provider
      value={{
        conversationData,
        fetchConversation,
        conversationId,
        continue_conversation,
        new_conversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
