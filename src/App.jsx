// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Allchat from './pages/Allchat';
import LoginHistory from './pages/LoginHistory';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import MainLayout from './MainLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminUpload from './pages/AdminUpload';
import AdminLayout from './components/admin/AdminLayout';
import PreventWords from './pages/PreventWords';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chat />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:chatid"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chat />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/allchats"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Allchat />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login_history"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LoginHistory />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Logout />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path='/admin/upload' element={
          <AdminLayout>
            <AdminUpload />
          </AdminLayout>
          }/>
          <Route path='/admin/prevent-words' element={
          <AdminLayout>
            <PreventWords />
          </AdminLayout>
          }/>
      </Routes>
    </Router>
  );
}
