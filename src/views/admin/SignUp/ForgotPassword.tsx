import { useState } from "react";
import OtpInput from "react-otp-input";
import InputField from "../../../components/fields/InputField";
import { useNavigate } from "react-router-dom";
import { sendOtpCode, validateOtpCode } from "../../../services/auth.service";

/**
 * @component ForgotPassword
 * @description Componente de recuperación de contraseña
 * Características:
 * - Formulario de recuperación por email
 * - Validación de correo electrónico
 * - Diseño responsivo
 * - Soporte para modo oscuro
 * - Mensajes informativos claros
 * - Botón de envío con estados visuales
 * 
 * @returns {JSX.Element} Formulario de recuperación de contraseña
 * 
 * @example
 * // Uso básico en rutas
 * <Route path="/auth/forgot-password" element={<ForgotPassword />} />
 */
export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    if (!email) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await sendOtpCode(email);
      
      if (response.statusCode === 200) {
        setStep('otp');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el código. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp || otp.length !== 6) {
      setError('Por favor ingresa el código completo');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await validateOtpCode({ 
        email,
        code: otp 
      });
      
      if (response.statusCode === 200) {
        navigate('/auth/change-password');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Error al validar el código. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {step === 'email' ? (
          <>
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
              Olvidaste tu contraseña?
            </h4>

            <p className="mb-9 ml-1 text-base text-gray-600">
              No hay problema. Simplemente indícanos tu correo electrónico y te enviaremos un código 
              para restablecer tu contraseña.
            </p>

            <InputField
              variant="auth"
              extra="mb-3"
              label="Correo*"
              placeholder="mail@gmail.com"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && (
              <p className="mb-3 text-sm text-red-500">{error}</p>
            )}

            <button 
              onClick={handleEmailSubmit}
              disabled={isLoading}
              className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar código'}
            </button>
          </>
        ) : (
          <>
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
              Verificar código
            </h4>

            <p className="mb-9 ml-1 text-base text-gray-600">
              Hemos enviado un código de 6 dígitos a <strong>{email}</strong>. 
              Ingrésalo a continuación para continuar.
            </p>

            <div className="mb-6 flex justify-center">
              <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                width: '3rem',
                height: '3.25rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                textAlign: 'center'
              }}
              renderSeparator={<span className="mx-2"></span>}
              renderInput={(props) => (
                <input 
                {...props}
                className="border-2 border-gray-300 rounded-lg bg-white text-slate-800 focus:border-green-500 focus:outline-none transition-colors"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                />
              )}
              />
            </div>

            {error && (
              <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
            )}

            <button 
              onClick={handleOtpSubmit}
              disabled={isLoading}
              className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Cargando...' : 'Verificar código'}
            </button>            <button
              onClick={() => {
                setError('');
                handleEmailSubmit();
              }}
              className="mt-4 w-full text-sm text-gray-600 hover:text-green-500 cursor-pointer"
            >
              Volver a enviar código
            </button>
          </>
        )}
      </div>
    </div>
  );
}