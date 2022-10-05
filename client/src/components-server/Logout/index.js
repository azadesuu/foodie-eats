import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../actions/UserContext";
import { useContext } from "react";

export default function Logout() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    // remove token from the local storage
    function handleLogOut() {
        // remove token from the local storage
        localStorage.removeItem("token");
        setUser({});
        navigate("/login");
    }

    return <div>{user && <button onClick={handleLogOut}>Logout</button>}</div>;
}
