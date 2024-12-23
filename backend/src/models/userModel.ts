import { pool } from "../db/db"



export const getUserUsingName= async(name:string)=>{
    const user= await pool.query("SELECT * FROM users WHERE username=$1",[name]);
    console.log(user.rows[0],"user is found");
    return user.rows[0];
}

export const createUser = async (username: string, password: string) => {
    const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",[username, password]);
    console.log(newUser.rows[0], "user is created");
    return newUser.rows[0];
  };