import React from 'react';
//import './ErrorMessage.css'; // Optional styling

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>Error: {message}</p>
    </div>
  );
}

export default ErrorMessage;