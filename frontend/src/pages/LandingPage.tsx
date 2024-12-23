import React, { useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { gql, useQuery } from '@apollo/client';

import { useAuth } from '../components/authContext';
import TodoList from '../components/ToDoList';



const TODOS_QUERY = gql`
  query GetTodos {
    todos {
      id
      title
      description
      completed
    }
  }
`;

const LandingPage: React.FC = () => {
  const { user } = useAuth(); 
  const { loading, error, data, refetch } = useQuery(TODOS_QUERY, {
    skip: !user, 
  });

  useEffect(() => {
    if (user) {
      refetch(); 
    }
  }, [user, refetch]);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Todo App
        </Typography>
        <Typography variant="h5">
          Manage your tasks effectively with our simple and efficient tool.
        </Typography>
      </Box>

      {!user && (
         <Box
         sx={{
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           justifyContent: 'center',
           mt: 4, 
         }}
       >
         {/* Image */}
         <img
           src="/todo2.avif"
           alt="todoimage"
           style={{
             width: '300px',
             height: 'auto',
             marginBottom: '16px',
           }}
         />
       
         <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
           You have to log in to create or view todos.
         </Typography>
       </Box>
      )}

      {user && (
        <TodoList
          loading={loading}
          error={error}
          todos={data?.todos || []}
          refetch={refetch} 
        />
      )}
    </Container>
  );
};

export default LandingPage;
