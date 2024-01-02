import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Todo document
export interface ITodo extends Document {
  id: string;
  desc: string;
  completed: boolean;
}

// Define the Mongoose schema for the Todo model
const TodoSchema = new Schema<ITodo>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Use a constant for the model name
const TODO_MODEL_NAME = "Todo";

// Create or retrieve the Todo model
const Todo = mongoose.models[TODO_MODEL_NAME] || mongoose.model<ITodo>(TODO_MODEL_NAME, TodoSchema);

export default Todo;
