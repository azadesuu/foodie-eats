import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api";

const EditProfile = data => {
    const { _id, username, email, bio, profileImage } = data;
    // getting logged in user
    const [usernameEdit, setUsernameEdit] = useState(username);
    const [emailEdit, setEmailEdit] = useState(email);
    const [bioEdit, setBioEdit] = useState(bio);
    const [profileImageEdit, setProfileImageEdit] = useState(profileImage);

    const navigate = useNavigate();

    const editProfile = async e => {
        try {
            await updateUser({
                userId: _id,
                username: usernameEdit,
                email: emailEdit,
                bio: bioEdit,
                profileImage: profileImageEdit
            });
            console.log(
                JSON.stringify({
                    userId: _id,
                    username: usernameEdit,
                    email: emailEdit,
                    bio: bioEdit,
                    profileImage: profileImageEdit
                })
            );
            navigate("/logout"); //must logout and login to reset token (temp)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div>
                {_id ? (
                    <div className="form-group">
                        <input
                            type="text"
                            name="usernameEdit"
                            id="usernameEdit"
                            value={usernameEdit}
                            placeholder="usernameEdit"
                            onChange={event => {
                                setUsernameEdit(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="emailEdit"
                            id="emailEdit"
                            value={emailEdit}
                            placeholder="emailEdit"
                            onChange={event => {
                                setEmailEdit(event.target.value);
                            }}
                        />
                        <input
                            type="bioEdit"
                            name="bioEdit"
                            id="bioEdit"
                            value={bioEdit}
                            onChange={event => {
                                setBioEdit(event.target.value);
                            }}
                        />
                        <input
                            type="profileImageEdit"
                            name="profileImageEdit"
                            id="profileImageEdit"
                            value={profileImageEdit}
                            onChange={event => {
                                setProfileImageEdit(event.target.value);
                            }}
                        />
                        <button onClick={editProfile}>Update User</button>
                    </div>
                ) : (
                    <h1>User Profile not found</h1>
                )}
            </div>
        </>
    );
};
export default EditProfile;
