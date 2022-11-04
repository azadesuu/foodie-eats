import "./EditProfile.css";

import { useState } from "react";
import { updateUser } from "../../api";
import { Navigate } from "react-router";

const EditProfile = data => {
    const { _id, username, email, bio, profileImage, navigation } = data;

    const [usernameEdit, setUsernameEdit] = useState(username);
    const [emailEdit, setEmailEdit] = useState(email);
    const [bioEdit, setBioEdit] = useState(bio);

    const handleLogOut = async () => {
        // remove token from the local storage
        localStorage.removeItem("token");
        navigation("/login");
    };

    const editProfile = async e => {
        try {
            const data = {
                userId: _id,
                username: usernameEdit,
                email: emailEdit,
                bio: bioEdit
            };
            if (username === usernameEdit) {
                delete data["username"];
            }
            if (email === emailEdit) {
                delete data["email"];
            }
            if (bio === bioEdit) {
                delete data["bio"];
            }
            if (Object.keys(data).length == 1) {
                alert("Nothing was updated.");
            } else {
                const user = await updateUser(data);
                if (user) {
                    if (user.username === username && user.email === email) {
                        // if username and email are not changed
                        console.log("Successfully updated.");
                    } else {
                        alert(
                            "Successfully updated, please re-enter your login credentials."
                        );
                        await handleLogOut(); //must logout and login to reset token (temp)
                    }
                } else {
                    alert("Username/Email is taken.");
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
                            value={usernameEdit}
                            placeholder="Edit your username here"
                            onChange={event => {
                                setUsernameEdit(event.target.value);
                            }}
                        />
                    </div>
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
                            value={bioEdit}
                            placeholder="Edit your bio here"
                            onChange={event => {
                                setBioEdit(event.target.value);
                            }}
                        />
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
        </div>
    );
};

export default EditProfile;
