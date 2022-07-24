import Chip from "@mui/material/Chip";

const Keywords = ({ keywords, setKeywords }) => {
  const onDelete = (k) => setKeywords(keywords.filter((word) => word !== k));

  return (
    <div
      style={{
        marginTop: "1rem",
        maxWidth: "1000%",
        display: "flex",
        gap: "0.25rem",
        flexWrap: "wrap",
      }}
    >
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
  );
};

export default Keywords;
