import React from "react";
import Header from "../components/Header";
import AccordionList from "../components/login-history/AccordionList";
import { useTheme } from "../ThemeContext";

export default function LoginHistory() {
  const { theme } = useTheme();
  return (
    
    <div className="h-screen p-5">
      <div className={` h-full border-1  border-round-lg overflow-hidden ${theme === 'light' ? 'bg-white border-300' : 'surface-800 border-700'}`}>
        
      <div className="">
        <Header />
      </div>
      {/* Accordion */}
      <AccordionList />
      
      
      </div>
    </div>
  );
}
