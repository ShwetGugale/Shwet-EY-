const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with authentication
router.use(authMiddleware);

// Create a new task
router.post('/:projectId/tasks', taskController.createTask);

// Get all tasks for a project
router.get('/:projectId/tasks', taskController.getTasks);

// Update a task
router.put('/:projectId/tasks/:taskId', taskController.updateTask);

// Delete a task
router.delete('/:projectId/tasks/:taskId', taskController.deleteTask);

module.exports = router;