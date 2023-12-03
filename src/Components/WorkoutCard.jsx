import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  // IconButton,
  Divider,
  Switch,
} from "@mui/material";
import { Skeleton, Slide } from "@mui/material";
import notFoundImage from "../images/undraw_pilates_ltw9.svg";
import { TimerOutlined, RunCircleOutlined, AccessibilityNewOutlined } from "@mui/icons-material";
// import { FavoriteBorderRounded } from "@mui/icons-material";

export function WorkoutCard(props) {
  const workout = props.workout; // workout object - must contain name, duration, link, thumbnail
  const title = props.title; // title of the card - usually the name of the workout
  // const subtitle = props.subtitle; // subtitle of the card - usually the type of workout
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
        <Card sx={{ maxWidth: 540, margin: "0 auto", borderRadius: "0" }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            flex="1"
            margin={"1rem auto"}
            color={"text.primary"}
          >
            {title}
          </Typography>
          {hasToggle ? (
            <FormGroup
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    color="secondary"
                    checked={isChecked}
                    onChange={toggleFunction}
                  />
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
                margin: "0 auto",
              }}
              image={workout.thumbnail}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{
                height: "auto",
                margin: "0 auto",
              }}
              animation="wave"
            />
          )}

          {workout ? (
            <CardContent
              sx={{
                textAlign: "left",
                margin: "1rem auto",
              }}
            >
              <Box sx={{ height: "5em" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "400", marginLeft: "0.2rem" }}
                >
                  {workout.name}
                </Typography>
                <Divider />
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <TimerOutlined sx={{ color: "#FF2E00" }} />
                <Typography variant="body1">Duration: </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {workout.duration}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <RunCircleOutlined sx={{ color: "#FF2E00" }} />
                <Typography variant="body1">Workout Type: </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {workout.category}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <AccessibilityNewOutlined sx={{ color: "#FF2E00" }} />
                <Typography variant="body1">Muscle Group: </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {workout.group}
                </Typography>
              </Box>
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
                  color="primary"
                  onClick={incrementFunction}
                  width="100%"
                >
                  Next
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    window.open(workout.link, "_blank");
                  }}
                  width="100%"
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
            textAlign: "left",
          }}
        >
          {workout != null ? (
            <>
              <Box sx={{ height: "5em" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "400", marginLeft: "0.2rem" }}
                >
                  {workout.name}
                </Typography>
                <Divider />
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <TimerOutlined sx={{ color: "#FF2E00" }} />
                <Typography variant="body1">Duration: </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {workout.duration}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <RunCircleOutlined sx={{ color: "#FF2E00" }} />
                <Typography variant="body1">Workout Type: </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {workout.category}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <AccessibilityNewOutlined sx={{ color: "#FF2E00" }} />
                <Typography variant="body1">Muscle Group: </Typography>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {workout.group}
                </Typography>
              </Box>
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
              color="secondary"
              onClick={() => {
                window.open(workout.link, "_blank");
              }}
              width="100%"
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
