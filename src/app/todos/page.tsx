"use client";

import { ITodo } from "../../models/todo";
import { useState, useEffect } from "react";
import { useRouter } from "../../../node_modules/next/navigation";
import { axiosInstance } from "../page";

const Todos = () => {
  const router = useRouter()

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/api/todos");

      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    const data = {
      desc: inputText,
    };
    const response = await axiosInstance.post("/api/todos", data);
    setInputText("");
    fetchTodos();
  };

  const handleDeleteAllTodos = async () => {
    const response = await axiosInstance.delete("/api/todos");
    fetchTodos();
  };

  const handleDeleteTodo = async (todo: any) => {
    const id = todo.id;
    await axiosInstance.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  const handleEditTodo = async (todo: any) => {
    router.push(`/todos/${todo.id}`)
  };

  const handleCompleteTodo = async (todo: any) => {
    const data = {
      desc: todo.desc,
      completed: !todo.completed,
    };
    await axiosInstance.put(`/api/todos/${todo.id}`, data);
    fetchTodos();
  };

  return (
    <div className="flex h-screen flex-col items-center gap-8 pt-8 bg-gray-100 pb-32">
      <div className="text-2xl">Your all todos</div>
      <div className="flex gap-2">
        <input
          className="text-l rounded shadow-md px-2"
          type="text"
          placeholder="Enter todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          disabled={inputText == ""}
          className="text-l shadow-md bg-blue-500 text-white hover:bg-blue-700 rounded-md px-2 py-1"
          onClick={handleSubmit}
        >
          Add
        </button>
        {todos && todos.length > 0 && (
          <button
            className="text-l shadow-md bg-red-300 text-white hover:bg-red-600 rounded-md px-2 py-1"
            onClick={handleDeleteAllTodos}
          >
            Delete All
          </button>
        )}
      </div>
      <div className="w-5/6 flex flex-col gap-2">
        {todos.map((item, index) => {
          return (
            <div className="bg-gray-100 flex justify-between items-center p-2 rounded-lg shadow-lg">
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="h-5 w-5 self-center" checked={item.completed} onClick={() => handleCompleteTodo(item)} />
                <div className="text-lg">{item.desc}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTodo(item)}
                  className="text-l shadow-md bg-green-500 text-white hover:bg-green-700 rounded-md px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(item)}
                  className="text-l shadow-md bg-red-500 text-white hover:bg-red-700 rounded-md px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
