import axios from "axios";
import { storage } from "../utils/storageUtils";

const axiosClient = () => {
  const defaultOptions = {
    baseURL: "https://api-nodejs-todolist.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const user = storage.getItem("user");
    config.headers.Authorization = user?.token ? `Bearer ${user?.token}` : "";
    return config;
  });

  return instance;
};

export default axiosClient();
