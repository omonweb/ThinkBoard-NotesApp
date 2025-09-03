import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Navbar from './components/Navbar.js';
import LoginPage from './pages/LoginPage.js';
import AuthCallbackPage from './pages/AuthCallbackPage.js';
import HomePage from './pages/HomePage.js';
import CreatePage from './pages/CreatePage.js';
import NoteDetailPage from './pages/NoteDetailPage.js';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
          
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <HomePage />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <CreatePage />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/note/:id"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <NoteDetailPage />
                  </>
                </ProtectedRoute>
              }
            />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
