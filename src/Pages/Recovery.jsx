import React from 'react';

const Recovery = () => {
  const recoveryRoutines = [
    'Stretching',
    'Foam Rolling',
    'Meditation',
    'Yoga',
    'Ice Bath',
    'Massage',
    'Compression Garments',
    'Active Recovery',
  ];

  return (
    <div>
      <h1>Recovery Routines</h1>
      <ul>
        {recoveryRoutines.map((routine, index) => (
          <li key={index}>{routine}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recovery;
