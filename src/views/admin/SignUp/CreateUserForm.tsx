import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/fields/InputField";
import { createUser } from "../../../services/auth.service";
import { CreateUserFormData } from "../../../types";

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Reset error state
    setError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const userData: CreateUserFormData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role_id: 1,
      };

      const response = await createUser(userData);

      if (response.statusCode === 200) {
        alert("Usuario creado exitosamente");
        navigate("/admin/coleccion");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el usuario"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      <div className="mt-[2vh] w-full max-w-full flex-col items-center px-6 md:px-8 lg:px-10 xl:max-w-[420px] bg-white rounded-[10px] border border-gray-200/80 shadow-xl p-8">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
          Crear Usuario
        </h4>

        <p className="mb-9 ml-1 text-base text-gray-600">
          Ingresa los datos del nuevo usuario.
        </p>

        <InputField
          variant="auth"
          extra="mb-3"
          label="Nombre completo*"
          placeholder="Juan Pérez"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Correo electrónico*"
          placeholder="mail@gmail.com"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Contraseña*"
          placeholder="Min. 8 caracteres"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Confirmar contraseña*"
          placeholder="Min. 8 caracteres"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && (
          <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creando..." : "Crear Usuario"}
        </button>
      </div>
    </div>
  );
}
