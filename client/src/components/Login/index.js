import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import { useState } from "react";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { checkProfileFields } from "../../utils";
import Alert from "@mui/material/Alert";
import "./Login.css";

import "@fontsource/martel-sans";

import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";

function ForgetPassword() {
    return (
        <div className="form-control">
            <div className="forgetpw">
                <a href="forgot-password">Forget Password</a>
            </div>
        </div>
    );
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [loginAlert, setLoginAlert] = useState(false);

    // submit form
    const submitHandler = async () => {
        try {
            // using API function to submit data to FoodBuddy API
            let data = {
                email: email,
                password: password
            };
            const message1 = checkProfileFields({ password: password });
            if (!message1.success) {
                setLoginAlert(true);
                setAlertStatus(message1.status);
                setAlertMessage(message1.message);
            }
            const message2 = await loginUser(data);
            if (message2) {
                if (!message2.success) {
                    setLoginAlert(true);
                    setAlertStatus(message2.status);
                    setAlertMessage(message2.message);
                }
            }
            var token = localStorage.getItem("token");
            token ? document.location.reload() : navigate("/login");
        } catch (err) {
            alert(err);
            document.location.reload();
        }
    };

    document.documentElement.className = "honeydew";
    return (
        <div className="content-Login">
            <SEO data={allSEO.login} />
            {loginAlert ? (
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
            <h1>LOGIN</h1>
            <form action="#" method="post" className="form" id="form">
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
        </div>
    );
}

export default Login;
