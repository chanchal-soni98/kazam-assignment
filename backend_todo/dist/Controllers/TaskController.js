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
exports.fetchAllTasks = exports.addTask = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const TaskModel_1 = __importDefault(require("../Model/TaskModel"));
dotenv_1.default.config();
const redis = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `FULLSTACK_TASK_${process.env.FIRST_NAME}`;
    try {
        let tasks = [];
        const cached = yield redis.get(key);
        if (cached) {
            tasks = JSON.parse(cached);
        }
        tasks.push(task);
        if (tasks.length >= 50) {
            yield TaskModel_1.default.insertMany(tasks.map((t) => ({ task: t })));
            yield redis.del(key);
        }
        else {
            yield redis.set(key, JSON.stringify(tasks));
        }
    }
    catch (err) {
        console.error("Error adding task:", err);
    }
});
exports.addTask = addTask;
const fetchAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `FULLSTACK_TASK_${process.env.FIRST_NAME}`;
    try {
        let redisTasks = [];
        const cached = yield redis.get(key);
        if (cached) {
            redisTasks = JSON.parse(cached);
        }
        const mongoTasks = yield TaskModel_1.default.find().sort({ createdAt: -1 }).lean();
        const allTasks = [
            ...redisTasks,
            ...mongoTasks.map((t) => ({
                task: t.task,
                createdAt: t.createdAt ? t.createdAt.toISOString() : "",
            })),
        ];
        allTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        res.json(allTasks);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.fetchAllTasks = fetchAllTasks;
