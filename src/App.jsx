//components
import { DatabaseProvider } from "./context/DatabaseContext";
import AppLayout from "./layout/AppLayout";

// styles
import "./App.css";

function App() {
  return (
    <DatabaseProvider >
      <AppLayout />
    </DatabaseProvider>
  );
}

export default App;
