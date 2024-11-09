import React from "react";
import Header from "../components/Header";
import AccordionList from "../components/login-history/AccordionList";

export default function LoginHistory() {
  return (
    
    <div className="h-screen p-5">
      <div className=" bg-white h-full border-1 border-300 border-round-lg overflow-hidden">
        
      <div className="">
        <Header />
      </div>
      {/* Accordion */}
      <AccordionList />
      
      
      </div>
    </div>
  );
}
