// libs
import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react";

// styles
import "./App.css";


const db = await PGlite.create({
  extensions: { live },
  dataDir: "idb://patients",
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')) NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      insurance_provider TEXT,
      insurance_id TEXT,
      notes TEXT,
      registeration_time TEXT NOT NULL
    );
  `);

function App() {
  return (
    <PGliteProvider db={db}>
    
    </PGliteProvider>
  );
}

export default App;
