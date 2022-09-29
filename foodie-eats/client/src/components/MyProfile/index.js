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

function TopUser(props) {
    const userProfile = props.user;

    return (
        <div className="top-user">
            <div className="top-user-r1">
                {/* <Avatar
                    alt="user-profile-image"
                    src={userProfile.profileImage}
                    sx={{ height: 130, width: 130 }}
                /> */}
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
                <a href="my-profile">profile</a>
            </div>
            <a href="my-reviews">reviews</a>
            <a href="my-bookmarks">bookmarks</a>
            <a href="my-theme">theme</a>
        </div>
    );
}

function ProfileDetails(props) {
    const userProfile = props.user;

    const [editButton, setEditButton] = useState(false);
    const updateUser = () => {
        setEditButton(!editButton);
    };

    return (
        <div className="profile-details">
            <div className="profile-title">
                <h2>profile</h2>
                <IconButton
                    value={editButton}
                    onClick={updateUser}
                    sx={{
                        "&:hover": {
                            bgcolor: "#FFFEEC"
                        }
                    }}
                >
                    <EditIcon
                        sx={{
                            color: "black",
                            fontSize: 30,
                            marginTop: "15px",
                            "&:hover": {
                                bgcolor: "#FFFEEC"
                            }
                        }}
                    />
                </IconButton>
            </div>
            {!editButton ? (
                <div>
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
                        <div>Error</div>
                    )}
                </div>
            ) : (
                <>
                    <EditProfile
                        _id={userProfile._id}
                        username={userProfile.username}
                        email={userProfile.email}
                        bio={userProfile.bio}
                        profileImage={userProfile.profileImage}
                    />
                </>
            )}
            {/* <ChangePassword  /> */}
        </div>
    );
}

function MyProfile() {
    const [user, setUser] = useContext(UserContext);
    return (
        <>
            {user ? (
                <div className="content">
                    <NavLoggedIn />
                    <span className="bigScreen-profile">
                        <TopUser user={user} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                            <ProfileDetails user={user} />
                        </div>
                    </span>
                    <div className="footer">
                        <p>Copyright © 2022 All-for-one</p>
                    </div>
                </div>
            ) : (
                <CircularProgress className="spinner" />
            )}
        </>
    );
}

export default MyProfile;
