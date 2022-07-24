import { Fab } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";

const AppBar = ({ user, setUser }) => {
  const buttons = [
    { id: 0, name: "s" },
    { id: 1, name: "h" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        marginBottom: "0.25rem",
      }}
    >
      <AssessmentIcon
        style={{ fontSize: "2.8rem", fill: "#4a3fb5", marginLeft: "-6px" }}
      />
      <div className="users">
        {buttons.map((btn) => (
          <Fab
            sx={{
              boxShadow: "unset",
              marginLeft: "0.25rem",
              backgroundColor: "transparent",
              color: "#fff",
              border: btn.id === user.id ? "2px solid #4a3fb5" : "unset",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            variant="extended"
            onClick={() => setUser({ id: btn.id })}
          >
            {btn.name}
          </Fab>
        ))}
      </div>
    </div>
  );
};

export default AppBar;
