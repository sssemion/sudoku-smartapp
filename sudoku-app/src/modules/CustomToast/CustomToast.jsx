import React from 'react';

export function CustomToast({ message }) {
  return (
    <div className="custom-toast">
      <h4>{message}</h4>
    </div>
  );
};