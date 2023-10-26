import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const ErrorPage = () => {
  return (
    <>
      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          maxHeight: "70vh",
          maxWidth: "480px",
          flexDirection: "column",
          margin: "0 auto", // added this line
        }}
      >
        <Typography variant="h1" color={'white'}>404</Typography>
        <Typography variant="h4" color={'white'} sx={{marginBottom:"1rem"}}>Whoops!</Typography>
        <Typography variant="body1" color={'white'} textAlign={'center'}>
          404 means the page you are looking for is not found.<br></br>
          Whether or not it ever existed is a mystery to us all.<br></br>
          But don't worry, you can always go back to the home page.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" sx={{margin:"2rem 0"}}>
          Go Home
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
