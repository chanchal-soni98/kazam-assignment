import { Time } from "./../../frontend_todo/node_modules/lightningcss/node/ast.d";
import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export interface ITask extends Document {
  task: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Task = mongoose.model<ITask>(
  "Task",
  TaskSchema,
  `assignment_${process.env.FIRST_NAME}`
);

export default Task;
