import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Avatar } from '@mui/material';
import { useAuth } from '../components/authContext';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useAuth();
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { username, password } });
      setToken(data.register); 
      localStorage.setItem('token', data.register); 
      setUser(username); 
      localStorage.setItem('user', username); 
      navigate('/'); 
    } catch (error) {
      console.error(error);
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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Register
        </Typography>

  
        <Avatar
          alt="Registration"
          src="/todo3.jpg" 
          sx={{ width: 160, height: 160 }}
        />

        {/* Form */}
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
            Register
          </Button>
        </form>

        {/* Error Message */}
        {error && (
          <Typography color="error" textAlign="center" sx={{ marginTop: 2 }}>
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Register;
