import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    sender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    receiver: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  }
);

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
