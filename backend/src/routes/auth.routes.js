import express from 'express';
import { arcjetMiddleWare } from '#middleware/arcjet.middleware.js';
import {
  loginUser,
  getCurrentUser,
  registerUser,
} from '../controllers/auth.controllers.js';
import { authMiddleware } from '#middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);
export default router;
