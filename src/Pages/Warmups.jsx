import React from 'react';
import { workouts } from '../Data/workoutData';
import {  Typography, Box, Button, Card, CardActions, TextField,  CardMedia, Skeleton, CardContent, OutlinedInput } from '@mui/material';
import { useState } from 'react';


function Warmups() {

  // Select only warmups from workout data
  const warmups = workouts.filter((workout) => workout.category === "Warm Up");


  console.log(warmups);


  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        color={"black"}
        textAlign={"center"}
        gutterBottom
      >
        Warm Ups
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          margin: "0 auto",
        }}
      >
        {warmups.map((warmup) => (
          <Card
            key={warmup.id}
            sx={{
              maxWidth: 345,
              width: "100%",
              margin: "1rem auto",
            }}
          >
            {warmup != null ? (
              <CardMedia
                component="img"
                alt="warmup video screenshot"
                height="190"
                image={warmup.thumbnail}
                onClick={() => {
                  window.open(warmup.link, "_blank");
                }}
                sx={{
                  cursor: "pointer",
                }}
                href={warmup.link}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={345}
                height={190}
                animation="wave"
              />
            )}
            <CardContent
              sx={{
                textAlign: "center",
              }}
            >
              {warmup != null ? (
                <>
                  <Typography variant="body1" color="text.secondary">
                    {warmup.category}
                  </Typography>
                  <Typography variant="h6" component="div" color={"black"}>
                    {warmup.duration} {warmup.name}
                  </Typography>
                </>
              ) : (
                <Skeleton animation="wave" height={10} width="80%" />
              )}
            </CardContent>

            <CardActions
              sx={{
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              {warmup != null ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    window.open(warmup.link, "_blank");
                  }}
                >
                  Watch
                </Button>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", margin: "0 1rem" }}
                />
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Warmups;
