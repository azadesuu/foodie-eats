// import './App.css';
import { useState, useEffect} from "react"; 
import Axios from "axios";


function MyProfile() {

  const [UserInfo, setUserDetails] = useState([]);

  const [editButton,setEditButton] = useState(true);

  const [title, setTitle] = useState("Profile");
  
  const updateUser = (_id, username, email) => {
    Axios.put("http://localhost:5000/account/updateUser", {_id: _id, username: username, email: email})
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/account/getUsers").then((response) => {
      setUserDetails(response.data)
    });
  }, []);
  
  return (
    <div className="UserInfo">
      <button className="text-end" onClick={() => {
        setEditButton(!editButton)
        setTitle("EDIT PROFILE")
      }}> Edit </button>

      <h1>{title}</h1>

      {UserInfo.map((user) => {
        return (
          <div className="form-group">
            <h6>Username</h6>
            <input type="text" value={user.username} disabled={editButton} 
            onChange = {(e) => {
              setUserDetails((prevDetails) => ([{
                _id: user._id, email: user.email, username: e.target.value,
              }]));
            }}/>

            <h6>Email</h6>
            <input type="text" value={user.email} disabled={editButton} 
            onChange = {(e) => {
              setUserDetails((prevDetails) => ([{
                _id: user._id, username: user.username, email: e.target.value,
              }]));
            }}/>
            <button onClick={() => {
            
              updateUser(user._id, user.username, user.email)
            }}>Update Profile</button>
          </div>
        );
        
      })}
    </div>
  );
}

export default MyProfile;