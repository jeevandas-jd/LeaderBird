import React from "react";

const Home = () => {
  return (
    <div>
      <h1>You are on the home page of Leader Bird</h1>
      <button onClick={() => window.location.href = "/signin"}>Sign In</button>
      <button onClick={() => window.location.href = "/signup"}>Sign Up</button>
    </div>
  );
};

export default Home;
