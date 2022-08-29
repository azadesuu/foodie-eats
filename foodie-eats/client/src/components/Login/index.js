import React from 'react'; // required
import './index.css';

import "@fontsource/martel-sans";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

import { WebLogo } from '../assets/images/foodie_eats_192x192.svg';
import { IconButton } from '@mui/material';

function Title() {
  return (
    <div>
      <h1>LOGIN</h1>
    </div>
  );
}

function UserName() {
  return (
    <div className='form-control'>
      <label>Username </label>
      <input 
        type="text" 
        placeholder="enter your username here" 
        name="username" 
        id="username" 
        // value="{{username}}" 
        required
      />
    </div>
  )
}

function PassWord() {
  return (
    <div id='form-control-pw'>
      <div className='form-control'>
        <label>Password</label>
        <input 
          type="password" 
          placeholder="enter your password here" 
          name="password" 
          id="password" 
          // value="{{username}}" 
          required
        />
        <IconButton>
          <LoginIcon sx= {{ color: 'black', fontSize: 35, display: 'inline' }}/>
        </IconButton>
      </div>
    </div>
  )
}

function ForgetPassword() {
  return(
    <div className='forgetpw'>
      <a href="#">Forget Password</a>
    </div>
  )
}

function Nav() {
  return (
    <div className='nav'>
      <span className='smallScreen'>
        <MenuIcon sx= {{ color:'white', fontSize: 36 }}/>
        <li className='dropdwn'>
        {/* <img src={ WebLogo }/> */}
        {/* <WebLogo /> */}
          <div className='dropdwn-content'>
            <a href='#'>community</a>
            <a href='#'>login</a>
          </div>
        </li>
      </span>
      {/* <a href='#'><span class="bigScreen"><img src={ WebLogo }/></span></a> */}
      <div className='navbar'>
        <li><span class="bigScreen"><a href="#">community</a></span></li>
        <li id='loginNav'><span class="bigScreen"><a className='loginLine' href="#">login</a></span></li>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className='content'>
      <Nav />
      <Title />
      <form action="#" method="post" class="form" id="form">
        <UserName />
        <PassWord />
        <ForgetPassword />
      </form>
      <div className='ORline'>
        <div className='line'></div>
        <p>OR</p>
        <div className='line'></div>
      </div>
      <a className='signup' href='#'>SIGN UP</a>
      <div className='footer'>
        <p>copyright © 2022 All-for-one</p>
      </div>
    </div>
  );
}

export default Login;