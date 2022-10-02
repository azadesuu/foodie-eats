import "./index.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { navigate, useNavigate } from "react";
import { getProfile } from "../../api";
import { useQuery, useMutation } from "react-query";
import Axios from "axios";
import { CircularProgress } from "@mui/material";
import { usePreviousNonNullish } from "../../hooks";

import EditIcon from "@mui/icons-material/Edit";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import NavLoggedIn from "../LoggedInNavBar";
import EditProfile from "../EditProfile";
import ChangePassword from "../ChangePassword";

function TopUser() {
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
        alert(
            "You are the user of this profile! Navigating to My Profile page..."
        );
        navigate("/my-profile");
    }

    const { data: userProfile, isLoading } = useQuery(
        "profile",
        () => getProfile(username),
        { enabled: !!username }
    );

    return (
        <div className="top-user">
            <div className="top-user-r1">
                <Avatar
                    alt="user-profile-image"
                    src={userProfile.profileImage}
                    sx={{ height: 130, width: 130 }}
                />
                <div className="top-user-info">
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p>
                    <span className="detail">7</span> reviews
                </p>
                <p>
                    <span className="detail">10k</span> likes
                </p>
            </div>
        </div>
    );
}

function Sidebar() {
    return (
        <div className="sidebar-content">
            <div id="current">
                <a href="reviews">reviews</a>
            </div>
        </div>
    );
}

function ProfileDetails() {
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
        <div className="profile-details">
            {!userProfile && <CircularProgress className="spinner" />}
            {userProfile ? (
                <div>
                    <div className="form-control-profile">
                        <label>Username </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={userProfile.username}
                            readOnly="readOnly"
                        />
                    </div>
                    <div className="form-control-profile">
                        <label>Email </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={userProfile.email}
                            readOnly="readOnly"
                        />
                    </div>
                    <div className="form-control-profile-bio">
                        <label>Bio </label>
                        <textarea
                            type="text"
                            name="bio"
                            id="bio"
                            value={userProfile.bio}
                            readOnly="readOnly"
                        />
                    </div>
                    <div className="changepw">
                        <a href="change-password">Change Password</a>
                    </div>
                </div>
            ) : (
                <h1>User not found</h1>
            )}
        </div>
    );
}

function Profile() {
    return (
        <div className="content">
            <NavLoggedIn />
            <span className="bigScreen-profile">
                <TopUser />
                <div className="line5" />
                <div className="r1">
                    <Sidebar />
                    <div className="line6" />
                    <ProfileDetails />
                </div>
            </span>
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Profile;
