import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "../routes/Routes";

const AdminLayout = () => {
  return (
    <div className="flex">
      
      {/* <Sidebar />  Si tienes un menú lateral */}
      <div className="flex-1 p-6">
        <Routes>
          {adminRoutes.map(({ path, component }, index) => (
            <Route key={index} path={path} element={component} />
          ))}
          {/* Redirigir al dashboard si no se encuentra la ruta */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
