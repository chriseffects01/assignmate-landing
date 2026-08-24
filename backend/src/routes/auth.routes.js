import express from 'express';
import { arcjetMiddleWare } from '#middleware/arcjet.middleware.js';
import {
  loginUser,
  getCurrentUser,
  registerUser,
  updateProfile,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '#middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/profile', authMiddleware, updateProfile);
router.get('/me', authMiddleware, getCurrentUser);
export default router;
