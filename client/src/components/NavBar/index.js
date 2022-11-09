import React from "react";

import "./NavBar.css";

import "@fontsource/martel-sans";

import WebLogo from "../../assets/images/foodie_eats_192x192.svg";

import MenuIcon from "@mui/icons-material/Menu";
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
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

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

function MenuSideBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <>
            <IconButton
                edge="start"
                color="img"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{ mr: 2 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon
                    id="hamburger-menu"
                    sx={{
                        fontSize: "40px"
                    }}
                />
            </IconButton>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
            >
                <div className="content-MenuSideBar">
                    <img src={WebLogo} width="107px" alt="web logo" />
                    <div className="MenuSideBar-r1">
                        <div className="MenuSideBar-c1">
                            <NavLink
                                tag={Link}
                                to="/home"
                                style={{
                                    fontSize: "20px",
                                    color: "#000000",
                                    fontFamily: "Martel Sans"
                                }}
                            >
                                community
                            </NavLink>
                            <NavLink
                                to="/login"
                                style={{
                                    fontSize: "20px",
                                    color: "#000000",
                                    fontFamily: "Martel Sans"
                                }}
                            >
                                login
                            </NavLink>
                        </div>
                        <div className="MenuClose">
                            <Button
                                sx={{
                                    display: "contents"
                                }}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                }}
                            >
                                <ArrowBackIosNewIcon
                                    sx={{
                                        color: "white",
                                        bgcolor: "#514F4E",
                                        height: "61px",
                                        width: "17px",
                                        borderRadius: "10px 0px 0px 10px"
                                    }}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </SwipeableDrawer>
        </>
    );
}

function NavPublic() {
    document.documentElement.className = "honeydew";
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
                                        <MenuSideBar />
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
                                            to="/login"
                                            style={({ isActive }) => ({
                                                fontSize: "20px",
                                                fontFamily: "Martel Sans",
                                                height: isActive ? 100 : "",
                                                borderBottom: isActive
                                                    ? "2px solid #000000"
                                                    : "",
                                                display: isActive ? "flex" : "",
                                                alignItems: isActive
                                                    ? "center"
                                                    : ""
                                            })}
                                        >
                                            login
                                        </NavLink>
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
                                    href="/home"
                                    color="inherit"
                                    sx={{
                                        "&:hover": {
                                            background: "transparent"
                                        }
                                    }}
                                >
                                    <img
                                        src={WebLogo}
                                        width="70px"
                                        alt="web logo"
                                    />
                                </Button>
                                <Grid container justifyContent="space-between">
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
                                            style={({ isActive }) => ({
                                                fontSize: "20px",
                                                color: "#000000",
                                                fontFamily: "Martel Sans",
                                                height: isActive ? 100 : "",
                                                borderBottom: isActive
                                                    ? "2px solid #000000"
                                                    : "",
                                                display: isActive ? "flex" : "",
                                                alignItems: isActive
                                                    ? "center"
                                                    : ""
                                            })}
                                        >
                                            community
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
                                            to="/login"
                                            style={({ isActive }) => ({
                                                fontSize: "20px",
                                                color: "#000000",
                                                fontFamily: "Martel Sans",
                                                height: isActive ? 100 : "",
                                                borderBottom: isActive
                                                    ? "2px solid #000000"
                                                    : "",
                                                display: isActive ? "flex" : "",
                                                alignItems: isActive
                                                    ? "center"
                                                    : ""
                                            })}
                                        >
                                            login
                                        </NavLink>
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

export default NavPublic;