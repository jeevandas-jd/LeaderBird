import React, { useEffect } from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";

const Signin = () => {

    const navigate=useNavigate();
    const extractForm =async(event)=>{

        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const details = {
            email: email,
            password: password
        };
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin", details);
            alert(response.data.message);
            navigate('/') // Access 'data.message', not 'response.message'
        } catch (error) {
            console.error("Signin failed:", error);
            alert(error.response?.data?.message || "Signin failed!");
        }

    }   

    return (
        <div>
            <h1>You are on the Sign-in page of Leader Bird</h1>

            <form onSubmit={extractForm}>
                <h2>signinform</h2>
                <input type="email" name="email" placeholder="enter your emailID"/><br></br>
                <input type="password" name="password" placeholder="enter your password"/><br></br>
                <button type="submit">signIn</button>
            </form>
        </div>
    );
};

export default Signin;
