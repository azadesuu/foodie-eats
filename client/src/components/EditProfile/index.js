import "./EditProfile.css";
import { checkProfileFields } from "../../utils";
import { useState } from "react";
import { updateUser } from "../../api";
import Alert from "@mui/material/Alert";

const EditProfile = data => {
    const { _id, username, email, bio, navigation } = data;

    const [usernameEdit, setUsernameEdit] = useState(username);
    const [emailEdit, setEmailEdit] = useState(email);
    const [bioEdit, setBioEdit] = useState(bio);
    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [updateProfile, setUpdateProfile] = useState(false);
    const handleLogOut = async () => {
        // remove token from the local storage
        localStorage.removeItem("token");
        navigation("/login");
    };

    const editProfile = async e => {
        try {
            let usernameTransform = usernameEdit.trim().toLowerCase();
            let emailTransform = emailEdit.trim().toLowerCase();
            setUsernameEdit(usernameTransform);
            setEmailEdit(emailTransform);

            let data = {
                userId: _id,
                username: usernameTransform,
                email: emailTransform,
                bio: bioEdit
            };
            if (username === usernameTransform) {
                delete data["username"];
            }
            if (email === emailTransform) {
                delete data["email"];
            }
            if (bio === bioEdit) {
                delete data["bio"];
            }
            if (data["username"] === "" || data["email"] === "") {
                setUpdateProfile(!updateProfile);
                setAlertStatus("error");
                setAlertMessage("Username/Email cannot be empty.");
                setTimeout(function() {
                    setUpdateProfile(false);
                }, 5000);
            } else if (Object.keys(data).length === 1) {
                setUpdateProfile(!updateProfile);
                setAlertStatus("info");
                setAlertMessage("Nothing was updated.");
                setTimeout(function() {
                    setUpdateProfile(false);
                }, 5000);
            } else {
                if (!checkProfileFields(data)) return;
                const user = await updateUser(data);
                if (user) {
                    if (user.username === username && user.email === email) {
                        // if username and email are not changed
                        setUpdateProfile(!updateProfile);
                        setAlertStatus("success");
                        setAlertMessage("Successfully updated.");
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    } else {
                        setUpdateProfile(!updateProfile);
                        setAlertStatus("success");
                        setAlertMessage("Successfully updated, please re-enter your login credentials.");
                        setTimeout(function() {
                            setUpdateProfile(false);
                            handleLogOut(); //must logout and login to reset token
                            window.location.reload();
                        }, 5000);
                        
                    }
                } else {
                    setUpdateProfile(!updateProfile);
                    setAlertStatus("warning");
                    setAlertMessage("Username/Email is taken.");
                    setTimeout(function() {
                        setUpdateProfile(false);
                    }, 5000);
                }
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            {_id ? (
                <div className="edit-form">
                    <div className="form-control-profile">
                        <label>Username</label>
                        <input
                            type="text"
                            name="usernameEdit"
                            id="usernameEdit"
                            minLength={6}
                            maxLength={16}
                            value={usernameEdit}
                            placeholder="Edit your username here"
                            onChange={event => {
                                setUsernameEdit(event.target.value);
                            }}
                        />
                    </div>
                    <span className="helper-text">
                        Maximum of 16 characters
                    </span>
                    <div className="form-control-profile">
                        <label>Email </label>
                        <input
                            type="text"
                            name="emailEdit"
                            id="emailEdit"
                            value={emailEdit}
                            placeholder="Edit your email here"
                            onChange={event => {
                                setEmailEdit(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-control-profile-bio">
                        <label>Bio </label>
                        <textarea
                            type="text"
                            name="bioEdit"
                            id="bioEdit"
                            maxLength={100}
                            value={bioEdit}
                            placeholder="Edit your bio here"
                            onChange={event => {
                                setBioEdit(event.target.value);
                            }}
                        />
                        <span className="helper-text">
                            Maximum of 100 characters
                        </span>
                    </div>

                    <button
                        id="btn"
                        className="edit-profile-done"
                        onClick={editProfile}
                    >
                        DONE
                    </button>
                </div>
            ) : (
                <h1>User not found.</h1>
            )}
            {updateProfile ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "5px"
                    }}
                >
                    {alertMessage}
                </Alert>
            ) : (
                <></>
            )}
        </div>
    );
};

export default EditProfile;
