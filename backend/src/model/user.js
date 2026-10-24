import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    displayName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      trim: true,
    },

    level: {
      type: Number,
      min: 100,
      max: 700,
    },

    faculty: {
      type: String,
      trim: true,
    },

    registrationNumber: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    accountType: {
      type: String,
      enum: ['student', 'business'],
    },

    businessName: {
      type: String,
      trim: true,
    },

    businessPhone: {
      type: String,
      trim: true,
    },

    subscription: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
