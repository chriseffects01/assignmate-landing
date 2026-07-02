import express from 'express';
import { arcjetMiddleWare } from '#middleware/arcjet.middleware.js';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
export default router;
