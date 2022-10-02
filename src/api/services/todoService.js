import axiosClient from "../index";
// import { httpAuth } from "../index";

const getTodoList = () => {
  return axiosClient.get("/task", { params: { limit: 10 } });
};
const addTodoTask = (data) => {
  return axiosClient.post("/task", data);
};
const delTodoTask = (id) => {
  return axiosClient.delete(`/task/${id}`);
};
const updateTodoTask = (id, data) => {
  return axiosClient.put(`/task/${id}`, data);
};

const todoService = {
  getTodoList,
  addTodoTask,
  delTodoTask,
  updateTodoTask,
};

export default todoService;
