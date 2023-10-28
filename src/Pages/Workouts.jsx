import React from 'react';

const Workouts = () => {
  const workouts = [
    { name: 'Push-ups', duration: '5 minutes' },
    { name: 'Squats', duration: '10 minutes' },
    { name: 'Plank', duration: '3 minutes' },
  ];

  return (
    <div>
      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <h2>{workout.name}</h2>
            <p>Duration: {workout.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
