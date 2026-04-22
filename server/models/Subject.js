const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },
    difficultyLevel: {
      type: Number,
      required: [true, "Difficulty level is required"],
      min: [1, "Difficulty level must be at least 1"],
      max: [5, "Difficulty level cannot be more than 5"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);