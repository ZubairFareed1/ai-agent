import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Allchat from './pages/Allchat'
import LoginHistory from './pages/LoginHistory';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import MainLayout from './MainLayout';
import  Signup  from './pages/Signup';
import  Login  from './pages/Login';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Chat /></MainLayout>} />
        <Route path="/:chatid" element={<MainLayout><Chat /></MainLayout>} />
        <Route path="/allchats" element={<MainLayout><Allchat /></MainLayout>} />
        <Route path="/login_history" element={<MainLayout><LoginHistory /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/logout" element={<MainLayout><Logout /></MainLayout>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </Router>
  )
}
