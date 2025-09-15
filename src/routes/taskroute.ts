
import express from "express";
import {createTask,getTasks,removetasks,updateTasks} from "../controller/taskcontroller.js";

const router = express.Router();

router.post("/task", createTask);
router.get("/task", getTasks);
router.delete("/task",removetasks)
router.patch("/task",updateTasks)

export default router;
