import "./index.css";
import { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { updatePassword, getProfile } from "../../api";
import { CircularProgress } from "@mui/material";

import "@fontsource/martel-sans";

function ChangePassword() {
    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    const { data: userProfile, isLoading } = useQuery(
        "my-profile",
        () => getProfile(user?.username),
        { enabled: !!user?.username }
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
        <div className="profile-info">
            {isLoading && !userProfile && (
                <CircularProgress className="spinner" />
            )}
            {userProfile ? (
                <div className="user-container">
                    {/* choosing the header depending on if ur editing the profile or not */}
                    <h1>CHANGE PASSWORD</h1>

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

                        {/* coonfirm new password field */}
                        <div className="details-container">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                onChange={e => {
                                    setConfirmNewPassword(e.target.value);
                                }}
                            />
                        </div>
                    </form>

                    <div className="button-group">
                        <button
                            className="confirm"
                            onClick={() => {
                                checkPassword(
                                    user?._id,
                                    user?.password,
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
            ) : (
                <h1>No user found</h1>
            )}
        </div>
    );
}

export default ChangePassword;
