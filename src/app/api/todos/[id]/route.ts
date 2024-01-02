import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/db";
import Todo from "@/models/todo";

connect();

const getIdFromPathName = (s: string) => {
  return s.split("/").pop();
};

export const GET = async (request: NextRequest) => {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathName(path);

    const todo = await Todo.findOne({ id });
    if (todo) {
      return NextResponse.json({
        msg: "Found todo",
        success: true,
        todo,
      });
    } else {
      return NextResponse.json({
        msg: "There is no todo found with the id provided",
        success: false,

      });
    }

  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathName(path);

    await Todo.deleteOne({ id });
    return NextResponse.json({
      msg: "Todo Deleted",
      success: true,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const path = request.nextUrl.pathname;
    const id = getIdFromPathName(path);

    const reqBody = await request.json();
    const { desc, completed } = reqBody;

    await Todo.updateOne({ id }, { $set: { desc, completed } });
    return NextResponse.json({
      msg: "Todo Updated",
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
