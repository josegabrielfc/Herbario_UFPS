import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar/RTL";
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 p-6">
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setOpen(true)}
        >
          Abrir Sidebar
        </button>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido a la App</h1>
          <p className="text-gray-600 mt-2">Explora la información disponible.</p>
          <Link
            to="/login"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Iniciar Sesión (Admin)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
