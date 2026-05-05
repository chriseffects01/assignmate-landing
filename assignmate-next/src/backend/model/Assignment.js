const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: {
    type: String,
    default: "draft",
  },

  courseCode: String,
  course: String,
  lecturer: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ASsignment", assignmentSchema);
