import React from 'react'; // required
import './index.css';

import "@fontsource/martel-sans";

import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
                                    {/* <img src={ WebLogo } width="107px"/> */}
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
                        {/* <Button color="inherit"><img src={ WebLogo } width="70px"/></Button> */}
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