import { useRef, useState, useEffect, useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import React from "react";
import { forgotPassword } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";

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
            setEmail("");
            navigate("/forgot-password");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form>
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
                <input type="button" value="Submit Email" onClick={onSubmit} />
            </form>
        </div>
    );
}

export default ForgotPassword;
