import mongoose, { Schema, Document } from "mongoose";

export enum taskstatuses {
  starting = "to-do",
  InProgress = "in progress", 
  blocked = "blocked",
  Done = "done",
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: taskstatuses;
  asignedtoo?: mongoose.Types.ObjectId | null;
  finishedat?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const Mytaskschema = new Schema<ITask>(
  {
    title: { type: String, required: true ,unique:true},
    description: { type: String, },
    status: {
      type: String,
      enum: Object.values(taskstatuses),
      required:true,
    },
    asignedtoo: { type: Schema.Types.ObjectId, ref: "User", default: null },
    finishedat: { type: Date, default: null },
  },
  { timestamps: true }
);



export const Tasks = mongoose.model<ITask>("Tasks", Mytaskschema);