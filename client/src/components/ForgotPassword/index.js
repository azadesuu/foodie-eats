import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./ForgotPassword.css";
import { checkProfileFields } from "../../utils";
import React, { useState } from "react";
import { forgotPassword } from "../../api";
import Alert from "@mui/material/Alert";

function ForgotPassword() {
    // state hook functions
    const [email, setEmail] = useState("");
    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [forgotpw, setForgotpw] = useState(false);

    // submit form
    async function submitHandler(email) {
        try {
            if (!checkProfileFields(email)) return;
            const sent = await forgotPassword(email);
            if (sent) {
                setForgotpw(!forgotpw);
                setAlertStatus("success");
                setAlertMessage("Email sent successfully. Please wait for token to reset password.");
                setTimeout(function() {
                    setForgotpw(false);
                }, 1000);
            } else {
                setForgotpw(!forgotpw);
                setAlertStatus("error");
                setAlertMessage("There was an error while requesting to reset password.");
                setTimeout(function() {
                    setForgotpw(false);
                }, 5000);
            }
            setTimeout(function() {
                window.location.reload();
            }, 10000);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="content-ForgotPassword">
            <SEO data={allSEO.forgotpassword} />
            <h1>FORGOT PASSWORD</h1>
            <div className="form-control-forgotpassword">
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter your email here"
                    onChange={event => {
                        setEmail(event.target.value);
                    }}
                />
                <button
                    id="submit-btn"
                    onClick={() => submitHandler({ email: email })}
                >
                    SUBMIT
                </button>
            </div>
            {forgotpw ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "5px"
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

export default ForgotPassword;
