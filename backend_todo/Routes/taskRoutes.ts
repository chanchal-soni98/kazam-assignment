import express, { Router } from 'express';
import { fetchAllTasks } from '../Controllers/TaskController';

const router: Router = express.Router();

router.get('/fetchAllTasks', fetchAllTasks);

export default router;