
import express from "express";
import {createTask,getTasks,removetasks,updateTasks,assignTaskToUser} from "../controller/taskcontroller.js";

const router = express.Router();

router.post("/task", createTask);
router.get("/task", getTasks);
router.delete("/task",removetasks)
router.patch("/task/:id",updateTasks)
router.patch("/task/assign/:taskid",assignTaskToUser)

export default router;
