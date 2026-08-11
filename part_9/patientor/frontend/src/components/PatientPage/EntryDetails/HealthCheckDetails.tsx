import { Box, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckEntry, Diagnosis, HealthCheckRating } from "../../../types";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthRatingHeart = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0: return <FavoriteIcon sx={{ color: "green" }} />;
    case 1: return <FavoriteIcon sx={{ color: "yellow" }} />;
    case 2: return <FavoriteIcon sx={{ color: "orange" }} />;
    case 3: return <FavoriteIcon sx={{ color: "red" }} />;
    default: return null;
  }
};

export const HealthCheckDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisDescription = (code: string): string => {
    const match = diagnoses.find(d => d.code === code);
    return match ? match.name : "";
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginBottom: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body1"><strong>{entry.date}</strong></Typography>
        <MedicalServicesIcon />
      </Box>
      <Typography sx={{ fontStyle: "italic", marginY: 1 }}>{entry.description}</Typography>
      <Box sx={{ marginY: 1 }}>
        <HealthRatingHeart rating={entry.healthCheckRating} />
      </Box>

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