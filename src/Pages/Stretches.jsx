
import React from 'react';
import { Box } from '@mui/material';
import yogaImage from '../images/undraw_yoga_re_i5ld.svg'

const Stretches = () => {
  return (
    // add yoga image
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
      >
      <img src={yogaImage} alt="yoga" />
    </Box>
  );
};

export default Stretches;
