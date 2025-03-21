const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, stage } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const task = new Task({ title, description, stage, project: project._id });
    await task.save();
    project.tasks.push(task._id);
    await project.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tasks for a project
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, stage } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, stage },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};