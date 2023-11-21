import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Skeleton, Slide } from "@mui/material";
import notFoundImage from "../images/undraw_pilates_ltw9.svg";

export function WorkoutCard(props) {
  const workout = props.workout; // workout object - must contain name, duration, link, thumbnail
  const title = props.title; // title of the card - usually the name of the workout
  const subtitle = props.subtitle; // subtitle of the card - usually the type of workout
  const size = props.size ? props.size : "small"; // size of the card - large or small
  const incrementFunction = props.incrementFunction; // function to increment the workout
  const hasToggle = props.hasToggle ? props.hasToggle : false; // boolean to determine if the card has a toggle button
  const toggleFunction = props.toggleFunction
    ? props.toggleFunction
    : () => console.error("Missing Toggle Function"); // function to toggle the workout
  const isChecked = props.isChecked ? props.isChecked : false; // boolean to determine if the toggle is checked
  const type = props.type ? props.type : "workout"; // type of card - workout, warmup, recovery, stretch, missing


  if(type === "missing") {
    return (
      <Card
        sx={{
          maxWidth: 640,
          width: "100%",
          margin: "1rem auto",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h5" color={"text.secondary"}>
            {type === "missing" ? "No workouts found" : type}
          </Typography>
          <Typography variant="h6" component="div" color={"text.primary"}>
            {type === "missing" ? "Try a different search" : type}
          </Typography>
        </CardContent>
         <CardMedia
            component="img"
            alt="workout video screenshot"
            // height="190"
            image={notFoundImage}
          />



      </Card>
    )
  } else if (size === "large") {
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

          {hasToggle ? (
            <FormGroup
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <FormControlLabel
                sx={{ color: "text.primary" }}
                control={
                  <Switch checked={isChecked} onChange={toggleFunction} />
                }
                label="Use Alternative Workout Schedule"
                id="toggle-alternative-workout-schedule"
                name="toggle-alternative-workout-schedule"
              />
            </FormGroup>
          ) : (
            <></>
          )}

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
  } else if (size === "small") {
    return (
      <Card
        // key={workout.id}
        sx={{
          maxWidth: 345,
          width: "100%",
          margin: "1rem auto",
        }}
      >
        {workout != null ? (
          <CardMedia
            component="img"
            alt="workout video screenshot"
            height="190"
            image={workout.thumbnail}
            onClick={() => {
              window.open(workout.link, "_blank");
            }}
            sx={{
              cursor: "pointer",
            }}
            href={workout.link}
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
          {workout != null ? (
            <>
              <Typography variant="body1" color={"text.secondary"}>
                {workout.category}
              </Typography>
              <Typography variant="h6" component="div" color={"text.primary"}>
                {workout.duration} {workout.name}
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
          {workout != null ? (
            <Button
              variant="contained"
              color="buttonSuccess"
              onClick={() => {
                window.open(workout.link, "_blank");
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
