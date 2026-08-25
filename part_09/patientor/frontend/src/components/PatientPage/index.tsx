import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import axios from "axios";

import { Diagnosis, Patient, Entry } from "../../types";
import patientService from "../../services/patients";
import { EntryDetails } from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<string>("0");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient = await patientService.getById(id);
          setPatient(fetchedPatient);
        } catch (e) {
          console.error("Error fetching patient", e);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  const submitNewEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);

    let baseEntry: Record<string, unknown> = {
      type: entryType,
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
    };

    if (entryType === "HealthCheck") {
      baseEntry = {
        ...baseEntry,
        healthCheckRating: Number(healthCheckRating),
      };
    } else if (entryType === "Hospital") {
      baseEntry = {
        ...baseEntry,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      };
    } else if (entryType === "OccupationalHealthcare") {
      baseEntry = {
        ...baseEntry,
        employerName,
        ...(sickLeaveStartDate && sickLeaveEndDate
          ? {
              sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              },
            }
          : {}),
      };
    }

    if (id) {
      try {
        const addedEntry = await patientService.addEntry(id, baseEntry);
        setPatient({
          ...patient,
          entries: patient.entries.concat(addedEntry),
        });
        resetForm();
      } catch (e: unknown) {
        if (axios.isAxiosError(e) && e.response?.data) {
          const errorData = e.response.data as {
            error?: Array<{ path: string[]; message: string }> | string;
          };
          if (errorData.error && Array.isArray(errorData.error)) {
            const messages = errorData.error
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join(", ");
            setError(messages);
          } else {
            setError(String(e.response.data));
          }
        } else {
          setError("Something went wrong.");
        }
      }
    }
  };

  const resetForm = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating("0");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setError(null);
    setFormOpen(false);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}>
        <Typography variant="h4" component="h2">
          {patient.name}
        </Typography>
        {getGenderIcon(patient.gender)}
      </Box>

      <Typography sx={{ marginTop: 2 }}>
        <strong>ssn:</strong> {patient.ssn}
      </Typography>
      <Typography>
        <strong>occupation:</strong> {patient.occupation}
      </Typography>
      <Typography>
        <strong>date of birth:</strong> {patient.dateOfBirth}
      </Typography>

      {!formOpen ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFormOpen(true)}
          sx={{ marginY: 2 }}
        >
          Add New Entry
        </Button>
      ) : (
        <Box
          sx={{
            border: "2px dashed black",
            padding: 3,
            borderRadius: 2,
            marginY: 3,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            New Medical Entry
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={submitNewEntry}>
            <TextField
              select
              fullWidth
              label="Entry Type"
              value={entryType}
              onChange={({ target }) =>
                setEntryType(
                  target.value as
                    | "HealthCheck"
                    | "Hospital"
                    | "OccupationalHealthcare",
                )
              }
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="OccupationalHealthcare">
                Occupational Healthcare
              </MenuItem>
            </TextField>

            <TextField
              fullWidth
              type="date"
              label="Date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={date}
              onChange={({ target }) => setDate(target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Specialist"
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
              sx={{ marginBottom: 2 }}
            />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="diagnosis-codes-label">
                Diagnosis Codes
              </InputLabel>
              <Select
                labelId="diagnosis-codes-label"
                multiple
                value={diagnosisCodes}
                onChange={({ target }) =>
                  setDiagnosisCodes(
                    typeof target.value === "string"
                      ? target.value.split(",")
                      : target.value,
                  )
                }
                input={<OutlinedInput label="Diagnosis Codes" />}
              >
                {diagnoses.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    {d.code} - {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {entryType === "HealthCheck" && (
              <TextField
                select
                fullWidth
                label="Health Check Rating"
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(target.value)}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="0">0 - Healthy</MenuItem>
                <MenuItem value="1">1 - Low Risk</MenuItem>
                <MenuItem value="2">2 - High Risk</MenuItem>
                <MenuItem value="3">3 - Critical Risk</MenuItem>
              </TextField>
            )}

            {entryType === "Hospital" && (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Discharge Details
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  label="Discharge Date"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Criteria"
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </Box>
            )}

            {entryType === "OccupationalHealthcare" && (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Employer & Leave Details
                </Typography>
                <TextField
                  fullWidth
                  label="Employer Name"
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Sick Leave Start Date"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={sickLeaveStartDate}
                  onChange={({ target }) => setSickLeaveStartDate(target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Sick Leave End Date"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={sickLeaveEndDate}
                  onChange={({ target }) => setSickLeaveEndDate(target.value)}
                />
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
              <Button type="button" variant="outlined" onClick={resetForm}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      )}
      <Typography
        variant="h5"
        component="h3"
        sx={{ marginTop: 3, marginBottom: 2 }}
      >
        entries
      </Typography>

      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No entries yet
        </Typography>
      )}
    </Container>
  );
};

export default PatientPage;
