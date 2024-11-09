import React from 'react'
import { RiChatNewFill } from "react-icons/ri";
import { useTheme } from '../../ThemeContext.jsx';


export default function NewChatButton() {
  const { theme } = useTheme();
  return (
    <button className={`w-full p-3 flex align-items-center justify-content-center gap-4 border-none border-round-md ${theme === 'light' ? 'bg-gray-200' : 'surface-900'} cursor-pointer shadow-500`}>
        <RiChatNewFill className={`text-5xl ${theme === 'light' ? ' text-gray-600' : 'text-200' }`} />
        <span className={`text-3xl ${theme === 'light' ? 'text-700' : 'text-200'} text-semibold`}>New Chat</span>
      
    </button>
  )
}
