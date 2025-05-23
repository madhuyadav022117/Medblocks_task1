// hooks
import { useDatabaseContext } from "../context/DatabaseContext";
import { usePatientBroadcast } from "./usePatientBroadcast";

// utils
import { executeQuery } from "../services/DatabaseService";

export const useHandleBulkDelete = () => {
  const { broadcastChange } = usePatientBroadcast(() => {});
  const { isInitialized } = useDatabaseContext();

  const handleDelete = async ({ selectedRowKeys, onSuccess, onFailure }) => {
    const placeholders = selectedRowKeys.map((_, i) => `$${i + 1}`).join(",");
    try {
      if (isInitialized) {
        await executeQuery(
          `DELETE FROM patients WHERE id in (${placeholders})`,
          selectedRowKeys
        );
      }
      broadcastChange("patients-deleted");
      onSuccess();
    } catch (error) {
      onFailure(error);
    }
  };

  return { handleDelete };
};
