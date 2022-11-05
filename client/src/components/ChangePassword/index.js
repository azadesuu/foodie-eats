import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";

import "./ChangePassword.css";
import TopUser from "../TopUser";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { updatePassword, getProfile, getMyReviews } from "../../api";
import { CircularProgress } from "@mui/material";

import "@fontsource/martel-sans";

// one lowercase and uppercase alphabet, one number
const strongPassword = new RegExp(
    "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$"
);

function ChangePwDetails(props) {
    const userProfile = props.user;
    const isLoading = props.isLoading;
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const checkPassword = async (
        _id,
        oldPassword,
        newPassword,
        confirmNewPassword
    ) => {
        if (!newPassword.match(strongPassword)) {
            alert(
                "Must have min 8 characters, 1 alphabetical character and 1 numerical digit"
            );
        } else if (newPassword != confirmNewPassword) {
            alert("New passwords does not match");
        } else {
            // passwords seems fine
            const updatedUser = await updatePassword({
                _id: _id,
                password: newPassword,
                oldPassword: oldPassword
            });
            if (!updatedUser)
                alert("Current password was incorrect, change unsuccessful.");
            else {
                alert("password changed.");
                navigate("/my-profile");
            }
        }
    };
    return (
        <div className="changepw-details">
            <span className="bigScreen-ChangePassword">
                <h2>change password</h2>
            </span>
            <span className="smallScreen-ChangePassword">
                <h1>CHANGE PASSWORD</h1>
            </span>
            {isLoading && <CircularProgress class="spinner" />}
            {!isLoading && userProfile ? (
                <div className="user-container">
                    <form>
                        
                        {/* current password field */}
                        <div className="details-container">
                            <label>current password</label>
                            <input
                                type="password"
                                onChange={e => {
                                    setCurrentPassword(e.target.value);
                                }}
                            />
                        </div>
                        <span className="helper-text-pw">
                            at least 1 lowercase, 1 uppercase letter, and 1 number
                        </span>
                        {/* new password field */}
                        <div className="details-container">
                            <label>new password</label>
                            <input
                                type="password"
                                onChange={e => {
                                    setNewPassword(e.target.value);
                                }}
                            />
                        </div>
                        
                        {/* confirm new password field */}
                        <div className="details-container">
                            <label>confirm new password</label>
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
                            id="btn"
                            className="confirm"
                            onClick={() => {
                                checkPassword(
                                    userProfile?._id,
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
    const [user] = useContext(UserContext);
    const { data: userProfile, isLoading } = useQuery(
        "my-profile",
        () => getProfile(user?.username),
        { enabled: !!user }
    );

    return (
        <>
            <SEO data={allSEO.changepassword} />
            {user && userProfile ? (
                <div className="content-ChangePassword">
                    <span className="smallScreen-ChangePassword">
                        <ChangePwDetails isLoading={isLoading} user={user} />
                    </span>
                    <span className="bigScreen-ChangePassword">
                        <TopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                            <ChangePwDetails
                                isLoading={isLoading}
                                user={userProfile}
                            />
                        </div>
                    </span>
                </div>
            ) : (
                <CircularProgress className="spinner" />
            )}
        </>
    );
}

export default ChangePassword;
