import express from 'express';
const router = express.Router();

import  authenticateUser  from '../middlewares/authenticateUser.js';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/task.controller.js';

// Routes for tasks associated with a specific user
router.post('/:userId/createtask', authenticateUser, createTask);
router.get('/:userId/getalltask', authenticateUser, getAllTasks);
router.delete('/:userId/deletetask', authenticateUser, deleteTask);
router.patch('/:userId/updatetask', authenticateUser, updateTask);

export default router;
