import { useContext } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../actions/UserContext";

export const useLogOut = async () => {
    const [user, setUser] = useContext(UserContext);
    localStorage.removeItem("token");
    setUser({});
};

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
