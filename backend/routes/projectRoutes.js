const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with authentication
router.use(authMiddleware);

// Create a new project
router.post('/', projectController.createProject);

// Get all projects for the logged-in user
router.get('/', projectController.getProjects);

// Get a single project by ID
router.get('/:id', projectController.getProjectById);

// Update a project
router.put('/:id', projectController.updateProject);

// Delete a project
router.delete('/:id', projectController.deleteProject);

module.exports = router;