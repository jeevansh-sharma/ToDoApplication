import React from 'react';
import './App.css';
import client from './AppoloClient';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './components/authContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import CreateTodo from './pages/CreateToDo';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/createTodo" element={
              <ProtectedRoute>
              <CreateTodo />
              </ProtectedRoute>
              } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
