import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  IconName,
} from "react-icons/bs";
export const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  });

  const handleEdit = async (id) => {
    try {
      await axios.put("http://localhost:8080/update/" + id);
    //   window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/delete/" + id);
    //   window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col ml-96 p-8 mt-4">
      <h2 className="font-bold text-3xl ml-24 mb-5">Todo List</h2>
      <Create />

      {todos.length === 0 ? (
        <div className="flex ml-20 mt-4 text-xl font-semibold">
          <h2>No Record Please Add</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            className="flex align-middle w-[352px] justify-between bg-black text-white
             px-2 py-2 font-bold mt-3"
          >
            <div className="flex" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="mr-2 text-[13px] mt-[5px]" />
              ) : (
                <BsCircleFill className="mr-2 text-[13px] mt-[5px]" />
              )}

              <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
            </div>
            <div>
              {" "}
              <span>
                <BsFillTrashFill className="mt-[5px]" onClick={()=>handleDelete(todo._id)}/>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
