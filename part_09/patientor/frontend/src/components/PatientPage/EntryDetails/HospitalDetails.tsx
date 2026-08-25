import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry, Diagnosis } from "../../../types";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

export const HospitalDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisDescription = (code: string): string => {
    const match = diagnoses.find(d => d.code === code);
    return match ? match.name : "";
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1"><strong>{entry.date}</strong></Typography>
        <LocalHospitalIcon />
      </Box>
      <Typography sx={{ fontStyle: "italic", marginY: 1 }}>{entry.description}</Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        <strong>Discharge date:</strong> {entry.discharge.date} <br />
        <strong>Criteria:</strong> {entry.discharge.criteria}
      </Typography>

      {entry.diagnosisCodes && (
        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
          {entry.diagnosisCodes.map(code => (
            <li key={code}>
              <Typography variant="body2"><strong>{code}</strong> {getDiagnosisDescription(code)}</Typography>
            </li>
          ))}
        </ul>
      )}
      <Typography variant="body2" sx={{ marginTop: 1, color: "text.secondary" }}>
        Diagnose by: {entry.specialist}
      </Typography>
    </Box>
  );
};