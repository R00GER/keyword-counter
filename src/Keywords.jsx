import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const Keywords = ({ keywords, setKeywords, onChange, checkboxValue }) => {
  const onDelete = (k) => setKeywords(keywords.filter((word) => word !== k));

  return (
    <div
      style={{
        marginTop: "1rem",
        maxWidth: "1000%",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography>Word includes space</Typography>
        <Checkbox
          value={checkboxValue}
          onChange={() => onChange(!checkboxValue)}
        />
      </div>
      <div>
        {keywords.map((k) => (
          <Chip
            sx={{
              marginBottom: "0.25rem",
              bgcolor: "#6a6b70",
              "& .MuiChip-deleteIcon": {
                color: "#e8eaed",
                "&:hover": {
                  color: "#e8eaed",
                },
              },
            }}
            key={k}
            label={k}
            onDelete={() => onDelete(k)}
          />
        ))}
      </div>
    </div>
  );
};

export default Keywords;
