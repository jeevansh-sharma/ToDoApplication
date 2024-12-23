import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const Navbar: React.FC = () => {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user) {
      const decodedUser = JSON.parse(atob(storedToken.split('.')[1])); // Decoding JWT payload
      setUser(decodedUser.username || null);
    }
  }, [user, setUser]);

  const handleLogout = () => {
    setUser("");
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        <Box>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Button color="inherit" component={Link} to="/createTodo">
                Create Todo
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
