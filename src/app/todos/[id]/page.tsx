"use client";

import { axiosInstance } from "@/app/page";
import { useState, useEffect } from "react";
import { useRouter } from "../../../../node_modules/next/navigation";

const Todos = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const [editTodoInfo, setEditTodoInfo] = useState({
    id: params.id,
    desc: "",
    completed: false,
  });

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get(`/api/todos/${params.id}`);
      setEditTodoInfo(response.data.todo);
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleUpdateTodo = async () => {
    const data = {
      desc: editTodoInfo.desc,
      completed: editTodoInfo.completed,
    };

    await axiosInstance.put(`/api/todos/${editTodoInfo.id}`, data);
    router.back()
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-8 bg-gray-100 pb-32">
      <div className="text-2xl">Edit Todo</div>
      <div className="flex gap-4">
        <div className="text-lg">Edit desc:</div>
        <input
          type="text"
          placeholder="Enter new desc"
          className="text-xl rounded shadow-md px-2"
          value={editTodoInfo.desc}
          onChange={(e) =>
            setEditTodoInfo({ ...editTodoInfo, desc: e.target.value })
          }
        />
      </div>
      <div className="flex gap-2">
        <div className="text-lg">Edit completed:</div>
        <input
          type="checkbox"
          checked={editTodoInfo.completed}
          onChange={(e) =>
            setEditTodoInfo({
              ...editTodoInfo,
              completed: !editTodoInfo.completed,
            })
          }
        />
      </div>
      <button
        className="text-xl shadow-md bg-blue-500 text-white hover:bg-blue-700 rounded-md px-3 py-1"
        onClick={() => handleUpdateTodo()}
        disabled={editTodoInfo.desc == ""}
      >
        Update
      </button>
    </div>
  );

};

export default Todos;
