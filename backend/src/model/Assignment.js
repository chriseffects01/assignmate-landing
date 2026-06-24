import mongoose from 'mongoose';
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: {
      type: String,
      default: 'draft',
    },

    courseCode: String,
    course: String,
    lecturer: String,
    category: {
      type: String,
      default: 'report',
    },
    dueDate: String,
    // level: String,

    type: {
      type: String,
      enum: ['blank', 'template'],
      default: 'blank',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Assignment', assignmentSchema);
function toTitleCase(str) {
  if (!str) return;

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
}

assignmentSchema.pre('save', function (next) {
  if (this.isModified('title') && this.title) {
    this.title = toTitleCase(this.title);
  }
  next();
});
