/**
 * @fileoverview Defines a component that displays the year and author of the app.
 */
import { Typography, Link } from "@mui/material";

export function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Benjamin Gardiner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
