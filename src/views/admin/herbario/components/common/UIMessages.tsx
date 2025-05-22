import { UIMessagesProps } from "../../types/ui";

export const UIMessages = ({
  error,
  success,
  successMessage = "Operación exitosa",
}: UIMessagesProps) => {
  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
          {successMessage}
        </div>
      )}
    </>
  );
};
