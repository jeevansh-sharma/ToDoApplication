import { CompleteTodoUsingId, CreateToDo, DeleteTodoUsingId, EditTodoUsingId, ListTodoUsingUserId } from "../models/toDoModel"


export const ListToDo = async (userId: number) => {
     return await ListTodoUsingUserId(userId);
}

export const CompleteToDo = async (Id: number, completed: boolean) => {
    return await CompleteTodoUsingId(Id, completed);
}

export const EditToDo = async (Id: number, title: string, description: string) => {
    return await EditTodoUsingId(Id, title, description);
}

export const AddToDo = async (userId: number, title: string , description:string) => {
    return await CreateToDo (userId, title, description);
}

export const DeleteTodo = async (Id: number) => {
   const check= await DeleteTodoUsingId(Id); 
   return check;
}