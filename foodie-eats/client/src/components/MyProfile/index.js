import "./index.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { navigate, useNavigate } from "react";
import { getProfile } from "../../api";
import { useQuery, useMutation } from "react-query";
import Axios from "axios";
import { CircularProgress } from "@mui/material";
import { usePreviousNonNullish } from "../../hooks";

import EditIcon from '@mui/icons-material/Edit';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import NavLoggedIn from "../LoggedInNavBar";
import EditProfile from "../EditProfile";

function TopUser() {
  return (
    <div className="top-user">
      <div className="top-user-r1">
        <Avatar alt="user1" src="" sx={{ height: 130, width: 130 }}/>
        <div className="top-user-info">
          <h2>abcd123</h2>
          <p>Hi! I am abcd. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div className="top-user-rev">
        <p><span className="detail">7</span> reviews</p>
        <p><span className="detail">10k</span> likes</p>
      </div>
    </div>
  )
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
  )
}

function ProfileDetails() {
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
    <div className="profile-details">
      <div className="profile-title">
        <h2>profile</h2>
        <IconButton value={editButton} onClick={updateUser}
          sx={{
            "&:hover": {
              bgcolor: '#FFFEEC',
            }
          }}>
          <EditIcon sx={{ 
            color: 'black', 
            fontSize: 30, 
            marginTop: '15px',
            "&:hover": {
              bgcolor: '#FFFEEC',
            }
          }}/>
        </IconButton>
      </div>
      <div className="form-control-profile">
        <label>Username </label>
        <input
          type="text"
          name="username"
          id="username"
          value="abcd123"
          readOnly="readOnly"
        />
      </div>
      <div className="form-control-profile">
        <label>Email </label>
        <input
          type="text"
          name="email"
          id="email"
          value="abcd123@gmail.com"
          readOnly="readOnly"
        />
      </div>
      <div className="form-control-profile-bio">
        <label>Bio </label>
        <textarea
          type="text"
          name="bio"
          id="bio"
          value="Hi! I am abcd. Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          readOnly="readOnly"
        />
      </div>
      <a className="changepw" href="#">Change Password</a>
    </div>
  )
}

function MyProfile() {
  return (
    <div className="content">
      <NavLoggedIn />
      <span className="bigScreen-profile">
        <TopUser />
        <div className="line5" />
        <div className="r1">
          <Sidebar />
          <div className="line6" />
          <ProfileDetails />
        </div>
      </span>
      <div className="footer">
          <p>copyright © 2022 All-for-one</p>
      </div>
    </div>
  );
}

export default MyProfile;