import { useState } from "react";
import { useTheme } from "../../ThemeContext";
import { useConversation } from "../../context/conversationContext";

export default function QueryCard() {
  const { theme } = useTheme();
  return (
    <div className={`border-top-1 h-5rem md:h-6rem ${theme === "light" ? "bg-white border-400" : "surface-700  border-600"} flex justify-content-center align-items-center`}>
      <QueryInput theme={theme} />
    </div>
  );
}

function QueryInput(theme) {
  const { continue_conversation } = useConversation();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault(); 
    console.log("Query submitted:", query);
    setQuery("");
    const conversation_id = JSON.parse(sessionStorage.getItem('conversationId'))
    continue_conversation(14, conversation_id, query)
  };

  return (
    <div
      className={`flex align-items-center border-1 p-1 mx-2 md:mx-8 ${theme === 'light' ? 'bg-white border-400' : 'border-300'}`}
      style={{ 
        maxWidth: "600px",
        width: "100%",
        borderRadius: "50px",
        outline: isFocused ? "2px solid #007bff" : "none",
        outlineOffset: isFocused ? "1px" : "0px",

      }}
    >
      <input
        type="text"
        className={`pl-2 md:p-3 border-none w-full bg-transparent text-base md:text-xl focus:border-none  ${theme === 'light' ? 'text-600' : 'text-300'}`}
        placeholder="Message to SenseiAi..."
        style={{ outline: "none", border: "none", }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleQueryChange}
        value={query}
      />
      <button className="p-2 md:p-3 bg-blue-500 border-none cursor-pointer flex justify-content-center align-items-center border-circle"
      onClick={handleQuerySubmit}
      >
        <i className="pi pi-arrow-right text-white text-2xl"></i>
      </button>
    </div>
  );
}
