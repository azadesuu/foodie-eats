// import './App.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { useParams } from "react-router-dom";
import { navigate, useNavigate } from "react-router-dom";
import { getProfile } from "../../api";
import { useQuery, useMutation } from "react-query";
import Axios from "axios";
import { CircularProgress } from "@mui/material";

function Profile(props) {
    //getting visited user
    const navigate = useNavigate();
    const { username } = useParams();

    // getting logged in user
    const [user, setUser] = useContext(UserContext);
    const [loggedUsername, setloggedUsername] = useState("");
    useEffect(() => {
        setloggedUsername(user?.username);
    }, [user]);

    // if its the  logged in user, load the myprofile component
    const isUser = username === loggedUsername;
    if (isUser) {
        navigate("/my-profile");
    }

    const userQueryProfile = useQuery("profile", () => getProfile(username));
    const { data: userProfile, isLoading } = userQueryProfile;

    return (
        <div>
            {isLoading && <CircularProgress className="spinner" />}
            {userProfile ? (
                <div>
                    <h1>{userProfile.profileImage}</h1>
                    <h1>{username}</h1>
                    <h1>{userProfile.bio}</h1>
                    <h1>{userProfile.profileImage}</h1>
                </div>
            ) : (
                <h1>User not found</h1>
            )}
        </div>
    );
}

export default Profile;
