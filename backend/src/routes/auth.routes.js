import express from 'express';
import { arcjetMiddleWare } from '#middleware/arcjet.middleware.js';
import {
  loginUser,
  getCurrentUser,
  registerUser,
  updateProfile,
  deleteAccount,
  logoutUser,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '#middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.delete('/account', authMiddleware, deleteAccount);
router.patch('/profile', authMiddleware, updateProfile);
router.get('/me', authMiddleware, getCurrentUser);
export default router;
