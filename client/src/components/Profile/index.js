import "./Profile.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../../api";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

function TopUser(props) {
    const userProfile = props.user;
    return (
        <div className="top-user">
            <div>
                <div className="top-user-r1">
                    <Avatar
                        alt="user-profile-image"
                        // src={userProfile.profileImage}
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

function ProfileDetails(props) {
    const userProfile = props.user;
    return (
        <div className="profile-details">
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
        </div>
    );
}

function Profile() {
    //getting visited user
    const navigate = useNavigate();
    const { username } = useParams();

    const [user] = useContext(UserContext);
    const [loggedUsername, setloggedUsername] = useState("");
    useEffect(() => {
        setloggedUsername(user?.username);
        const isUser = username === loggedUsername;
        if (isUser) {
            navigate("/my-profile");
        }
    }, [user]);

    // if its the  logged in user, load the myprofile component
    const { data: userProfile, isLoading } = useQuery(
        "profile",
        () => getProfile(username),
        { enabled: !!username }
    );
    return (
        <div className="content-Profile">
            {isLoading && <CircularProgress className="spinner" />}
            {!isLoading && userProfile ? (
                <span className="bigScreen-Profile">
                    <TopUser user={userProfile} />
                    <div className="line5" />
                    <div className="r1">
                        <Sidebar />
                        <div className="line6" />
                        <ProfileDetails user={userProfile} />
                    </div>
                </span>
            ) : (
                <h1>User not found.</h1>
            )}
            <div className="footer">
                <p>Copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Profile;
