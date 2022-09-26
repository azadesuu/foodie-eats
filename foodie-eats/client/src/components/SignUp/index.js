import "./index.css";

import { useState } from "react";
import React from "react";
import { signupUser } from "../../api";
import { useNavigate } from "react-router-dom";

import "@fontsource/martel-sans";

import Login from "../Login";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const navigate = useNavigate();

    function onSubmit() {
        if (password === confirmPassword) {
            signupUser({
                username: username,
                email: email,
                password: password
            });

            navigate("/login");
        } else {
            alert("Please re-confirm your password");
        }
    }

    return (
        <div className="content-register">
            <Login />
            <form action="#" method="post" class="form" id="form">
                <div className="form-control">
                    <label>Email </label>
                    <input
                        type="text"
                        placeholder="enter your email here"
                        name="email"
                        id="email"
                        value={email}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>

                <div className="form-control">
                    <label>Username </label>
                    <input
                        type="text"
                        placeholder="enter your username here"
                        name="username"
                        id="username"
                        value={username}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>
                <div className="form-control">
                    <label>Password </label>
                    <input
                        type="password"
                        placeholder="enter your password here"
                        name="password"
                        id="password"
                        value={password}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <div className="form-control-signup-pw-con">
                    <div className="form-control">
                        <label>Confirm Password </label>
                        <input
                            type="password"
                            placeholder="enter your password again"
                            name="password"
                            id="password"
                            value={confirmPassword}
                            onChange={event => {
                                setconfirmPassword(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </form>
            <div className="signup-done">
                <a className="done" onClick={onSubmit}>
                    DONE
                </a>
            </div>
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Register;
