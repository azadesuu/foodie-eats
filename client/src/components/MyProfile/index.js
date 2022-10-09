import "./MyProfile.css";

import { useContext, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { CircularProgress } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import NavLoggedIn from "../LoggedInNavBar";
import EditProfile from "../EditProfile";

function TopUser(props) {
    const userProfile = props.user;

    return (
        <div className="top-user">
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
                <span className="bigScreen-MyProfile">
                    <h2>profile</h2>
                </span>
                <span className="smallScreen-MyProfile">
                    <div className="r2">
                        <h1>{userProfile.username}</h1>
                        <IconButton
                            value={editButton}
                            onClick={updateUser}
                            sx={{
                                "&:hover": {
                                    bgcolor: "#FFFEEC"
                                },
                                left: "30px",
                                bottom: "40px"
                            }}
                        >
                            <EditIcon
                                sx={{
                                    color: "black",
                                    fontSize: 40,
                                    "&:hover": {
                                        bgcolor: "#FFFEEC"
                                    }
                                }}
                            />
                        </IconButton>
                    </div>
                    <Avatar
                        alt="user-profile-image"
                        // src={user.profileImage}
                        sx={{
                            height: 110,
                            width: 110,
                            ml: "35px",
                            mt: "-40px"
                        }}
                    />
                </span>
                <span className="bigScreen-MyProfile">
                    <IconButton
                        value={editButton}
                        onClick={updateUser}
                        sx={{
                            "&:hover": {
                                bgcolor: "#FFFEEC"
                            },
                            bottom: "5px"
                        }}
                    >
                        <EditIcon
                            sx={{
                                color: "black",
                                fontSize: 30,
                                "&:hover": {
                                    bgcolor: "#FFFEEC"
                                }
                            }}
                        />
                    </IconButton>
                </span>
            </div>
            {!editButton ? (
                <div>
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
                            <span className="smallScreen-MyProfile">
                                <div className="viewallreviews">
                                    <a href="my-reviews">View all my reviews</a>
                                </div>
                            </span>
                            <div className="changepw">
                                <a href="change-password">Change Password</a>
                            </div>
                        </div>
                    ) : (
                        <div>Error</div>
                    )}
                </div>
            ) : (
                <EditProfile
                    _id={userProfile._id}
                    username={userProfile.username}
                    email={userProfile.email}
                    bio={userProfile.bio}
                    profileImage={userProfile.profileImage}
                />
            )}
        </div>
    );
}

function MyProfile() {
    const [user, setUser] = useContext(UserContext);

    return (
        <>
            {user ? (
                <div className="content-MyProfile">
                    <NavLoggedIn />
                    <span className="smallScreen-MyProfile">
                        <ProfileDetails user={user} />
                    </span>
                    <span className="bigScreen-MyProfile">
                        <TopUser user={user} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="r3">
                                <div className="line6" />
                                <ProfileDetails user={user} />
                            </div>
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
