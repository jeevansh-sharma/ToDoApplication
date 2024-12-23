import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar } from '@mui/material';
import { useAuth } from '../components/authContext';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      setToken(data.login); 
      localStorage.setItem('token', data.login); 
      setUser(username);
      navigate('/'); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        backgroundColor: '#f4f4f4', 
      }}
    >
      <Box
        sx={{
          width: '300px',
          height: '400px',
          padding: 3,
          backgroundColor: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
          borderRadius: '8px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
 
        <Avatar
          alt="Login Avatar"
          src="/todo3.jpg"
          sx={{
            width: 160,
            height: 160,
           
          }}
        />

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            Login
          </Button>
        </form>
        {error && (
          <Typography color="error" textAlign="center" sx={{ marginTop: 2 }}>
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
