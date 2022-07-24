import { TextField, InputAdornment } from "@mui/material";
import SetTextIcon from "@mui/icons-material/ArrowRightAlt";

const styles = {
  inputRoot: {
    width: "100%",
    marginTop: "1rem",
    "& label.Mui-focused": {
      color: "#545454",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#545454",
      },
      "&:hover fieldset": {
        borderColor: "#545454",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4a3fb5",
      },
    },
  },
  icon: {
    color: "fff",
  },
};

export const TextAreaField = ({
  name,
  value,
  onChange,
  placeholder,
  minRows,
  maxRows,
}) => (
  <TextField
    name={name}
    autoComplete="off"
    sx={styles.inputRoot}
    placeholder={placeholder}
    multiline
    minRows={minRows}
    maxRows={maxRows}
    value={value}
    onChange={(e) => onChange(e)}
    InputProps={{ style: { color: "#e8eaed" } }}
  />
);

export const InputFieldWithActionIcon = ({
  name,
  value,
  onChange,
  onClick,
  placeholder,
  autoComplete,
}) => (
  <TextField
    name={name}
    autoComplete={autoComplete}
    sx={styles.inputRoot}
    value={value}
    onChange={(e) => onChange(e)}
    placeholder={placeholder}
    InputProps={{
      style: { color: "#e8eaed" },
      endAdornment: (
        <InputAdornment position="end">
          <SetTextIcon
            style={styles.icon}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={onClick}
          />
        </InputAdornment>
      ),
    }}
  />
);
