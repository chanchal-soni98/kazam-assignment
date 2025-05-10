"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../Controllers/TaskController");
const router = express_1.default.Router();
router.get('/fetchAllTasks', TaskController_1.fetchAllTasks);
exports.default = router;
