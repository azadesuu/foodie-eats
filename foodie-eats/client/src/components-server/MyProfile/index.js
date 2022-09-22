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
  // console.log(user1);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [profileImage, setProfileImage] = useState();
  const [userId, setUserId] = useState();

  const [editButton, setEditButton] = useState(false);
  const updateUser = () => {
    setEditButton(!editButton);
  };

  const { data: userProfile, isLoading } = useQuery(
    "my-profile",
    () => getProfile(user1?.username),
    { enabled: !!user1?.username }
  );

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
              <div>{userProfile.username}</div>
              <div>{userProfile.email}</div>
              <div>{userProfile.bio}</div>
              <div>{userProfile.profileImage}</div>
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
    </div>
  );
}
export default MyProfile;
