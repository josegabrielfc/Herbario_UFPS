import { ReactNode, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { userRoutes } from "../routes/Routes";
import Sidebar from "../components/sidebar";

interface UserLayoutProps {
  children: ReactNode;
} 
const UserLayout = ({ children }: UserLayoutProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 p-6">
        <Routes>
        {userRoutes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={component} />
        ))} 
        </Routes>
      </div>
      {children}
    </div>
    
  );
};

export default UserLayout;
