import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { Table } from "../../components/Table";
import { logout } from "../../features/auth/authSlice";
import { addTodoTask, getTodoList } from "../../features/todo/todoSlice";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  const submitTask = () => {
    try {
      dispatch(addTodoTask(task)).unwrap();
      setTask("");
    } catch (error) {}
  };

  return (
    <div>
      <Navbar user={user} logout={() => dispatch(logout())} />
      <h1>ToDo List</h1>
      <label>
        <input
          className="border"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </label>
      <button onClick={submitTask} disabled={task ? false : true}>
        Add Task
      </button>
      <br />
      <Table />
    </div>
  );
};

export default Home;
