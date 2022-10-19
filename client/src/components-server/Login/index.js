import { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { loginUser } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../actions/UserContext";

function Login() {
    // state hook functions
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // submit form
    const submitHandler = async e => {
        try {
            // using API function to submit data to FoodBuddy API
            await loginUser({
                email: email,
                password: password
            });
            // if token exists login is successful
            var token = localStorage.getItem("token");
            token ? navigate("/") : navigate("/login");
            document.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

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
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={event => {
                        setPassword(event.target.value);
                    }}
                />
                <input type="button" value="Login" onClick={submitHandler} />
            </form>
        </div>
    );
}

export default Login;
