/**
 * @fileoverview Home page for the app. Displays the recommended workout for the day.
 */
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Slide,
  Skeleton,
} from "@mui/material";
import { workouts, workoutSchedule } from "../Data/workoutData";

const Home = () => {
  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState(workouts);
  const [warmups, setWarmups] = useState();


  // On mount, load all workouts, generate today's workouts, and set the recommended workout
  useEffect(() => {

    // Setup Warmups
    setWarmups(workouts.filter(workout => workout.category.includes("Warmup")));

    // Generate today's workouts and recommended workout
    const generateTodaysWorkouts = (workoutData) => {
      console.log("Generating todays workout");
      const lastGeneratedTimestamp = localStorage.getItem(
        "lastGeneratedTimestamp"
      );
      const currentDate = new Date();

      // Check if the workouts need to be regenerated
      if (
        todaysWorkouts.length === 0 ||
        !lastGeneratedTimestamp ||
        currentDate.getDate() !== new Date(lastGeneratedTimestamp).getDate()
      ) {

        // Filter the workouts based on the current day
        const workoutList = workoutData.filter((workout) =>
          workout.group.includes(
            // Javascript uses 0-6 for Sunday-Saturday
            workoutSchedule[currentDate.getDay()].workout
          ) ||
          workout.category.includes(
            // Javascript uses 0-6 for Sunday-Saturday
            workoutSchedule[currentDate.getDay()].workout
          )
        );

        // Sort the workouts by watch count - to be propery implemented later
        workoutList.sort((a, b) => (a.watchCount > b.watchCount ? 1 : -1));

        setTodaysWorkouts(workoutList);

        // Store the current date as the last generated timestamp
        localStorage.setItem("lastGeneratedTimestamp", currentDate);

        // Set the recommended workout to the first workout in the list
        setRecommendedWorkout(workoutList[0]);
      }
    };

     // Generate today's workouts and recommended workout
     generateTodaysWorkouts(workouts);
  }, [todaysWorkouts.length]);


  // Increment the recommended workout
  const incrementRecommendedWorkout = () => {
    const currentWorkoutIndex = todaysWorkouts.indexOf(recommendedWorkout);

    if (currentWorkoutIndex < todaysWorkouts.length - 1) {
      setRecommendedWorkout(todaysWorkouts[currentWorkoutIndex + 1]);
    } else {
      setRecommendedWorkout(todaysWorkouts[0]);
    }
  };

  // Watch the selected workout
  function watchSelectedWorkout() {

    // Log the recommended workout
    console.log("Recommended workout", recommendedWorkout);

    // Increment the watch count
    recommendedWorkout.watchCount++;

    // Find recommendedWorkout in allWorkouts and update it
    const updatedWorkouts = allWorkouts.map((workout) => {
      if (workout.name === recommendedWorkout.name) {
        return recommendedWorkout;
      } else {
        return workout;
      }
    });

    // Update allWorkouts to reflect the updated watch count
    setAllWorkouts(updatedWorkouts);

    // Log the updated workout from allWorkouts
    console.log("Updated workout", allWorkouts.find(workout => workout.name === recommendedWorkout.name));

    // Open the workout in a new tab
    window.open(recommendedWorkout.link, "_blank");
  }


  return (
    <>
      <Box
        sx={{
          my: 4,
          height: "100%",
          maxHeight: "70vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
         <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              marginTop={"1rem"}
              flex="1"
            >
              Recommended Workout
              {/* {workoutSchedule[new Date().getDay()].day}-{" "}
              {workoutSchedule[new Date().getDay()].workout} */}
            </Typography>
        <Slide
          direction="right"
          timeout={500}
          in={true}
          mountOnEnter
          unmountOnExit
        >
          <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>


            {recommendedWorkout ? (
              <CardMedia
                component="img"
                alt="workout video screenshot"
                height="190"
                // image={recommendedWorkout.thumbnail}
                image={recommendedWorkout.thumbnail}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={345}
                height={190}
                animation="wave"
              />
            )}

            {recommendedWorkout ? (
              <CardContent
                sx={{
                  textAlign: "center",
                  margin: "1rem auto",
                  height: "15vh",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Recommended Workout
                </Typography>
                <Typography variant="h7" color="text.primary">
                  {recommendedWorkout.name}
                  <br></br>
                  Duration: {recommendedWorkout.duration}
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
              {recommendedWorkout ? (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={incrementRecommendedWorkout}
                  >
                    Next
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={watchSelectedWorkout}
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

        <Slide
          direction="left"
          timeout={500}
          in={true}
          mountOnEnter
          unmountOnExit
        >
          <ButtonGroup
            sx={{ width: "100%", justifyContent: "center" }}
            variant="text"
            aria-label="text button group"
          >
            <Button
              variant="contained"
              sx={{ margin: "1rem auto" }}
              href="/workouts"
              onClick={() => {
                // open workouts page
                window.location.href = "/workouts";
              }}
            >
              Find a Workout
            </Button>
          </ButtonGroup>
        </Slide>
      </Box>
      <Box
        sx={{
          my: 4,
          height: "100%",
          maxHeight: "70vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          marginTop={"1rem"}
          flex="1"
        >
          Need a Warmup?
        </Typography>

        <Slide
          direction="right"
          timeout={500}
          in={true}
          mountOnEnter
          unmountOnExit
        >
          <Card sx={{ maxWidth: 345, margin: "1rem auto" }}>
            {recommendedWorkout ? (
              <CardMedia
                component="img"
                alt="workout video screenshot"
                height="190"
                // image={recommendedWorkout.thumbnail}
                image={recommendedWorkout.thumbnail}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={345}
                height={190}
                animation="wave"
              />
            )}

            {recommendedWorkout ? (
              <CardContent
                sx={{
                  textAlign: "center",
                  margin: "1rem auto",
                  height: "15vh",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Recommended Workout
                </Typography>
                <Typography variant="h7" color="text.primary">
                  {recommendedWorkout.name}
                  <br></br>
                  Duration: {recommendedWorkout.duration}
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
              {recommendedWorkout ? (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={incrementRecommendedWorkout}
                  >
                    Next
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={watchSelectedWorkout}
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
      </Box>
    </>
  );
}

export default Home;
