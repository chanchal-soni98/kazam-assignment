"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const redis_1 = __importDefault(require("./redis"));
const dotenv_1 = __importDefault(require("dotenv"));
const TaskModel_1 = __importDefault(require("../Model/TaskModel"));
dotenv_1.default.config();
const client = mqtt_1.default.connect(process.env.MQTT_BROKER_URL || "mqtt://localhost:1883");
const FIRST_NAME = "chanchal";
const REDIS_KEY = `FULLSTACK_TASK_${FIRST_NAME}`;
client.on("connect", () => {
    client.subscribe("/add", (err) => {
        if (err)
            console.error("MQTT subscription error:", err);
    });
});
client.on("message", (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (topic === "/add") {
        const taskTitle = message.toString();
        const newTask = {
            task: taskTitle,
            createdAt: new Date().toISOString(),
        };
        try {
            const cached = yield redis_1.default.get(REDIS_KEY);
            const taskList = cached
                ? JSON.parse(cached)
                : [];
            taskList.push(newTask);
            console.log("Task List:", taskList.length);
            if (taskList.length >= 50) {
                const tasksToSave = taskList;
                yield TaskModel_1.default.insertMany(tasksToSave);
                console.log("Tasks saved to MongoDB:", tasksToSave);
                yield redis_1.default.del(REDIS_KEY);
            }
            else {
                yield redis_1.default.set(REDIS_KEY, JSON.stringify(taskList));
            }
        }
        catch (error) {
            console.error("MQTT Message Handling Error:", error);
        }
    }
}));
exports.default = client;
