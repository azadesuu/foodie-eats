import { useRef, useState, useEffect, useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import React from "react";
import { useHistory } from "react-router";
import { signupUser } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";

/*
  Generate a signup form
*/
function SignUp() {
    // state hook functions
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function onSubmit() {
        signupUser({
            username: username,
            email: email,
            password: password
        });

        navigate("/login");
    }
    return (
        <div>
            <form>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    placeholder="username"
                    onChange={event => {
                        setUsername(event.target.value);
                    }}
                />
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="email"
                    onChange={event => {
                        setEmail(event.target.value);
                    }}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={event => {
                        setPassword(event.target.value);
                    }}
                />
                <input type="button" value="Sign Up" onClick={onSubmit} />
            </form>
        </div>
    );
}

export default SignUp;
