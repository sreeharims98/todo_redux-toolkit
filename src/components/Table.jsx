import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delTodoTask, updateTodoTask } from "../features/todo/todoSlice";

export const Table = () => {
  const dispatch = useDispatch();
  const { loading, todoList, errorMsg } = useSelector((store) => store.todo);

  if (loading === "pending") return "Loading...";
  else if (loading === "rejected") return errorMsg;
  else if (loading === "fulfilled")
    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((task) => (
            <tr key={task._id}>
              <td
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.description}
              </td>
              <td>
                <button
                  onClick={() =>
                    dispatch(
                      updateTodoTask({
                        id: task._id,
                        data: { completed: !task.completed },
                      })
                    )
                  }
                >
                  {task.completed ? "Incomplete" : "Completed"}
                </button>
                <button onClick={() => dispatch(delTodoTask(task._id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};
