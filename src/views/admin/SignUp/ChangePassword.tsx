import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/fields/InputField";
import { updatePassword } from "../../../services/auth.service";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Reset error state
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const response = await updatePassword(password);

      if (response.statusCode === 200) {
        alert("Contraseña actualizada exitosamente");
        navigate("/admin/coleccion");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al actualizar la contraseña"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
          Cambiar contraseña
        </h4>

        <p className="mb-9 ml-1 text-base text-gray-600">
          Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres.
        </p>

        <InputField
          variant="auth"
          extra="mb-3"
          label="Nueva contraseña*"
          placeholder="Min. 8 caracteres"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          variant="auth"
          extra="mb-3"
          label="Confirmar contraseña*"
          placeholder="Min. 8 caracteres"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Actualizando..." : "Cambiar contraseña"}
        </button>
      </div>
    </div>
  );
}