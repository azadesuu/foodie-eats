import React from "react"; // required
import "./LoggedInNavBar.css";

import "@fontsource/martel-sans";

import WebLogo from "../../assets/images/foodie_eats_192x192.svg";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Collapse from "@mui/material/Collapse";

const theme = createTheme({
    palette: {
        background: {
            green: "#BEE5B0",
            grey: "#ECE7E5"
        },
        text: {
            main: "#000000"
        },
        img: {
            main: "#000000"
        }
    }
});

function NavLoggedIn() {
    // code partially adapted from https://mui.com/material-ui/react-app-bar/
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [checked] = React.useState(false);
    
    return (
        <div className="nav">
            <span className="smallScreen-nav">
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex" },
                            justifyContent: "space-around"
                        }}
                    >
                        <AppBar
                            position="fixed"
                            sx={{
                                bgcolor: "background.green",
                                borderRadius: 3,
                                boxShadow: 7,
                                top: 20,
                                justifyContent: "space-around",
                                height: 100,
                                left: 35,
                                width: ["85%", "90%", "95%", "95%", "95%"]
                            }}
                        >
                            <Toolbar>
                                <Grid container justifyContent="space-between">
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex"
                                        }}
                                    >
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
                                                    <MenuIcon
                                                        sx={{
                                                            fontSize: "40px"
                                                        }}
                                                    />
                                                </IconButton>
                                                <Collapse
                                                    orientation="horizontal"
                                                    in={checked}
                                                >
                                                    <Menu
                                                        className="menu-dropdwn"
                                                        id="menu-appbar"
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left"
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            horizontal: "left"
                                                        }}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                        PaperProps={{
                                                            style: {
                                                                width: "50%",
                                                                height: "100%",
                                                                backgroundColor:
                                                                    "#ECE7E5",
                                                                marginLeft:
                                                                    "-50px",
                                                                marginTop:
                                                                    "-16px"
                                                            }
                                                        }}
                                                    >
                                                        <div className="dropdwn-content">
                                                            <img
                                                                src={WebLogo}
                                                                width="107px"
                                                            />
                                                            <div className="dropdown-r1">
                                                                <div className="dropdwn-link">
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="/home">
                                                                            community
                                                                        </a>
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="create-review">
                                                                            post a
                                                                            review
                                                                        </a>
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="my-reviews">
                                                                            my
                                                                            reviews
                                                                        </a>
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="my-bookmarks">
                                                                            my
                                                                            bookmarks
                                                                        </a>
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="my-profile">
                                                                            profile
                                                                        </a>
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="my-theme">
                                                                            theme
                                                                        </a>
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <a href="#">
                                                                            logout
                                                                        </a>
                                                                    </MenuItem>
                                                                </div>
                                                                <div className="dropdwn-back">
                                                                    <Button
                                                                        sx={{
                                                                            display: "contents"
                                                                        }}
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    >
                                                                        <ArrowBackIosNewIcon
                                                                            sx={{
                                                                                color:
                                                                                    "white",
                                                                                bgcolor:
                                                                                    "#514F4E",
                                                                                height:
                                                                                    "61px",
                                                                                width:
                                                                                    "17px",
                                                                                borderRadius:
                                                                                    "10px 0px 0px 10px"
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Menu>
                                                </Collapse>
                                            </div>
                                        )}
                                    </Box>
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex"
                                        }}
                                    >
                                        <IconButton href="my-profile">
                                            <AccountCircleIcon
                                                color="black"
                                                sx={{
                                                    fontSize: 50,
                                                    color: "black"
                                                }}
                                            />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </ThemeProvider>
            </span>

            <span className="bigScreen-nav">
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex" },
                            justifyContent: "space-around"
                        }}
                    >
                        <AppBar
                            position="fixed"
                            sx={{
                                bgcolor: "background.green",
                                borderRadius: 3,
                                boxShadow: 7,
                                top: 20,
                                justifyContent: "space-around",
                                height: 100,
                                left: 35,
                                width: ["85%", "90%", "95%", "95%", "95%"]
                            }}
                        >
                            <Toolbar>
                                <Button 
                                    href='/home' 
                                    color="inherit"
                                    sx={{
                                        "&:hover": {
                                            background: "transparent"
                                        }
                                    }}
                                >
                                    <img src={ WebLogo } width="70px"/>
                                </Button>
                                <Grid container justifyContent="space-between">
                                    <div className="nav1">
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <NavLink
                                                className="active-link"
                                                tag={Link}
                                                to="/home"
                                                style={
                                                    ({isActive}) => ({
                                                        fontSize: "20px",
                                                        color: "#000000",
                                                        fontFamily: "Martel Sans", 
                                                        height: isActive ? 100 : "",  
                                                        borderBottom: isActive ? "2px solid #000000" : "",
                                                        display: isActive ? "flex" :  "",
                                                        alignItems: isActive ? "center" : "",
                                                    })
                                                }
                                            >
                                                community
                                            </NavLink>
                                        </Box>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <NavLink
                                                className="active-link"
                                                tag={Link}
                                                to="/my-reviews"
                                                style={
                                                    ({isActive}) => ({
                                                        fontSize: "20px",
                                                        color: "#000000",
                                                        fontFamily: "Martel Sans", 
                                                        height: isActive ? 100 : "",  
                                                        borderBottom: isActive ? "2px solid #000000" : "",
                                                        display: isActive ? "flex" :  "",
                                                        alignItems: isActive ? "center" : "",
                                                    })
                                                }
                                            >
                                                my reviews
                                            </NavLink>
                                        </Box>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <NavLink
                                                className="active-link"
                                                tag={Link}
                                                to="/my-bookmarks"
                                                style={
                                                    ({isActive}) => ({
                                                        fontSize: "20px",
                                                        color: "#000000",
                                                        fontFamily: "Martel Sans", 
                                                        height: isActive ? 100 : "",  
                                                        borderBottom: isActive ? "2px solid #000000" : "",
                                                        display: isActive ? "flex" :  "",
                                                        alignItems: isActive ? "center" : "",
                                                    })
                                                }
                                            >
                                                my bookmarks
                                            </NavLink>
                                        </Box>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <NavLink
                                                className="active-link"
                                                tag={Link}
                                                to="/create-review"
                                                style={
                                                    ({isActive}) => ({
                                                        fontSize: "20px",
                                                        color: "#000000",
                                                        fontFamily: "Martel Sans", 
                                                        height: isActive ? 100 : "",  
                                                        borderBottom: isActive ? "2px solid #000000" : "",
                                                        display: isActive ? "flex" :  "",
                                                        alignItems: isActive ? "center" : "",
                                                    })
                                                }
                                            >
                                                post a review
                                            </NavLink>
                                        </Box>
                                    </div>
                                    
                                    <div className="nav2">
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex"
                                            }}
                                        >
                                            <NavLink
                                                className="active-link"
                                                tag={Link}
                                                to="#"
                                                style={{
                                                    fontSize: "20px",
                                                    color: "#000000",
                                                    fontFamily: "Martel Sans"
                                                }}
                                            >
                                                logout
                                            </NavLink>
                                        </Box>
                                        <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex"
                                        }}
                                        >
                                            <IconButton href="/my-profile">
                                                <AccountCircleIcon
                                                    color="black"
                                                    sx={{
                                                        fontSize: 50,
                                                        color: "black",
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>
                                    </div>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Box>
                </ThemeProvider>
            </span>
        </div>
    );
}

export default NavLoggedIn;
