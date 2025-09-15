import express from "express";
import { getUsers, createUser,RemoveUsers,findandubdate } from "../controller/usercontroller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/",RemoveUsers)
router.patch("/",findandubdate)

export default router;
