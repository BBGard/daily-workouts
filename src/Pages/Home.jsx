/**
 * @fileoverview Home page for the app. Displays the recommended workout for the day.
 */
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Slide,
  Skeleton,
  FormGroup,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
} from "@mui/material";
import { workouts, workoutSchedule, workoutScheduleAlt } from "../Data/workoutData";

const Home = () => {
  // Pick a random workout from the workout schedule
  const [recommendedWorkout, setRecommendedWorkout] = useState([]);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState(workouts);
  const [warmups, setWarmups] = useState();
  const [recovery, setRecovery] = useState();
  const [stretches, setStretches] = useState();
  const [recommendedWarmup, setRecommendedWarmup] = useState([]);
  const [recommendedRecovery, setRecommendedRecovery] = useState([]);
  const [recommendedStretch, setRecommendedStretch] = useState([]);
  const [currentWorkoutSchedule, setCurrentWorkoutSchedule] = useState(workoutSchedule);
  const [selectedTab, setSelectedTab] = useState(0);



  // On mount, load all workouts, generate today's workouts, and set the recommended workout
  useEffect(() => {

    // Setup Data
    setWarmups(workouts.filter(workout => workout.category.includes("Warm Up")));
    setRecommendedWarmup(workouts.filter(workout => workout.category.includes("Warm Up"))[0]);
    setRecovery(workouts.filter(workout => workout.category.includes("Recovery")));
    setRecommendedRecovery(workouts.filter(workout => workout.category.includes("Recovery"))[0]);
    setStretches(workouts.filter(workout => workout.category.includes("Stretch")));
    setRecommendedStretch(workouts.filter(workout => workout.category.includes("Stretch"))[0]);



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

  // Increment the recommended recovery
  const incrementRecommendedRecovery = () => {
    const currentRecoveryIndex = recovery.indexOf(recommendedRecovery);

    if (currentRecoveryIndex < recovery.length - 1) {
      setRecommendedRecovery(recovery[currentRecoveryIndex + 1]);
    } else {
      setRecommendedRecovery(recovery[0]);
    }
  }

  // Increment the recommended stretch
  const incrementRecommendedStretch = () => {
    const currentStretchIndex = stretches.indexOf(recommendedStretch);

    if (currentStretchIndex < stretches.length - 1) {
      setRecommendedStretch(stretches[currentStretchIndex + 1]);
    } else {
      setRecommendedStretch(stretches[0]);
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

  // Handle tab selection
  const handleTabSelect = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleTabSelect}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ width: "100%", backgroundColor: "background.paper", borderRadius: "5px", paddingBottom: "0.1rem"}}
        centered
      >
        <Tab label="Workout" />
        <Tab label="Warmup" />
        <Tab label="Recover" />
        <Tab label="Stretch" />
      </Tabs>

      {selectedTab === 0 && (
        <Box
          sx={{
            my: 4,
            height: "100%",
            // maxHeight: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                component="h1"
                align="center"
                gutterBottom
                marginTop={"1rem"}
                flex="1"
                color={"text.primary"}
              >
                Recommended Workout
              </Typography>
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
                    <Switch
                      checked={currentWorkoutSchedule === workoutScheduleAlt}
                      onChange={toggleWorkoutSchedule}
                    />
                  }
                  label="Use Alternative Workout Schedule"
                />
              </FormGroup>

              {recommendedWorkout ? (
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
                    {workoutSchedule[new Date().getDay()].day}{" "}
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
        </Box>
      )}

      {selectedTab === 1 && (
        <Box
          sx={{
            my: 4,
            height: "100%",
            // maxHeight: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                Need a Warmup?
              </Typography>
              {recommendedWarmup ? (
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
                      onClick={() => {
                        window.open(recommendedWarmup.link, "_blank");
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
        </Box>
      )}

      {selectedTab === 2 && (
        <Box
          sx={{
            my: 4,
            height: "100%",
            // maxHeight: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                Time to Recover!
              </Typography>
              {recommendedRecovery ? (
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
                  image={recommendedRecovery.thumbnail}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={345}
                  height={190}
                  animation="wave"
                />
              )}

              {recommendedRecovery ? (
                <CardContent
                  sx={{
                    textAlign: "center",
                    margin: "1rem auto",
                    height: "15vh",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Recommended Recovery
                  </Typography>
                  <Typography variant="h7" color="text.primary">
                    {recommendedRecovery.name}
                    <br></br>
                    Duration: {recommendedRecovery.duration}
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
                {recommendedRecovery ? (
                  <>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={incrementRecommendedRecovery}
                    >
                      Next
                    </Button>
                    <Button
                      size="large"
                      variant="contained"
                      color="buttonSuccess"
                      onClick={() => {
                        window.open(recommendedRecovery.link, "_blank");
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
        </Box>
      )}

      {selectedTab === 3 && (
        <Box
          sx={{
            my: 4,
            height: "100%",
            // maxHeight: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                Relax and Stretch
              </Typography>
              {recommendedStretch ? (
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
                  image={recommendedStretch.thumbnail}
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

              {recommendedStretch ? (
                <CardContent
                  sx={{
                    textAlign: "center",
                    margin: "1rem auto",
                    height: "15vh",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Recommended Recovery
                  </Typography>
                  <Typography variant="h7" color="text.primary">
                    {recommendedStretch.name}
                    <br></br>
                    Duration: {recommendedStretch.duration}
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
                {recommendedStretch ? (
                  <>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={incrementRecommendedStretch}
                    >
                      Next
                    </Button>
                    <Button
                      size="large"
                      variant="contained"
                      color="buttonSuccess"
                      onClick={() => {
                        window.open(recommendedStretch.link, "_blank");
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
        </Box>
      )}
    </>
  );
}

export default Home;
