const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
} = require("../controllers/assignmentController");

router.post("/", createAssignment);
router.get("/", getAssignments);
router.get("/:id", getAssignment);
router.put("/:id", updateAssignment);

module.exports = router;
