import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useTheme } from '../../ThemeContext.jsx';


export default function SearchHistory() {
  const { theme } = useTheme();
  return (
    <div className={`flex align-items-center border-1 ${theme === "light" ? "border-gray-400 bg-white" : "surface-700 border-600"} pl-2 `} style={{borderRadius:"50px"}}>
        <FiSearch className='text-3xl m-2 text-gray-400'/>
        <input type="text" className={`p-3 border-none w-full bg-transparent text-xl focus:border-none ${theme === 'light' ? 'text-gray-600' : 'text-200'} `} placeholder='Search history...' style={{outline:'none', border:'none'}}/>
    </div>
  )
}
