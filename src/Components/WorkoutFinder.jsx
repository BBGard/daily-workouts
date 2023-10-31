import React, { useState } from 'react';

const WorkoutFinder = () => {
  const [keywords, setKeywords] = useState('');
  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleMinDurationChange = (event) => {
    setMinDuration(event.target.value);
  };

  const handleMaxDurationChange = (event) => {
    setMaxDuration(event.target.value);
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };

  const handleMuscleGroupChange = (event) => {
    setMuscleGroup(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  const handleFormClear = () => {
    setKeywords('');
    setMinDuration('');
    setMaxDuration('');
    setWorkoutType('');
    setMuscleGroup('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="keywords">Keywords:</label>
      <input type="text" id="keywords" value={keywords} onChange={handleKeywordsChange} />

      <label htmlFor="minDuration">Min Duration:</label>
      <input type="number" id="minDuration" value={minDuration} onChange={handleMinDurationChange} />

      <label htmlFor="maxDuration">Max Duration:</label>
      <input type="number" id="maxDuration" value={maxDuration} onChange={handleMaxDurationChange} />

      <label htmlFor="workoutType">Workout Type:</label>
      <select id="workoutType" value={workoutType} onChange={handleWorkoutTypeChange}>
        <option value="">Select a type</option>
        <option value="weights">Weights</option>
        <option value="warmups">Warmups</option>
        <option value="recovery">Recovery</option>
      </select>

      <label htmlFor="muscleGroup">Muscle Group:</label>
      <select id="muscleGroup" value={muscleGroup} onChange={handleMuscleGroupChange}>
        <option value="">Select a muscle group</option>
        <option value="totalBody">Total Body</option>
        <option value="back">Back</option>
        <option value="chest">Chest</option>
        <option value="biceps">Biceps</option>
        <option value="triceps">Triceps</option>
        <option value="legs">Legs</option>
        <option value="glutes">Glutes</option>
        <option value="shoulders">Shoulders</option>
        <option value="arms">Arms</option>
      </select>

      <button type="submit">Refine</button>
      <button type="button" onClick={handleFormClear}>Clear</button>
    </form>
  );
};

export default WorkoutFinder;
