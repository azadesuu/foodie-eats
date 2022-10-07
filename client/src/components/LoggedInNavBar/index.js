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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { Drawer } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../actions/UserContext";
import { useContext } from "react";

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
    const [isOpen, setIsOpen] = React.useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    // remove token from the local storage
    function handleLogOut() {
        // remove token from the local storage
        localStorage.removeItem("token");
        setUser({});
        navigate("/login");
    }

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
                                        <IconButton
                                            edge="start"
                                            color="img"
                                            aria-label="menu"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            sx={{ mr: 2 }}
                                            onClick={() =>
                                                setIsOpen(!isOpen)    
                                            }
                                        >
                                            <MenuIcon
                                                sx={{
                                                    fontSize: "40px"
                                                }}
                                            />
                                        </IconButton>
                                        <Drawer
                                            anchor="left"
                                            open={isOpen}
                                            onClose={() => setIsOpen(!isOpen)}
                                        >
                                            <div className="content-MenuSideBar">
                                                <img
                                                    src={WebLogo}
                                                    width="107px"
                                                />
                                                <div className="MenuSideBar-r1">
                                                    <div className="MenuSideBar-c1">
                                                        <NavLink
                                                            tag={Link}
                                                            to="/home"
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "#000000",
                                                                fontFamily: "Martel Sans", 
                                                            }}
                                                        >
                                                            community
                                                        </NavLink>
                                                        <NavLink
                                                            to="/create-review"
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "#000000",
                                                                fontFamily: "Martel Sans", 
                                                            }}
                                                        >
                                                            post a review
                                                        </NavLink>
                                                        <NavLink
                                                            tag={Link}
                                                            to="/my-reviews"
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "#000000",
                                                                fontFamily: "Martel Sans", 
                                                            }}
                                                        >
                                                            my reviews
                                                        </NavLink>
                                                        <NavLink
                                                            tag={Link}
                                                            to="/my-bookmarks"
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "#000000",
                                                                fontFamily: "Martel Sans", 
                                                            }}
                                                        >
                                                            my bookmarks
                                                        </NavLink>
                                                        <NavLink
                                                            tag={Link}
                                                            to="/my-profile"
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "#000000",
                                                                fontFamily: "Martel Sans", 
                                                            }}
                                                        >
                                                            profile
                                                        </NavLink>
                                                        <NavLink
                                                            tag={Link}
                                                            to="/my-theme"
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "#000000",
                                                                fontFamily: "Martel Sans", 
                                                            }}
                                                        >
                                                            theme
                                                        </NavLink>
                                                        {user &&
                                                            <NavLink
                                                                tag={Link}
                                                                to="/login"
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "#000000",
                                                                    fontFamily: "Martel Sans", 
                                                                }}
                                                                onClick={handleLogOut}
                                                            >
                                                                logout
                                                            </NavLink>
                                                        }
                                                    </div>
                                                    <div className="MenuClose">
                                                        <Button
                                                            sx={{
                                                                display: "contents"
                                                            }}
                                                            onClick={() => {
                                                                setIsOpen(!isOpen)
                                                            }}
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
                                        </Drawer>
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
                                            {user &&
                                                <NavLink
                                                    className="active-link"
                                                    tag={Link}
                                                    to="/login"
                                                    style={{
                                                        fontSize: "20px",
                                                        color: "#000000",
                                                        fontFamily: "Martel Sans", 
                                                    }}
                                                    onClick={handleLogOut}
                                                >
                                                    logout
                                                </NavLink>
                                            }
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
