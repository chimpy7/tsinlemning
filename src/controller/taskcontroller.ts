
import type { Request, Response } from "express";
import  {Tasks, taskstatuses } from "../models/TaskSchema.js";
interface tasks {
  title: string;
  description: string;
  status: taskstatuses;
  asignedtoo: string;
  finishedat: Date;
}

 export async function createTask(req:Request,res:Response) {
    const  { title, description, status, asignedtoo, finishedat } = req.body;
    try {
        await Tasks.create<tasks>({ title, description, status, asignedtoo, finishedat });
        res.status(201).json({ message: "Task created successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }



    
 }


 export async function getTasks(req:Request,res:Response) {

    try {
       const foundusersdata= await Tasks.find().populate("assignedTo")
      res.status(201).json(foundusersdata);

        
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
 }

 export async function removetasks(req:Request,res:Response){
  const {id} = req.body
    try {
        if(!id){
 res.status(405).json({ message: "Error Deleting tasks could not find id" });

        }
        const deleteuser = await Tasks.findByIdAndDelete(id)

        res.status(200).json({message:"Task has been sucessuflly deleted"})
        
    } catch (error) {
          res.status(500).json({ message: "Error Deleting tasks", error });
    }


 }

 export async function updateTasks(req:Request,res:Response){
  const {id,update} = req.body

  if(!update){
 res.status(404).json({ message: "Error updating tasks add update tag",  });


  }
  
   try {

    const updatetasks = await Tasks.findByIdAndUpdate(id,{$set: update},{new:true})

        res.status(200).json({message:"Task has been sucessuflly Updated the task"})
    
   } catch (error) {
      res.status(500).json({ message: "Error Deleting tasks", error });
    
   }
}