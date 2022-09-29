import "./index.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api";

const EditProfile = data => {
  const { _id, username, email, bio, profileImage } = data;
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
    <div>
      {_id ? (
        <div className="edit-form">
          <div className="form-control-profile">
            <label>Username </label>
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
          <a className="edit-profile-done" onClick={editProfile}>DONE</a>
        </div>
      ) : (
        <h1>User Profile not found</h1>
      )}
    </div>
  )
}

export default EditProfile;