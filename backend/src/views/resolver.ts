
import { Resolvers } from "@apollo/client"; 
import { AddToDo, CompleteToDo, DeleteTodo, EditToDo, ListToDo } from "../controllers/toDoCont";
import {  login, register } from "../controllers/userCont";


interface Context {
  user: {
    id: number; 
    username: string; 
  } | null;
}

export const resolvers= {
  Query: {
   
    todos: async (_:any, __: any, context:any) => {
      const { user } = context;
      const {userId} = user;
      if (!user) {
        throw new Error("Authentication required");
      }
      return ListToDo(userId);
    },
  },
  Mutation: {
    
    login: async (_:any, { username, password }: { username: string; password: string }) => {
      return login(username, password);
    },

    register: async (_:any, { username, password }: { username: string; password: string }) => {
      return register(username, password);
    },

    createTodo: async (_:any, { title, description }: { title: string; description: string }, context:any) => {
      const { user} = context;
      console.log(user,"context info");
      const {userId} = user;
      console.log(userId,"user info");
      if (!user) {
        throw new Error("Authentication required");
      }
      return AddToDo(userId, title, description);
    },
   
    completeTodo: async (_:any, { id, completed }: { id: number; completed: boolean }) => {
      return CompleteToDo(id, completed);
    },
    editTodo: async (_:any, { id, title, description }: { id: number; title: string; description: string }, ) => {     
        return EditToDo(id, title, description);
        }, 
    deleteTodo: async (_:any, { id }: { id: number }) => {
      const check= DeleteTodo(id);
      return check;
    },
    
  },
};
