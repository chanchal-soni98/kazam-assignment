import mqtt from "mqtt";
import redisClient from "./redis";
import dotenv from "dotenv";
import Task from "../Model/TaskModel";

dotenv.config();

const client = mqtt.connect(
  process.env.MQTT_BROKER_URL || "mqtt://localhost:1883"
);

const FIRST_NAME = "chanchal";
const REDIS_KEY = `FULLSTACK_TASK_${FIRST_NAME}`;

client.on("connect", () => {
  client.subscribe("/add", (err) => {
    if (err) console.error("MQTT subscription error:", err);
  });
});

client.on("message", async (topic, message) => {
  if (topic === "/add") {
    const taskTitle = message.toString();
    const newTask = {
      task: taskTitle,
      createdAt: new Date().toISOString(),
    };

    try {
      const cached = await redisClient.get(REDIS_KEY);
      const taskList: { task: string; createdAt: string }[] = cached
        ? JSON.parse(cached)
        : [];
      taskList.push(newTask);
      console.log("Task List:", taskList.length);
      if (taskList.length >= 50) {
        const tasksToSave = taskList;
        await Task.insertMany(tasksToSave);
        console.log("Tasks saved to MongoDB:", tasksToSave);
        await redisClient.del(REDIS_KEY);
      } else {
        await redisClient.set(REDIS_KEY, JSON.stringify(taskList));
      }
    } catch (error) {
      console.error("MQTT Message Handling Error:", error);
    }
  }
});

export default client;
