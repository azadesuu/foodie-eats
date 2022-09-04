import React from 'react'; // required
import './index.css';

import "@fontsource/martel-sans";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

// import { WebLogo } from '../../assets/images/foodie_eats_192x192.svg';
import { IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import WebLogo from './logo.svg';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';

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
        <div className='row'>
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
    </div>
  )
}

function ForgetPassword() {
  return(
    <div className='form-control'>
      <div className='forgetpw'>
        <a href="#">Forget Password</a>
      </div>
    </div>
  )
}

const theme = createTheme({
  palette: {
    background: {
      green: '#BEE5B0',
      grey: '#ECE7E5',
    },
    text: {
      main: '#000000', 
    },
    img: {
      main: '#000000',
    }
  },
});

function Nav() {
  // code partially adapted from https://mui.com/material-ui/react-app-bar/
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [checked] = React.useState(false);

  return (
    <div className='nav'>
      <span className='smallScreen'>
        <ThemeProvider theme={ theme }>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-around' }}>
            <AppBar position="fixed"
              sx={{ 
                bgcolor: 'background.green',
                borderRadius: 3,
                boxShadow: 7,
                top: 20,
                justifyContent: 'space-around',
                height: 100,
                left: 35,
                width: ['85%', '90%', '95%', '95%', '95%']
              }}>
              <Toolbar>
                <Grid container justifyContent="space-between">
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    {auth && (
                      <div>
                        <IconButton
                          edge="start"
                          color="img"
                          aria-label="menu"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"  
                          sx={{ mr: 2 }}
                          onClick={handleMenu}
                        >
                          <MenuIcon sx={{ fontSize:"40px" }} />
                        </IconButton>
                        <Collapse orientation="horizontal" in={checked}>
                          <Menu
                            className="menu-dropdwn"
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                              horizontal: 'left',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                width: "50%",
                                height: "100%",
                                backgroundColor: "#ECE7E5",
                                marginLeft: "-50px",
                                marginTop: "-16px",
                              }
                            }}
                          >
                            <div className="dropdwn-content">
                              <img src={ WebLogo } width="107px"/>
                              <div className="dropdwn-link">
                                <MenuItem onClick={handleClose}><a href="#">community</a></MenuItem>
                                <MenuItem onClick={handleClose}><a href="#">login</a></MenuItem>
                              </div>
                              <div className='dropdwn-back'>
                                <ArrowBackIosNewIcon 
                                  sx={{ 
                                    color: "white", 
                                    bgcolor: "#514F4E", 
                                    height: "61px",
                                    width: "17px",
                                    borderRadius: "10px 0px 0px 10px",
                                    }}/>
                              </div>
                            </div>
                          </Menu> 
                        </Collapse>
                      </div>
                    )}
                  </Box>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Link href='#' style={{ textDecoration: 'none' }}>
                      <Button color="text"
                        style={{ 
                          fontSize: '20px', 
                          textTransform: 'none', 
                          fontFamily: 'Martel Sans' }}
                        sx={{
                          borderBottom: 2, 
                          color: 'text.main', 
                          height: 100, 
                          alignItems: 'center', 
                          display: 'flex',
                        }}
                        onClick>
                          login
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
      </span>

      <span className='bigScreen'>
        <ThemeProvider theme={ theme }>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'space-around' }}>
            <AppBar position="fixed"
              sx={{ 
                bgcolor: 'background.green',
                borderRadius: 3,
                boxShadow: 7,
                top: 20,
                justifyContent: 'space-around',
                height: 100,
                left: 35,
                width: ['85%', '90%', '95%', '95%', '95%']
              }}>
              <Toolbar>
                <Link href='#' style={{ textDecoration: 'none' }}>
                  <Button color="inherit"><img src={ WebLogo } width="70px"/></Button>
                </Link>
                <Grid container justifyContent="space-between">
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Link href='#' style={{ textDecoration: 'none' }}>
                      <Button color="text" 
                        style={{ 
                          fontSize: '20px', 
                          textTransform: 'none', 
                          fontFamily: 'Martel Sans' }}
                        sx={{
                          "&:hover": {
                            borderBottom: 2, 
                            color: 'text.main', 
                            height: 100, 
                            alignItems: 'center', 
                            display: 'flex',
                          },
                        }}
                        onClick>
                          community
                      </Button>
                    </Link>
                  </Box>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <Link href='#' style={{ textDecoration: 'none' }}>
                      <Button color="text" 
                        style={{ 
                          fontSize: '20px', 
                          textTransform: 'none', 
                          fontFamily: 'Martel Sans' }}
                        sx={{
                          borderBottom: 2, 
                          color: 'text.main', 
                          height: 100, 
                          alignItems: 'center', 
                          display: 'flex',
                        }}
                        onClick>
                          login
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
      </span>
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