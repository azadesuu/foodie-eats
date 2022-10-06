import "./ChangePassword.css";
import NavLoggedIn from "../LoggedInNavBar";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { updatePassword, getProfile } from "../../api";
import { CircularProgress } from "@mui/material";

import "@fontsource/martel-sans";

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

function ChangePassword() {
    const navigate = useNavigate();

    const [user] = useContext(UserContext);
    const { data: userProfile, isLoading } = useQuery(
        "my-profile",
        () => getProfile(user?.username),
        { enabled: !!user }
    );
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const checkPassword = async (
        _id,
        password,
        currentPassword,
        newPassword,
        confirmNewPassword
    ) => {
        const strongPassword = new RegExp("(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");

        if (password !== currentPassword) {
            alert("Current Password is incorrect");
        } else if (!newPassword.match(strongPassword)) {
            alert(
                "Must have min 8 characters, 1 alphabetical character and 1 numerical digit"
            );
        } else if (newPassword != confirmNewPassword) {
            alert("Passwords do not match");
        } else {
            {
                /* Passwords seem fine */
            }
            const updatedUser = await updatePassword({
                _id: _id,
                password: newPassword
            });
            if (!updatedUser) alert("password was not changed.");
            else {
                alert("password changed.");
                navigate("/my-profile");
            }
        }
    };
    return (
        <div className="content-ChangePassword">
            <NavLoggedIn />
            {isLoading && !userProfile && (
                <CircularProgress className="spinner" />
            )}
            {userProfile ? (
                <>
                    <span className="smallScreen-ChangePassword">
                        <h1>CHANGE PASSWORD</h1>

                        <div className="user-container">
                            <form>
                                {/* current password field */}
                                <div className="details-container">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        onChange={e => {
                                            setCurrentPassword(e.target.value);
                                        }}
                                    />
                                </div>

                                {/* new password field */}
                                <div className="details-container">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        onChange={e => {
                                            setNewPassword(e.target.value);
                                        }}
                                    />
                                </div>

                                {/* confirm new password field */}
                                <div className="details-container">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        onChange={e => {
                                            setConfirmNewPassword(
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>
                            </form>

                            <div className="button-group">
                                <button
                                    className="confirm"
                                    onClick={() => {
                                        checkPassword(
                                            userProfile?._id,
                                            userProfile?.password,
                                            currentPassword,
                                            newPassword,
                                            confirmNewPassword
                                        );
                                    }}
                                >
                                    CONFIRM
                                </button>
                            </div>
                        </div>
                    </span>
                    <span className="bigScreen-ChangePassword">
                        <TopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                        </div>
                    </span>
                </>
            ) : (
                <h1>No user found</h1>
            )}
        </div>
    );
}

export default ChangePassword;
