import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, } from '@mui/material';
import { Skeleton, Slide } from "@mui/material";

export function WorkoutCard(props) {

  const workout = props.workout; // workout object - must contain name, duration, link, thumbnail
  const title = props.title; // title of the card - usually the name of the workout
  const subtitle = props.subtitle; // subtitle of the card - usually the type of workout
  const size = props.size; // size of the card - large or small
  const incrementFunction = props.incrementFunction; // function to increment the workout


  if(size === "large") {

      return (
        <Slide
          direction="right"
          timeout={500}
          in={true}
          mountOnEnter
          unmountOnExit
        >
          <Card sx={{ maxWidth: 540, margin: "1rem auto" }}>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
              flex="1"
              margin={"2rem auto"}
              color={"text.primary"}
            >
              {title}
            </Typography>
            {workout ? (
              <CardMedia
                component="img"
                alt="workout video screenshot"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "400px",
                  maxHeight: "220px",
                  margin: "0 auto",
                  borderRadius: "5px",
                }}
                image={workout.thumbnail}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={400}
                height={220}
                sx={{
                  maxWidth: "400px",
                  maxHeight: "220px",
                  margin: "0 auto",
                  borderRadius: "5px",
                }}
                animation="wave"
              />
            )}

            {workout ? (
              <CardContent
                sx={{
                  textAlign: "center",
                  margin: "1rem auto",
                  height: "15vh",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {subtitle}
                </Typography>
                <Typography variant="h7" color="text.primary">
                  {workout.name}
                  <br></br>
                  Duration: {workout.duration}
                </Typography>
              </CardContent>
            ) : (
              <>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", margin: "0 1rem" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", margin: "0 1rem" }}
                />
              </>
            )}

            <CardActions
              sx={{
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {workout ? (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={incrementFunction}
                  >
                    Next
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="buttonSuccess"
                    onClick={() => {
                      window.open(workout.link, "_blank");
                    }}
                  >
                    Watch
                  </Button>
                </>
              ) : (
                <>
                  <Skeleton
                    variant="text"
                    sx={{ width: "30%", fontSize: "2rem", margin: "0 1rem" }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ width: "30%", fontSize: "2rem", margin: "0 1rem" }}
                  />
                </>
              )}
            </CardActions>
          </Card>
        </Slide>
      );
  }
  else if (size === "small") {
    return (
      <></>
    );
  }
  else {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }

}

export default WorkoutCard;
