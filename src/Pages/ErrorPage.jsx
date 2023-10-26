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
          404 - That means 4 seconds on the way up and then 4 seconds on the way down, right?<br/>
          Wait, that's not right. 404 means the page you're looking for doesn't exist.<br/>
          You can either head back to our home page or chill here and catch your breath.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" sx={{margin:"2rem 0"}}>
          Go Home
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
