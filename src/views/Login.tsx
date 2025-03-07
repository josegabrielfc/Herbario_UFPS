import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("adminToken", "token123");
    navigate("/admin/dashboard"); // Redirige al panel de admin
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        onClick={handleLogin}
      >
        Ingresar como Admin
      </button>
    </div>
  );
};

export default Login;
