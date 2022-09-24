import React from "react"; // required
import "./index.css";

import "@fontsource/martel-sans";

import Nav from '../NavBar';

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
function UserName() {
    return (
        <div className="form-control">
            <label>Username </label>
            <input
                type="text"
                placeholder="enter your username here"
                name="username"
                id="username"
                // value="{{username}}"
                required
            />
        </div>
    );
}
function PassWord() {
    return (
        <div id="form-control-pw">
            <div className="form-control">
                <label>Password</label>
                <div className="row">
                    <input
                        type="password"
                        placeholder="enter your password here"
                        name="password"
                        id="password"
                        // value="{{username}}"
                        required
                    />
                    <IconButton href='community'>
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
    );
}

function ForgetPassword() {
    return (
        <div className="form-control">
            <div className="forgetpw">
                <a href="#">Forget Password</a>
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
    return (
        <div className="content">
            <Nav />
            <Title />
            <form action="#" method="post" class="form" id="form">
                <UserName />
                <PassWord />
                <ForgetPassword />
            </form>
            <div className="ORline">
                <div className="line"></div>
                <p>OR</p>
                <div className="line"></div>
            </div>
            <a className="signup" href="register">
                SIGN UP
            </a>
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Login;
