import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./ForgotPassword.css";
import { useState } from "react";
import React from "react";
import { forgotPassword } from "../../api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    // state hook functions
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // submit form
    function onSubmit() {
        try {
            forgotPassword(email);
            alert(
                "Email sent successfully. Please wait for token to reset password"
            );
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="content-ForgotPassword">
            <SEO data={allSEO.forgotpassword} />
            <h1>FORGOT PASSWORD</h1>
            <form className="form-control-forgotpassword">
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
                <button id="submit-btn" onClick={onSubmit}>
                    SUBMIT
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
