import express from 'express';
import { arcjetMiddleWare } from '#middleware/arcjet.middleware.js';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', arcjetMiddleWare, registerUser);
router.post('/login', arcjetMiddleWare, loginUser);
export default router;
