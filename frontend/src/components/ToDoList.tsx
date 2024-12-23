import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconButton, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import EditIcon from '@mui/icons-material/Edit';
import { COMPLETE_TODO_MUTATION, DELETE_TODO_MUTATION, EDIT_TODO_MUTATION } from '../graphql/mutations';



const TodoList: React.FC<{ loading: boolean, error: any, todos: any[], refetch: any }> = ({ loading, error, todos, refetch }) => {
  const [deleteTodoMutation] = useMutation(DELETE_TODO_MUTATION);
  const [completeTodoMutation] = useMutation(COMPLETE_TODO_MUTATION); 
  const [editTodoMutation] = useMutation(EDIT_TODO_MUTATION);
  const [activeFilter, setActiveFilter] = useState<'completed' | 'pending'>('pending');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>(''); 

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoMutation({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeTodoMutation({ variables: { id, completed: true } });
      refetch();
    } catch (err) {
      console.error("Error completing todo:", err);
    }
  };

  const handleEdit = (todo: any) => {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleSaveEdit = async () => {
    if (editedTitle.trim() === '' || editedDescription.trim() === '') {
      alert('Title and Description are required');
      return;
    }

    try {
      await editTodoMutation({ variables: { id: editingTodoId, title: editedTitle, description: editedDescription } });
      setEditingTodoId(null); 
      refetch(); 
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <Box sx={{ mt: 5 }}>
      {loading && <Typography>Loading todos...</Typography>}
      {error && <Typography color="error">Error loading todos: {error.message}</Typography>}

     
      <Box sx={{ mb: 2 }}>
        <Button
          variant={activeFilter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={activeFilter === 'pending' ? 'contained' : 'outlined'}
          onClick={() => setActiveFilter('pending')}
          sx={{ ml: 1 }}
        >
          Pending
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{activeFilter === 'completed' ? 'Completed' : 'Pending'}</Typography>
        {activeFilter === 'pending' && pendingTodos.length === 0 && <Typography>No pending todos</Typography>}
        {activeFilter === 'completed' && completedTodos.length === 0 && <Typography>No completed todos</Typography>}

       
        {activeFilter === 'pending' &&
          pendingTodos.map((todo) => (
            <Accordion key={todo.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {editingTodoId === todo.id ? (
                    <TextField
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      label="Title"
                      fullWidth
                    />
                  ) : (
                    todo.title
                  )}
                </Typography>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(todo.id)}
                  sx={{ '&:hover': { color: 'red' }, mr: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => handleEdit(todo)}
                  sx={{ '&:hover': { color: 'blue' }, mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => (editingTodoId === todo.id ? handleSaveEdit() : handleComplete(todo.id))}
                  sx={{ '&:hover': { color: 'green' }, mr: 1 }}
                >
                  <CheckCircleIcon />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                {editingTodoId === todo.id ? (
                  <TextField
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                  />
                ) : (
                  <Typography>{todo.description}</Typography>
                )}
                {editingTodoId === todo.id && (
                  <Button variant="contained" onClick={handleSaveEdit} sx={{ mt: 2 }}>
                    Save
                  </Button>
                )}
              </AccordionDetails>
            </Accordion>
          ))}

       
        {activeFilter === 'completed' &&
          completedTodos.map((todo) => (
            <Accordion key={todo.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {todo.title}
                </Typography>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(todo.id)}
                  sx={{ '&:hover': { color: 'red' }, mr: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{todo.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </Box>
  );
};

export default TodoList;
