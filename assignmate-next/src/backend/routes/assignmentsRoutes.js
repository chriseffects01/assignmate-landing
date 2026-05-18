import express from "express";
const router = express.Router();

import {
  createAssignment,
  updateAssignment,
  getAssignment,
  getAssignments,
} from "../controllers/assignmentController.js";

// const {
//   createAssignment,
//   getAssignments,
//   getAssignment,
//   updateAssignment,
// } = require("../controllers/assignmentController");

router.post("/", createAssignment);
router.get("/", getAssignments);
router.get("/:id", getAssignment);
router.put("/:id", updateAssignment);

export default router;
