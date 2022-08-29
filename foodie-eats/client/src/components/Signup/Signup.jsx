import React, { useState } from "react";
import { signupUser } from "../Signup/index";

function Signup() {
    localStorage.removeItem("token");
    window.localStorage.removeItem("currentOrder");

    return (
        <div className="signup">
            <SignupForm signupUser={signupUser}/>
        </div>
    );
}

function SignupForm({ signupUser, error}) {
    const [details, setDetails] = useState({
        email: "",
        username: "",
        password: ""
    });
    const history = useHistory();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await signupUser(details);

            const token = localStorage.getItem("token");
            token ? history.push("/profile") : history.push("/signup"); // After signup go to profile page
            document.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        {error !== "" ? <div className="error">{error}</div> : ""}
                        <div className="form-group">
                        <label htmlFor="email">Login ID (Email address)</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) =>
                            setDetails((prevDetails) => ({
                                ...prevDetails,
                                email: e.target.value,
                            }))
                            }
                            value={details.email}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            name="username"
                            id="username"
                            onChange={(e) => {
                            setDetails((prevDetails) => ({
                                ...prevDetails,
                                username: e.target.value,
                            }));
                            }}
                            value={details.username}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="Password">Password (min. 8 characters, 1 letter, 1 numerical digit)</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => {
                            setDetails((prevDetails) => ({
                                ...prevDetails,
                                password: e.target.value,
                            }));
                            }}
                            value={details.password}
                        />
                        </div>
                        <input type="submit" value="SIGN UP" />
                    </div>
                </form>
          </div>
        </>
    );
}

export default Signup;