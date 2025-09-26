import mongoose from "mongoose";
import { users } from "../models/userSchema.js";
import { Tasks } from "../models/TaskSchema.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Replace with your MongoDB connection string

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI as string);

  // Seed users
  const userData = [
    { name: "Alice", email: "alice@99example.com", password: await bcrypt.hash("password123", 10) },
    { name: "Bob", email: "bob@99example.com", password: await bcrypt.hash("password456", 10) }
  ];
  const createdUsers = await users.insertMany(userData);
  // add so that createduser can be undefined 
 if (!createdUsers[0] || !createdUsers[1]) {
    throw new Error("User creation failed, cannot seed tasks.");
  }

  // Seed tasks only if users were created
  if (createdUsers.length >= 2) {
    const taskData = [
      { title: "First Task of many", description: "This is Alice's task", status: "to-do", user: createdUsers[0]._id },
      { title: "Second Task of many", description: "This is Bob's task", status: "to-do", user: createdUsers[1]._id }
    ];
    await Tasks.insertMany(taskData);
  }

  console.log("Database seeded!");
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("Seeding error:", err);
  mongoose.disconnect();
});