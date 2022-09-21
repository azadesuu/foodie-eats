
import './ChangePassword.css';
import { useState, useEffect} from "react"; 
import Axios from "axios";
import "@fontsource/martel-sans";
import MyProfile from '../MyProfile/MyProfile';
import { useNavigate } from 'react-router-dom';



function ChangePassword() {

  const navigate = useNavigate();

  const [UserInfo, setUserDetails] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const checkPassword = (_id, password, currentPassword, newPassword, confirmNewPassword) => {

    const strongPassword = new RegExp("(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");

    if (password !== currentPassword) {
      alert("Current Password is incorrect")
    } else if (!newPassword.match(strongPassword)) {
      alert("Must have min 8 characters, 1 alphabetical character and 1 numerical digit")
    } else if (newPassword != confirmNewPassword) {
      alert("Passwords do not match")
    } else {
      {/* Passwords seem fine */}
      Axios.put("http://localhost:5000/account/updatePassword", {_id: _id, password: newPassword})
      navigate("./../my-profile")
    }

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
        
            {/* choosing the header depending on if ur editing the profile or not */}
            <h1>CHANGE PASSWORD</h1>

            <form>
              {/* current password field */}
              <div className= 'details-container'>
                <label>Current Password</label>
                <input type="password"
                onChange = {(e) => {
                  setCurrentPassword(e.target.value)
                }}/>
              </div>
              
               {/* new password field */}
              <div className= 'details-container'>
                <label>New Password</label>
                <input type="password"
                onChange = {(e) => {
                  setNewPassword(e.target.value)
                }}/>
              </div>
              
              {/* coonfirm new password field */}
              <div className= 'details-container'>
                <label>Confirm New Password</label>
                <input type="password"
                onChange = {(e) => {
                  setConfirmNewPassword(e.target.value)
                }}/>
              </div>
              
            </form>

            <div className='button-group'> 
              <button className= "confirm" onClick={() => {
                checkPassword(user._id, user.password, currentPassword, newPassword, confirmNewPassword)
                }}>CONFIRM</button>
            </div>
            
          </div>
          
        );
      })}

    </div>
  );
}

export default ChangePassword;