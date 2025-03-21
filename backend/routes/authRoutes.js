const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

const { body, validationResult } = require('express-validator');

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  authController.register
);

router.post('/login', authController.login);

module.exports = router;