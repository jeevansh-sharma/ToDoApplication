import { pool } from "../db/db"


//this is to get all the todos
export const ListTodoUsingUserId= async(userId:number)=>{
    const todo= await pool.query("SELECT * FROM todos WHERE user_id=$1",[userId]);
    return todo.rows;
}

//thiis is to complete or not to complete a todo

export const CompleteTodoUsingId= async (Id:number, completed:boolean) => {
    const completedData = await pool.query("UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",[completed, Id]);
    return completedData.rows[0];
  };

  export const EditTodoUsingId= async (Id:number, title:string, description:string) => {
    const latestData = await pool.query(
      "UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *",[title,description,Id]);
    return latestData.rows[0];
  };


  export const CreateToDo =async (userId:number, title:string, description:string) => {
    const newTodo = await pool.query("INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",[userId, title,description]);
    return newTodo.rows[0];
  };

  export const DeleteTodoUsingId = async (Id: number) => {
    const result = await pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [Id]);
    return result.rowCount !== null && result.rowCount > 0;  
  };