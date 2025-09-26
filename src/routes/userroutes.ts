import express from "express";
import { getUsers, createUser,RemoveUsers,findandubdate } from "../controller/usercontroller.js";

const router = express.Router();

router.get("/user", getUsers);
router.post("/user", createUser);
router.delete("/user",RemoveUsers)
router.patch("/user/:id",findandubdate)

export default router;
