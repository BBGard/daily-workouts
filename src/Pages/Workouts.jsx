import React from 'react';
import { workouts } from '../Data/workoutData';
import { Link } from 'react-router-dom';
import { Typography, Box, Card } from '@mui/material';

const Workouts = () => {

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" color={"white"} textAlign={"center"} gutterBottom>
        All Workouts
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
        {workouts.map((workout) => (
          <Card
            key={workout.id}
            sx={{
              maxWidth: 345,
              margin: "1rem auto",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Link onClick={ ()=> {
              window.open(workout.link, "_blank")
            }}>
              <img
                src={workout.thumbnail}
                alt={workout.name}
                style={{ width: "100%" }}
              />
            </Link>
            <Typography
              variant="h6"
              component="h2"
              color={"white"}
              textAlign={"center"}
              gutterBottom
              marginTop={"1rem"}
            >
              {workout.duration} {workout.name}
            </Typography>
          </Card>
        ))}

        </Box>

    </Box>

  )
};

export default Workouts;
