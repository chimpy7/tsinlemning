
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
    const { title, description, status, asignedtoo, finishedat } = req.body;

    try {
        if (!title || !description || !status) {
            return res.status(400).json({ message: "Title, description, and status are required" });
        }

       
        const taskData: any = { title, description, status, asignedtoo };

      
        if (status === "done" || status === taskstatuses.Done) {
            taskData.finishedat = new Date();
        } else {
            taskData.finishedat = null;
        }

        await Tasks.create(taskData);
        res.status(201).json({ message: "Task created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }


    
 }


 export async function getTasks(req:Request,res:Response) {

   

    try {
       const foundusersdata= await Tasks.find().populate("asignedtoo")
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
   const { id } = req.params;
    const update = req.body;
    
    if (!update || Object.keys(update).length === 0) {
        return res.status(400).json({ message: "Error updating tasks: no update data provided" });
    }

    try {
     
       
   
        if (update.status) {
            if (update.status === "done" || update.status === taskstatuses.Done) {
                update.finishedat = new Date();
            } else {
                update.finishedat = null;
            }
        }

        const updatedTask = await Tasks.findByIdAndUpdate(
            id, 
            { $set: update }, 
            { new: true, runValidators: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ 
            message: "Task has been successfully updated", 
            task: updatedTask 
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
}


export async function assignTaskToUser(req:Request,res:Response){

try {  const {taskid} = req.params  // det förvinarrade me som fan så här  det här PRODUKT  id DVS FRÅN KLUSTER PRODUKT
   const {asignedtoo} = req.body  // DET HÄR USER ID 
   const finduser = await Tasks.findByIdAndUpdate(taskid,{$set:{asignedtoo:asignedtoo}},{new:true})
   res.status(200).json({message:"Task has been assigned to user"})  
} catch (error) {
   
   res.status(500).json({message:"error accoured while trying to assign task to user",error})
}

//   exempel  http://localhost:5000/task/68c57b3ffceqwwewqeqwqa1564b04eqwedeeqb3re23 <== task id   //  {"asignedtoo":"68c57aa835bbebceqeqeewq56fbcbqxebdqad1d"}

}






