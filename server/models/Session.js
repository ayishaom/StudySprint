const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    focusLevel: {
      type: Number,
      required: [true, "Focus level is required"],
      min: [1, "Focus level must be at least 1"],
      max: [5, "Focus level cannot be more than 5"],
    },
    energyLevel: {
      type: Number,
      required: [true, "Energy level is required"],
      min: [1, "Energy level must be at least 1"],
      max: [5, "Energy level cannot be more than 5"],
    },
    date: {
      type: Date,
      required: [true, "Session date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);