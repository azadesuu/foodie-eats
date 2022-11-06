import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./SignUp.css";
import React from "react";
import { useState } from "react";
import { checkProfileFields } from "../../utils";
import { signupUser } from "../../api";
import Alert from "@mui/material/Alert";

import "@fontsource/martel-sans";

import Login from "../Login";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [updateSignUp, setUpdateSignUp] = useState(false);

    async function onSubmit() {
        if (password === confirmPassword) {
            try {
                let data = {
                    username: username,
                    email: email,
                    password: password
                };
                if (username === "" || email === "" || password === "") {
                    setUpdateSignUp(!updateSignUp);
                    setAlertStatus("info");
                    setAlertMessage("Please fill in the missing fields.");
                    setTimeout(function() {
                        setUpdateSignUp(false);
                    }, 2000);
                    return;
                }
                if (!checkProfileFields(data)) return;
                const user = await signupUser(data);
                if (user) {
                    setUpdateSignUp(!updateSignUp);
                    setAlertStatus("success");
                    setAlertMessage("Signup successful. Please Login.");
                    setTimeout(function() {
                        setUpdateSignUp(false);
                    }, 2000);
                    if (!user.success){
                        setUpdateSignUp(!updateSignUp);
                        setAlertStatus(user.status);
                        setAlertMessage(user.message);
                        setTimeout(function() {
                            setUpdateSignUp(false);
                        }, 2000);
                    }
                }
            } catch (err) {
                alert(err);
            }
        } else {
            setUpdateSignUp(!updateSignUp);
            setAlertStatus("error");
            setAlertMessage("Please re-confirm your password.");
            setTimeout(function() {
                setUpdateSignUp(false);
            }, 2000);
        }
    }

    return (
        <div className="content-register">
            <Login />
            <SEO data={allSEO.signup} />
            <form action="#" method="post" className="form" id="form">
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
            {updateSignUp ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "20px"
                    }}
                >
                    {alertMessage}
                </Alert>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Register;
