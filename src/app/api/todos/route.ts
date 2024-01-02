import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";
import { v4 as uuidv4 } from "uuid";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const todos = await Todo.find({})

    return NextResponse.json({
      msg: "Found all todos",
      success: true,
      todos,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { desc } = await request.json();

    const savedTodo = await createAndSaveTodo({ desc });

    return NextResponse.json({
      msg: "Todo added",
      success: true,
      savedTodo,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    await Todo.deleteMany({});
    return NextResponse.json({
      msg: "Todos removed",
      success: true,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const handleErrorResponse = (error: any) => {
  console.error("An issue occurred:", error);
  return NextResponse.json(
    { msg: "An issue occurred!", success: false },
    { status: 500 }
  );
};

const createAndSaveTodo = async ({ desc } : {desc: string}) => {
  const newTodo = new Todo({
    id: uuidv4(),
    desc,
    completed: false,
  });

  return await newTodo.save();
};
