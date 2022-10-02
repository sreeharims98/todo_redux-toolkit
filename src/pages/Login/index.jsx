import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { AppRoutes } from "../../routes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((store) => store.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (user) navigate(AppRoutes.HOME);
  }, [navigate, user]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input
            name="email"
            type="email"
            value="sreehari@gmail.com"
            onChange={() => {}}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            name="password"
            type="password"
            value="qweqweqwe"
            onChange={() => {}}
          />
        </label>
        <br />
        <button type="submit">
          {loading === "pending" ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
