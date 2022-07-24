import { Typography } from "@mui/material";

const Panel = ({ children, title, containerClass }) => (
  <div className={containerClass}>
    <Typography variant="h5">{title}</Typography>
    {children}
  </div>
);

export default Panel;
