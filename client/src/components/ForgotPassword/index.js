import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./ForgotPassword.css";
import { checkProfileFields } from "../../utils";
import React, { useState } from "react";
import { forgotPassword } from "../../api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    // state hook functions
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // submit form
    async function submitHandler(email) {
        try {
            if (!checkProfileFields({ email: email })) return;
            const sent = await forgotPassword(email);
            if (sent) {
                alert(
                    "Email sent successfully. Please wait for token to reset password."
                );
            } else {
                alert("There was an error while requesting to reset password.");
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
        </div>
    );
}

export default ForgotPassword;
