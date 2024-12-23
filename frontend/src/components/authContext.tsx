import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  token: string | null;
  setUser: (user: string) => void;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    }
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
