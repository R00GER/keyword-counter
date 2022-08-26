import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

const ActionButton = ({ disabled, onClick, label, variant, CSV, data }) => (
  <Button
    sx={{
      width: "150px",
      borderRadius: "20px",
      backgroundColor: variant !== "text" && "#4a3fb5",
      textTransform: variant === "text" ? "none" : "unset",
      "&:hover": {
        backgroundColor: variant !== "text" && "#4a3fb5",
      },
    }}
    size="large"
    variant={variant || "contained"}
    disabled={disabled}
    onClick={onClick}
  >
    {CSV && data ? (
      <CSVLink style={{ textDecoration: "none" }} data={data}>
        {label}
      </CSVLink>
    ) : (
      label
    )}
  </Button>
);

export default ActionButton;
