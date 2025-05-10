import Redis from "ioredis";
import { Request, Response } from "express";
import dotenv from "dotenv";
import Task from "../Model/TaskModel";
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

type TaskType = {
  task: string;
  createdAt: string;
};

export const addTask = async (task: TaskType): Promise<void> => {
  const key = `FULLSTACK_TASK_${process.env.FIRST_NAME}`;
  try {
    let tasks: TaskType[] = [];
    const cached = await redis.get(key);
    if (cached) {
      tasks = JSON.parse(cached);
    }

    tasks.push(task);

    if (tasks.length >= 50) {
      await Task.insertMany(tasks.map((t) => ({ task: t })));
      await redis.del(key);
    } else {
      await redis.set(key, JSON.stringify(tasks));
    }
  } catch (err) {
    console.error("Error adding task:", err);
  }
};

export const fetchAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const key = `FULLSTACK_TASK_${process.env.FIRST_NAME}`;
  try {
    let redisTasks: TaskType[] = [];
    const cached = await redis.get(key);
    if (cached) {
      redisTasks = JSON.parse(cached);
    }

    const mongoTasks = await Task.find().sort({ createdAt: -1 }).lean();

    const allTasks: TaskType[] = [
      ...redisTasks,
      ...mongoTasks.map((t) => ({
        task: t.task,
        createdAt: t.createdAt ? t.createdAt.toISOString() : "",
      })),
    ];
    allTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
