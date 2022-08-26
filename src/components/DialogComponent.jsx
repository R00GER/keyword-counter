import { Dialog, DialogTitle, Typography } from "@mui/material";
import { isEmpty } from "ramda";
import ActionButton from "./ActionButton";

const DialogComponent = ({ open, value, onClose }) => {
  const prepareData = (csv) =>
    value &&
    value.map(({ key, value, uniqueWords, uniqueWordsCSV }) => ({
      key,
      value,
      uniqueWords: csv ? uniqueWordsCSV : uniqueWords,
    }));

  const tableData = prepareData();
  const CSVData = prepareData(true);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: "#202124", color: "#e8eaed" } }}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Results
          </Typography>
          <ActionButton
            label="Export to CSV"
            variant="text"
            CSV
            data={CSVData}
          />
        </div>
      </DialogTitle>
      <div className="dialog-content" style={{ padding: "0 24px 24px 24px" }}>
        <div style={{ textAlign: "left" }}>
          {isEmpty(value) ? (
            <Typography>No hits</Typography>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Keyword</th>
                  <th>Occurences</th>
                  <th>Unique words</th>
                </tr>
              </thead>
              <tbody>
                {tableData &&
                  tableData
                    .sort((a, b) => b.value - a.value)
                    .map((entry) => (
                      <tr>
                        <td>{entry.key}</td>
                        <td>{entry.value}</td>
                        <td>
                          {entry.uniqueWords.map((w) => (
                            <Typography style={{ whiteSpace: "pre-line" }}>
                              {w}
                            </Typography>
                          ))}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
