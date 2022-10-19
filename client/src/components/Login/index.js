import { useRef, useState, useEffect, useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useHistory } from "react-router";
import { loginUser } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../actions/UserContext";
import "./Login.css";

import "@fontsource/martel-sans";

import Nav from "../NavBar";

import LoginIcon from "@mui/icons-material/Login";

import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";

function Title() {
    return (
        <div>
            <h1>LOGIN</h1>
        </div>
    );
}

function ForgetPassword() {
    return (
        <div className="form-control">
            <div className="forgetpw">
                <a href="forgot-password">Forget Password</a>
            </div>
        </div>
    );
}

const theme = createTheme({
    palette: {
        background: {
            green: "#BEE5B0",
            grey: "#ECE7E5"
        },
        text: {
            main: "#000000"
        },
        img: {
            main: "#000000"
        }
    }
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // submit form
    const submitHandler = async () => {
        try {
            // using API function to submit data to FoodBuddy API
            const user = await loginUser({
                email: email,
                password: password
            });
            var token = localStorage.getItem("token");
            token ? document.location.reload() : navigate("/login");
        } catch (err) {
            alert(err);
            document.location.reload();
        }
    };

    return (
        <div className="content-Login">
            <Nav />
            <Title />
            <form action="#" method="post" class="form" id="form">
                <div className="form-control">
                    <label>Username </label>
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
                <div id="form-control-pw">
                    <div className="form-control">
                        <label>Password</label>
                        <div className="row">
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
                            <IconButton value="Login" onClick={submitHandler}>
                                <LoginIcon
                                    sx={{
                                        color: "black",
                                        fontSize: 35,
                                        display: "inline"
                                    }}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <ForgetPassword />
            </form>
            <div className="ORline">
                <div className="line"></div>
                <p>OR</p>
                <div className="line"></div>
            </div>
            <a className="signup" href="signup">
                SIGN UP
            </a>
            <div className="footer">
                <p>Copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Login;
