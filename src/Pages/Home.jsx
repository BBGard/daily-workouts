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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { workouts, workoutSchedule, workoutScheduleAlt } from "../Data/workoutData";

const Home = () => {
  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState(workouts);
  const [warmups, setWarmups] = useState();
  const [recommendedWarmup, setRecommendedWarmup] = useState([]);
  const [currentWorkoutSchedule, setCurrentWorkoutSchedule] = useState(workoutSchedule);


  // On mount, load all workouts, generate today's workouts, and set the recommended workout
  useEffect(() => {

    // Setup Warmups
    setWarmups(workouts.filter(workout => workout.category.includes("Warm Up")));
    setRecommendedWarmup(workouts.filter(workout => workout.category.includes("Warm Up"))[0]);


    // Generate today's workouts and recommended workout based on schedule
    const generateTodaysWorkouts = (workoutData) => {
      const currentDate = new Date();

        // Filter the workouts based on the current day and schedule
        const workoutList = workoutData.filter(
          (workout) =>
            workout.group.includes(
              // Javascript uses 0-6 for Sunday-Saturday
              currentWorkoutSchedule[currentDate.getDay()].group
            ) &&
            workout.category.includes(
              // Javascript uses 0-6 for Sunday-Saturday
              currentWorkoutSchedule[currentDate.getDay()].category
            )
        );

        // Sort the workouts by watch count - to be propery implemented later
        workoutList.sort((a, b) => (a.watchCount > b.watchCount ? 1 : -1));

        setTodaysWorkouts(workoutList);

        // Set the recommended workout to the first workout in the list
        setRecommendedWorkout(workoutList[0]);
      }


     // Generate today's workouts and recommended workout
     generateTodaysWorkouts(workouts);
  }, [todaysWorkouts.length, currentWorkoutSchedule]);


  // Increment the recommended workout
  const incrementRecommendedWorkout = () => {
    const currentWorkoutIndex = todaysWorkouts.indexOf(recommendedWorkout);

    if (currentWorkoutIndex < todaysWorkouts.length - 1) {
      setRecommendedWorkout(todaysWorkouts[currentWorkoutIndex + 1]);
    } else {
      setRecommendedWorkout(todaysWorkouts[0]);
    }
  };

  // Increment the recommended warmup
  const incrementRecommendedWarmup = () => {
    const currentWarmupIndex = warmups.indexOf(recommendedWarmup);

    if (currentWarmupIndex < warmups.length - 1) {
      setRecommendedWarmup(warmups[currentWarmupIndex + 1]);
    } else {
      setRecommendedWarmup(warmups[0]);
    }
  }

  // Watch the selected workout
  function watchSelectedWorkout() {


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


    // Open the workout in a new tab
    window.open(recommendedWorkout.link, "_blank");
  }

  // Toggle between the two workout schedules
  function toggleWorkoutSchedule() {
    console.log("Toggling workout schedule");

    // If the current workout schedule is the default schedule, use the alternative schedule
    if (currentWorkoutSchedule === workoutSchedule) {
      setCurrentWorkoutSchedule(workoutScheduleAlt);
    } else {
      // Otherwise, use the default schedule
      setCurrentWorkoutSchedule(workoutSchedule);
    }

    // Store the current workout schedule in local storage
    localStorage.setItem("workoutSchedule", JSON.stringify(currentWorkoutSchedule));
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
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={currentWorkoutSchedule === workoutScheduleAlt}
                onChange={toggleWorkoutSchedule}
              />
            }
            label="Use Alternative Workout Schedule"
          />
        </FormGroup>


         <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              marginTop={"1rem"}
              flex="1"
              color={"text.tertiary"}
            >
              Recommended Workout
            </Typography>
        <Slide
          direction="right"
          timeout={500}
          in={true}
          mountOnEnter
          unmountOnExit
        >
          <Card sx={{ maxWidth: 345, margin: "1rem auto"}}>


            {recommendedWorkout ? (
              <CardMedia
                component="img"
                alt="workout video screenshot"
                height="190"
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
                  color: "text.secondary",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {workoutSchedule[new Date().getDay()].day}: {" "}
                  {workoutSchedule[new Date().getDay()].workout}
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
                    color="buttonSuccess"
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
            sx={{ width: "100%", justifyContent: "center", marginTop: "2rem" }}
            variant="text"
            aria-label="text button group"
          >
            <Button
              variant="contained"
              size="large"
              color="buttonSuccess"
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
          flex="1"
          marginTop={"2rem"}
          color={"text.tertiary"}

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
          <Card sx={{ maxWidth: 345, margin: "1rem auto"}}>
            {recommendedWarmup ? (
              <CardMedia
                component="img"
                alt="workout video screenshot"
                height="190"
                image={recommendedWarmup.thumbnail}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width={345}
                height={190}
                animation="wave"
              />
            )}

            {recommendedWarmup ? (
              <CardContent
                sx={{
                  textAlign: "center",
                  margin: "1rem auto",
                  height: "15vh",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Recommended Warmup
                </Typography>
                <Typography variant="h7" color="text.primary">
                  {recommendedWarmup.name}
                  <br></br>
                  Duration: {recommendedWarmup.duration}
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
              {recommendedWarmup ? (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={incrementRecommendedWarmup}
                  >
                    Next
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="buttonSuccess"
                    onClick={
                      () => {
                        window.open(recommendedWarmup.link, "_blank");
                      }
                    }
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
