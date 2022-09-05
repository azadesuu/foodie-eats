import {useRef, useState, useEffect, useContext} from 'react';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import React from "react";
import { useHistory } from "react-router";
import { loginUser } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";



function Login() {
  
  // state hook functions   
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // component to Logout user
  function Logout() {
    
    // remove token from the local storage
    localStorage.removeItem('token');
    console.log("removed");

    // open the homepage --- example of how to redirect
    // another example
    // const state = { redirect: "/" };
    // return <Navigate to={state.redirect} />
    
  }
/*
  Generate a login form
*/

  // submit form
  function onSubmit() {
    try{
      console.log("test")
      // using API function to submit data to FoodBuddy API
      loginUser({
          username: username,
          password: password
      });
      // if token exists login is successful
      
      const token = localStorage.getItem("token");
      console.log(token)
      // token ? navigate("/") : navigate("/login");
      // document.location.reload();
    } catch (err) {
      console.log(err);
    }
      // redirect to homepage
      // const state = { redirect: "/" };
      // return <Navigate to={state.redirect} />
  }

  return (
      <div>
          <form>
              <input
                  type="text"
                  name="username"
                  id="username"                
                  value={username}
                  placeholder="username"  
                  onChange={event => {
                    setUsername(event.target.value);
                  }}                  
              />
              <input
                  type="password"
                  name="password"
                  id="password"                
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}                      
              />
              <input type="button" value="Login" onClick={onSubmit}/>
          </form>
          <button onClick={Logout}>Logout</button>
      </div>
      
  );
}

export default Login;
