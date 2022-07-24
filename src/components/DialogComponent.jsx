import { Dialog, DialogTitle, Typography } from "@mui/material";
import { isEmpty } from "ramda";

const DialogComponent = ({ open, value, onClose }) => (
  <Dialog
    maxWidth="sm"
    fullWidth
    open={open}
    onClose={onClose}
    PaperProps={{ style: { backgroundColor: "#202124", color: "#e8eaed" } }}
  >
    <DialogTitle>Results</DialogTitle>
    <div className="dialog-content" style={{ padding: "0 24px 24px 24px" }}>
      <div style={{ textAlign: "left" }}>
        {isEmpty(value) ? (
          <Typography>No hits</Typography>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Word</th>
                <th>Occurences</th>
              </tr>
            </thead>
            <tbody>
              {value &&
                Object.entries(value)
                  .sort(([, a], [, b]) => b - a)
                  .map(([key, value]) => (
                    <tr>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
        {/* <div
          className="occurences-key"
          style={{
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography variant="h6">{`${index + 1}. ${key}`}</Typography>
        </div>
        <Typography>{value}</Typography>
      {/* ))} */}
      </div>
    </div>
  </Dialog>
);

export default DialogComponent;
