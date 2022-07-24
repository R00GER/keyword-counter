import { Button } from "@mui/material";

const ActionButtons = ({ disabled, onClick }) => (
  <div
    className="bottom"
    style={{
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      margin: "1rem 0",
    }}
  >
    <Button
      sx={{
        width: "150px",
        borderRadius: "20px",
        backgroundColor: "#4a3fb5",
        "&:hover": {
          backgroundColor: "#4a3fb5",
        },
      }}
      size="large"
      variant="contained"
      disabled={disabled}
      onClick={onClick}
    >
      Run
    </Button>
  </div>
);

export default ActionButtons;
