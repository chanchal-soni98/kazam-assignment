import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/server";
import fetchAllTasks from "./Routes/taskRoutes";
import "./Config/mqtt";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", fetchAllTasks);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Kazam API" });
});

connectDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
