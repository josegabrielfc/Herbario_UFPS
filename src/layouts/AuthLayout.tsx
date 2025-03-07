import { Routes, Route } from "react-router-dom";
import { authRoutes } from "../routes/Routes";

const AuthLayout = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, component }, index) => (
        <Route key={index} path={path} element={component} />
      ))}
    </Routes>
  );
};

export default AuthLayout;
