
import './MyProfile.css';
import { useState, useEffect} from "react"; 
import Axios from "axios";
import "@fontsource/martel-sans";

import editImg from './edit_button.png'
import profilePic from './../../assets/profile_pic.jpg'
import { useNavigate } from 'react-router-dom';

function MyProfile() {

  const navigate = useNavigate();

  const [UserInfo, setUserDetails] = useState([]);

  const [editButton,setEditButton] = useState(true);
  
  const [doneButton, setDoneButton] = useState(false);

  const [title, setTitle] = useState("Profile");
  
  const updateUser = (_id, username, email, bio) => {
    Axios.put("http://localhost:5000/account/updateUser", {_id: _id, username: username, email: email, bio: bio})
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/account/getUsers").then((response) => {
      setUserDetails(response.data)
    });
  }, []);
  
  return (
    <div className="profile-info">
      {UserInfo.map((user) => {
        return (
          <div className="user-container">
            

            {editButton && <button className = "button-edit" onClick={() => {
            setEditButton(!editButton)
            setTitle("EDIT PROFILE")
            setDoneButton(!doneButton)
            }}><img src={editImg} width="30px" height="27px"/></button> }

            {/* choosing the header depending on if ur editing the profile or not */}
            {editButton && <h1>{user.username}</h1>}
            {!editButton && <h1>{title}</h1>}

            <div className= 'profilePicContainer'>
              <img className = "profilePic" src={profilePic}/>
              {!editButton && <button className='profilePicButton'>Change</button>}
            </div>

            <form>
              {/* user name field */}
              <div className= 'details-container'>
              <label>Username</label>
              <input type="text" value={user.username} disabled={editButton} 
              onChange = {(e) => {
                setUserDetails((prevDetails) => ([{
                  _id: user._id, email: user.email, bio: user.bio, username: e.target.value,
                }]));
              }}/>
              </div>
              
               {/* email field */}
              <div className= 'details-container'>
                <label>Email</label>
                <input type="text" value={user.email} disabled={editButton} 
                onChange = {(e) => {
                  setUserDetails((prevDetails) => ([{
                    _id: user._id, username: user.username, bio: user.bio, email: e.target.value,
                  }]));
                }}/>
              </div>

              {/* bio field */}
              <div className= 'details-container'>
                <label>Bio</label>
                <textarea type="text" value={user.bio} disabled={editButton} 
                onChange = {(e) => {
                  setUserDetails((prevDetails) => ([{
                    _id: user._id, username: user.username, email: user.email, bio: e.target.value,
                  }]));
                }}/>
              </div>
              
            </form>

            <div className='button-group'> 
              {doneButton && <button className= "done-edit" onClick={() => {
                setEditButton(!editButton)
                setDoneButton(!doneButton)
                updateUser(user._id, user.username, user.email, user.bio)
                }}>DONE</button>}
            </div>
            
             {editButton && <div className='link-group'> 
                <button className = "changePasswordButton" onClick={() => {
                  navigate("./../ChangePassword")
                }}>Change Password</button>
            </div>}

          </div>
          
        );
      })}

    </div>
  );
}

export default MyProfile;