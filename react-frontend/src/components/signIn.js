import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signin.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/signin", { email, password }, { withCredentials: true });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>Game Management System</h1>
        <button className={styles.signupBtn}>Sign Up</button>
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginContent}>
            <h2>Login now</h2>
            <p>Hi, Welcome back 👋</p>
            <div className={styles.loginOptions}>
              <button className={styles.googleLogin}>Login with Google</button>
              <p>or Login with Email</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email ID" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className={styles.options}>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
                <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
              </div>
              <button type="submit" className={styles.loginBtn}>Login</button>
            </form>
            <p>
              Not registered yet? Create an account <a href="#">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
