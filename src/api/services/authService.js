import axiosClient from "../index";

const login = (data) => {
  return axiosClient.post("/user/login", data);
};
const logout = () => {
  return axiosClient.post("/user/logout");
};

const authService = {
  login,
  logout,
};

export default authService;
