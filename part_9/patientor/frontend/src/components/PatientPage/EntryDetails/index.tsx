import { Entry, Diagnosis } from "../../../types";
import { HealthCheckDetails } from "./HealthCheckDetails";
import { HospitalDetails } from "./HospitalDetails";
import { OccupationalHealthcareDetails } from "./OccupationalHealthcareDetails";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};
