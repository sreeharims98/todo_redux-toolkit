import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { AppRoutes } from ".";

const PrivateRoutes = () => {
  const { user } = useSelector((store) => store.auth);

  return user ? <Outlet /> : <Navigate to={AppRoutes.LOGIN} />;
};

export default PrivateRoutes;
