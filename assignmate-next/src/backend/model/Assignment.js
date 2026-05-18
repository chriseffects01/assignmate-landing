import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: {
      type: String,
      default: "draft",
    },

    courseCode: String,
    course: String,
    lecturer: String,
    category: {
      type: String,
      default: "report",
    },
    dueDate: String,

    type: {
      type: String,
      enum: ["blank", "template"],
      default: "blank",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Assignment", assignmentSchema);
