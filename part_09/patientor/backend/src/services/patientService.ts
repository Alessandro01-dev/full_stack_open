import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  NewEntry,
  Entry,
} from "../types.ts";

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry: Patient = {
    id: id,
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (
  patientId: string,
  entryWithoutId: NewEntry,
): Entry => {
  const entryId = uuid();

  const newEntry: Entry = {
    id: entryId,
    ...entryWithoutId,
  };

  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntryToPatient,
};
