import mongoose from "mongoose";

const {
  Schema,
  model,
  Types: { ObjectId },
} = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    password: { type: String, required: true, minLength: 8 },
    role: {
      type: String,
      required: true,
      enum: ["regular", "admin"],
      default: "regular",
    },
  },
  { versionKey: false }
);

const habitSchema = new Schema(
  {
    name: { type: String, required: true },
    emoji: { type: String },
    user: { type: ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    category: {
      type: String,
      enum: [
        "salud y bienestar",
        "actividad física",
        "desarrollo personal",
        "negativos",
      ],
      required: true,
    },
    subcategory: { type: String, required: false },
  },
  { versionKey: false }
);

const goalSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    habit: { type: ObjectId, ref: "Habit", required: true },
    name: { type: String, required: true },
    period: {
      type: String,
      enum: ["weekly", "monthly", "yearly", "custom"],
      required: true,
    },
    objective: { type: Number, required: true },
    targetDays: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    completedCount: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const progressSchema = new Schema(
  {
    date: { type: Date, default: Date.now, required: true },
    status: {
      type: String,
      enum: ["done", "missed", "half-done"],
      required: true,
    },
    habit: { type: ObjectId, ref: "Habit", required: true },
  },
  { versionKey: false }
);

const eventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    frequency: {
      type: String,
      enum: ["once", "daily", "weekly", "monthly"],
      default: "once",
    },
    user: { type: ObjectId, ref: "User", required: true },
    habit: { type: ObjectId, ref: "Habit" },
    goal: { type: ObjectId, ref: "Goal" },
  },
  { versionKey: false }
);

const User = model("User", userSchema);
const Habit = model("Habit", habitSchema);
const Goal = model("Goal", goalSchema);
const Progress = model("Progress", progressSchema);
const Event = model("Event", eventSchema);

export { User, Habit, Goal, Progress, Event };
