import React from 'react'
import Header from '../components/Header'
import { useTheme } from '../ThemeContext'

export default function Profile() {
  const { theme } = useTheme();
  return (
    <div className='h-screen p-5'>
        <div className={`h-full ${theme === 'light' ? 'bg-white  border-400' : ' border-700 surface-800'} border-round-md border-1`}>
            <Header />

        </div>
      
    </div>
  )
}
