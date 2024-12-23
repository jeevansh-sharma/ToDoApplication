import { createUser, getUserUsingName } from "../models/userModel";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string
//login the user
export const login = async(userName:string, password:string)=>{
  const user = await getUserUsingName(userName);
  if(!user)
    throw new Error("User not found");
  else if(user.password !== password)
    throw new Error("Incorrect password");
  else{
    const token = jwt.sign({userId: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1h'});
    return token //returning token as string
  }

}

//register the user
export const register = async (userName: string, password: string) => {
  const user = await getUserUsingName(userName);
  if(user)
    throw new Error("User already exists");
  else{
    const newUser = await createUser(userName, password);
    const token = jwt.sign({userId: newUser.id, username: newUser.userName}, JWT_SECRET, {expiresIn: '1h'});
    return token //returning token as string
  }
}