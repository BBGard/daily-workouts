import React from 'react';

function Warmups() {
  const routines = [
    'Hamstring stretch',
    'Quad stretch',
    'Calf stretch',
    'Shoulder stretch',
    'Tricep stretch',
    'Chest stretch'
  ];

  return (
    <div>
      <h1>Warmups</h1>
      <ul>
        {routines.map((routine, index) => (
          <li key={index}>{routine}</li>
        ))}
      </ul>
    </div>
  );
}

export default Warmups;
