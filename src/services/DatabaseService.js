// libs
import { nanoid } from "nanoid";
import { PGliteWorker } from "@electric-sql/pglite/worker";

// constants
import { CREATE_PATIENT_QUERY } from "../utils/queries";

let db = null;

const initSchema = async (database) => {
  await database.query(`
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
};

export const initDatabase = async () => {
  if (!db) {
    const workerInstance = new Worker(
      new URL("../pglite-worker.js", import.meta.url),
      {
        type: "module",
      }
    );
    db = new PGliteWorker(workerInstance);
    await initSchema(db);
  }
  return db;
};

export const registerPatient = async (patientData) => {
  const database = await initDatabase();
  const id = parseInt(nanoid(10).replace(/\D/g, "").slice(0, 9), 10);
  if (isNaN(id)) {
    return;
  }

  const {
    firstName,
    lastName,
    dob,
    gender,
    email,
    phone,
    address,
    insuranceProvider,
    insuranceId,
    notes,
  } = patientData;

  const formattedDob = dob.toISOString().split("T")[0];

  const result = await database.query(CREATE_PATIENT_QUERY, [
    id,
    firstName,
    lastName,
    formattedDob,
    gender,
    email,
    phone,
    address,
    insuranceProvider,
    insuranceId,
    notes,
    new Date().toLocaleDateString(),
  ]);

  return result.rows?.[0];
};

export const getAllPatients = async () => {
  const database = await initDatabase();
  const results = await database.query(`SELECT * FROM patients`);
  return results;
};

export const getTotalPatientCount = async () => {
  const database = await initDatabase();
  const results = await database.query(
    "SELECT COUNT(*) AS total_patients FROM patients;"
  );

  const totalPatientCount = results?.rows?.[0]?.total_patients || 0;

  return totalPatientCount;
};

export const executeQuery = async (sql, opt = []) => {
  const database = await initDatabase();
  const results = await database.query(sql, opt);
  return results;
};