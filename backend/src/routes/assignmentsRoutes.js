import express from 'express';
const router = express.Router();

import {
  createAssignment,
  updateAssignment,
  getAssignmentById,
  getAssignments,
} from '../controllers/assignmentController.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

router.post('/', authMiddleware, createAssignment);
router.get('/', authMiddleware, getAssignments);
router.get('/:id', authMiddleware, getAssignmentById);
router.put('/:id', authMiddleware, updateAssignment);

export default router;
