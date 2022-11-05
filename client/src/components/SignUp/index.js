import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./SignUp.css";
import React from "react";
import { useState } from "react";
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

    async function onSubmit() {
        if (password === confirmPassword) {
            try {
                const user = await signupUser({
                    username: username,
                    email: email,
                    password: password
                });
                if (user) {
                    alert("Signup successful. Please Login.");
                    navigate("/login");
                }
            } catch (err) {
                alert(err);
            }
        } else {
            alert("Please re-confirm your password.");
        }
    }

    return (
        <div className="content-register">
            <Login />
            <SEO data={allSEO.signup} />
            <form action="#" method="post" class="form" id="form">
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="enter an email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div className="form-label-big">
                    <span className="helper-text">6-16 characters</span>
                </div>
                <div className="form-control">
                    <div className="form-label-small">
                        <label>Username</label>
                        <span className="helper-text">6-16 characters</span>
                    </div>
                    <div className="form-label-big-un">
                        <label>Username</label>
                    </div>
                    <input
                        type="text"
                        placeholder="enter a username"
                        name="username"
                        id="username"
                        minLength={6}
                        maxLength={16}
                        value={username}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>
                <div className="form-label-big">
                    <span className="helper-text">
                        at least 1 lowercase, 1 uppercase letter, and 1 number
                    </span>
                </div>
                <div className="form-control">
                    <div className="form-label-small">
                        <label>Password</label>
                        <span className="helper-text">
                            1 lowercase, 1 uppercase letter, and 1 number
                        </span>
                    </div>
                    <div className="form-label-big-pw">
                        <label>Password</label>
                    </div>
                    <input
                        type="password"
                        placeholder="enter your password"
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
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="re-enter your password"
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
        </div>
    );
}

export default Register;
