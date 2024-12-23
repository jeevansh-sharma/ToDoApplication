import React from 'react';
import { Button, Container } from '@mui/material';
import { useAuth } from '../components/authContext';

const Logout: React.FC = () => {
  const { setUser, setToken } = useAuth();

  const handleLogout = () => {
    setUser("");
    setToken("");
    localStorage.removeItem('token');
  };

  return (
    <Container>
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Logout;
