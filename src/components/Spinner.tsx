import React from 'react';

function Spinner() {
  return (
    <div className="spinner">
      {new Array(12).fill(null).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
}

export default Spinner;
