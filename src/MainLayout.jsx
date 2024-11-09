import React from 'react'
import Sidebar from './components/Sidebar'
import { useTheme } from './ThemeContext.jsx';

export default function MainLayout({children}) {
  const { theme } = useTheme();
  return (
    <div className='flex'>
        {/* Sidebar */}
        <div className='hidden lg:block'>
                <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${theme === 'light' ? 'bg-gray-200' : 'surface-900'}`}>
                {children}
        </div>

      
    </div>
  )
}
