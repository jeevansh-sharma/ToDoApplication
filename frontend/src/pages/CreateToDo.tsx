import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authContext';

const CREATE_TODO_MUTATION = gql`
  mutation CreateTodo($title: String!, $description: String!) {
    createTodo(title: $title, description: $description) {
      id
      title
      description
      completed
    }
  }
`;

const CreateTodo: React.FC = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [createTodo, { loading, error }] = useMutation(CREATE_TODO_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createTodo({
        variables: { title, description },
      });
      console.log('Todo created:', data.createTodo);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // Ensures content height is more than half the screen height
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Section: Form */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ padding: 2
            ,minHeight: '300px',
            
           }}>
            <Typography variant="h4" gutterBottom>
              Create Todo
            </Typography>
            <form onSubmit={handleSubmit} >
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                sx={{ marginBottom: 4 }}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              
                required
                sx={{ marginBottom: 4 }}
              />
              <Button type="submit" variant="contained" disabled={loading} sx={{ width: '100%' }}>
                Create Todo
              </Button>
            </form>
            {error && <Typography color="error" sx={{ marginTop: 2 }}>{error.message}</Typography>}
          </Box>
        </Grid>

        {/* Right Section: Todo Image */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src="/todo1.jpg" // Replace with actual todo image or illustration
              alt="Todo"
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                borderRadius: '8px',
                objectFit : 'cover',
               
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateTodo;
