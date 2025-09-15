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
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(taskstatuses),
      default: taskstatuses.starting,
    },
    asignedtoo: { type: Schema.Types.ObjectId, ref: "User", default: null },
    finishedat: { type: Date, default: null },
  },
  { timestamps: true }
);


//middleware 

Mytaskschema.pre("save", function (next) {
  if (this.isModified('status')) {
    if (this.status === 'done' && this.finishedat === null) {
      this.finishedat = new Date();
    } else if (this.status !== 'done') {
      this.finishedat = null;
    }
  }
  next();
});

Mytaskschema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  const update: any = this.getUpdate();
  if (update?.status) {
    if (!Object.values(taskstatuses).includes(update.status)) {
      return next(new Error(`Invalid task status: ${update.status}`));
    }
   
    if (update.status === 'done') {
      update.finishedat = new Date();
    } else if (update.status !== 'done') {
      update.finishedat = null;
    }
  }
  next();
});

export const Tasks = mongoose.model<ITask>("Tasks", Mytaskschema);