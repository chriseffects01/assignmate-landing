import express from "express";
const router = express.Router();

import {
  createAssignment,
  updateAssignment,
  getAssignment,
  getAssignments,
} from "../controllers/assignmentController.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

router.post("/", authMiddleware, createAssignment);
router.get("/", authMiddleware, getAssignments);
router.get("/:id", getAssignment);
router.put("/:id", updateAssignment);

export default router;
