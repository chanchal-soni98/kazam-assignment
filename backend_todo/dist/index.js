"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const server_1 = __importDefault(require("./Config/server"));
const taskRoutes_1 = __importDefault(require("./Routes/taskRoutes"));
require("./Config/mqtt");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', taskRoutes_1.default);
(0, server_1.default)();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
