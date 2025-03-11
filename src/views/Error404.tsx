import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleError = () => {
    localStorage.setItem("adminToken", "token123");
    navigate("/user/home"); // Redirige al panel de admin
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold">ERROR</h2>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        onClick={handleError}
      >
        ERROR 404
      </button>
    </div>
  );
};

export default Error;
