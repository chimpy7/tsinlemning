import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {users} from "../models/userSchema.js";

export async function getUsers(req:Request,res:Response) {
  const userss = await users.find();
  res.status(201).json(userss);
};



export async function createUser(req:Request,res:Response) {
  try {
    const { name, email, password } = req.body;
if(password.length < 8){
  return res.status(400).json({message:"Password must be at least 8 characters long"});
}
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new users({ name, email, password: hashedPassword });
    await users.create(user);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export async function RemoveUsers(req:Request,res:Response) {
  const {id} = req.body
 if (!id){
   return res.status(405).json({ message: "Error Deleting user could not find id" });
 }
  try {
    const finduserbyidremove = await users.findByIdAndDelete(id)
     res.status(200).json({message:"User has been deleted"});



  } catch (error) {
      res.status(500).json({message:"A error has accoured while trying too delete"});
    
  }

}


export async function findandubdate(req:Request,Res:Response) {

  const update = req.body
   const {id} = req.params

   if(update.password){
     update.password = await bcrypt.hash(update.password,10)
   }

if(!id){
  return Res.status(405).json({ message: "Error Updating user could not find id" });
}
if (!update || Object.keys(update).length === 0) {
  return Res.status(400).json({ message: "Error updating user: no update data provided" });
}

  try {

    const findandupdate = await users.findByIdAndUpdate(id,  { $set: update }, { new: true, runValidators: true })
      Res.status(200).json({message:"Succseful update!"});

    
  } catch (error) {
       Res.status(500).json({message:`A error has accoured while trying too Update${error}`});
  }
  
}



