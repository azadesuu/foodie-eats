// import './App.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { navigate, useNavigate } from "react";
import { getProfile } from "../../api";
import { useQuery, useMutation } from "react-query";
import Axios from "axios";
import { CircularProgress } from "@mui/material";
import { usePreviousNonNullish } from "../../hooks";
import EditProfile from "../EditProfile";
function MyProfile() {
  // // getting logged in user
  const [user1, setUser1] = useContext(UserContext);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [profileImage, setProfileImage] = useState();
  const [userId, setUserId] = useState();
  console.log(user1);

  // useEffect(() => {
  //   if (user1 && !username) {
  //     initializeFields();
  //   }
  // }, [user1]);

  // const initializeFields = () => {
  //   setUsername(user1.username);
  //   setEmail(user1.email);
  //   setBio(user1.bio);
  //   setUserId(user1._id);
  //   setProfileImage(user1.profileImage);
  // };

  // const [editButton, setEditButton] = useState(false);

  // const updateUser = () => {
  //   setEditButton(!editButton);
  // };

  const userQueryProfile = useQuery("my-profile", () => getProfile(user1?._id));
  const { data: userProfile, isLoading } = userQueryProfile;

  if (userProfile) {
    setUsername(userProfile.username);
    setEmail(userProfile.email);
    setBio(userProfile.bio);
    setUserId(userProfile._id);
    setProfileImage(userProfile.profileImage);
  }

  return (
    <div>
      <button value={editButton} onClick={updateUser}>
        Edit
      </button>
      {!editButton ? (
        <div>
          {!userProfile && <CircularProgress className="spinner" />}
          {userProfile ? (
            <div>
              <div>{username}</div>
              <div>{email}</div>
              <div>{bio}</div>
              <div>{profileImage}</div>
            </div>
          ) : (
            <div>Error</div>
          )}
        </div>
      ) : (
        <>
          <EditProfile
            _id={userId}
            username={username}
            email={email}
            bio={bio}
            profileImage={profileImage}
          />
        </>
      )}
    </div>
  );
}
export default MyProfile;
