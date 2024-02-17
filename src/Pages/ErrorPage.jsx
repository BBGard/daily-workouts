import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import errorImage from '../images/undraw_taken_re_yn20.svg';

const ErrorPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
          maxHeight: "70vh",
          maxWidth: "480px",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <img src={errorImage} alt="404 error" width="100%" />
        <Typography variant="h1" color="#2e374a">404</Typography>
        <Typography variant="h4" color="#2e374a"  sx={{marginBottom:"1rem"}}>Whoops!</Typography>
        <Typography variant="h6" color="#2e374a" textAlign={'center'}>
         This page has been taken...
        </Typography>
        <Button component={Link} to="/" variant="contained" color="secondary" sx={{margin:"2rem 0"}}>
          Go Home
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
