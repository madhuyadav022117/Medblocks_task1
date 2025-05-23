// libs
import { createContext, useContext, useEffect, useState } from "react";

// utils
import { initDatabase } from "../services/DatabaseService";

const DatabaseContext = createContext({
  isLoading: true,
  isInitialized: false,
  error: null,
});

export const useDatabaseContext = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError(
          "Failed to initialize database. Please refresh the page and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <DatabaseContext.Provider value={{ isLoading, isInitialized, error }}>
      {children}
    </DatabaseContext.Provider>
  );
};
