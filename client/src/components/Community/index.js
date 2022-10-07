import "./Community.css";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { getCommunityRecent, getCommunityMostLiked } from "../../api";

import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import PostAddIcon from "@mui/icons-material/PostAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import ReviewPeek from "../ReviewPeek";

import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
const theme = createTheme({
    palette: {
        background: {
            green: "#BEE5B0",
            grey: "#ECE7E5",
            white: "#FFFCFB"
        },
        text: {
            main: "#000000"
        },
        img: {
            main: "#000000"
        }
    }
});

function SearchBar() {
    const [query, setQuery] = useState("");

    return (
        <div className="searchbar">
            <div className="searchrow">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    id="search"
                    required
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                />
                <FilterAltIcon />
            </div>
            <div className="searchResult">
                
            </div>
        </div>
    );
}

function Post() {
    return (
        <div className="postButton">
            <span className="smallScreen-Community">
                <IconButton href="create-review">
                    <PostAddIcon
                        sx={{
                            bgcolor: "#BEE5B0",
                            color: "white",
                            borderRadius: "30px",
                            fontSize: 50,
                            position: "fixed",
                            bottom: "40px",
                            padding: "2px"
                        }}
                    />
                </IconButton>
            </span>
        </div>
    );
}

function Community() {
    const [location, setLocation] = useState(3000);
    // need to post postcode
    const { data: listReviewsRecent, isLoading } = useQuery(
        "listReviewsRecent",
        () => getCommunityRecent()
    );
    const { data: listLikes, isLoading2 } = useQuery(
        "listOfReviewsByLikes",
        () => getCommunityMostLiked()
    );

    return (
        <div className="content-Community">
            <span className="bigScreen-Community">
                {/* <Location /> */}
                <div className="location">
                    <LocationOnIcon 
                        sx={{
                            fontSize: "35px"
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Enter postcode here"
                        name="location"
                        id="location"
                        value={location}
                        maxLength="4"
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        onKeyPress={event => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        required
                    />
                </div>
            </span>
            <h1>COMMUNITY</h1>
            <span className="smallScreen-Community">
                {/* <Location /> */}
                <div className="location">
                    <LocationOnIcon 
                        sx={{
                            fontSize: "35px"
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Enter postcode here"
                        name="location"
                        id="location"
                        value={location}
                        maxLength="4"
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        onKeyPress={event => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        required
                    />
                </div>
            </span>
            <SearchBar />
            <div className="line4" />
            {isLoading2 && <CircularProgress className="spinner" />}
            {listLikes ? (
                <div className="toprecom">
                    <h2>TOP RECOMMENDATIONS</h2>
                    <span className="smallScreen-Community">
                        <div className="toprecom-content">
                            <List
                                sx={{
                                    width: "100%",
                                    justifyContent: "center",
                                    ml: "5px",
                                    overflowY: "auto",
                                    maxHeight: "300px",
                                    flexDirection: "column",
                                    "&::-webkit-scrollbar": {
                                        width: "0.3em"
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#FFFEEC",
                                        borderRadius: "10px",
                                        maxHeight: "4px"
                                    }
                                }}
                            >
                                {/* review parameter contains the whole review document */}
                                {listLikes
                                    .filter((review) => 
                                    review.address.postcode === location
                                    ).slice(0, 9).map(review => {
                                        return (
                                            <div>
                                                <ReviewPeek reviewData={review} />
                                                <div className="line3"></div>
                                            </div>
                                        );
                                })}
                            </List>
                        </div>
                    </span>
                    <span className="bigScreen-Community">
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: "auto",
                                maxHeight: "300px",
                                padding: "1%",
                                "&::-webkit-scrollbar": {
                                    width: "0.3em"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "#BEE5B0",
                                    borderRadius: "10px"
                                }
                            }}
                        >
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                {listLikes
                                    .filter((review) => 
                                    review.address.postcode === location
                                    ).slice(0, 9).map(review => (
                                        <Grid item xs={4} key={review}>
                                            <ReviewPeek reviewData={review} />
                                        </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </span>
                </div>
            ) : (
                // If the info can't be loaded, then display a message
                !isLoading2 && <h2>Found no orders</h2>
            )}
            <div className="line4" />
            {isLoading && <CircularProgress className="spinner" />}
            {listReviewsRecent ? (
                <div className="recent">
                    <h2>RECENT</h2>
                    <span className="smallScreen-Community">
                        <div className="recent-content">
                            <List
                                sx={{
                                    width: "100%",
                                    justifyContent: "center",
                                    ml: "5px",
                                    overflowY: "auto",
                                    maxHeight: "300px",
                                    flexDirection: "column",
                                    "&::-webkit-scrollbar": {
                                        width: "0.3em"
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#FFFEEC",
                                        borderRadius: "10px",
                                        maxHeight: "4px"
                                    }
                                }}
                            >
                                {/* review parameter contains the whole review document */}
                                {listReviewsRecent
                                    .filter((review) => 
                                    review.address.postcode === location
                                    ).map(review => {
                                        return (
                                            <div>
                                                <ReviewPeek reviewData={review} />
                                                <div className="line3"></div>
                                            </div>
                                        );
                                })}
                            </List>
                        </div>
                    </span>
                    <span className="bigScreen-Community">
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflowY: "auto",
                                padding: "1%",
                                "&::-webkit-scrollbar": {
                                    width: "0.3em"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "#BEE5B0",
                                    borderRadius: "10px"
                                }
                            }}
                        >
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                {listReviewsRecent
                                    .filter((review) => 
                                    review.address.postcode === location
                                    ).map(review => (
                                        <Grid item xs={4} key={review}>
                                            <ReviewPeek reviewData={review} />
                                        </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </span>
                </div>
            ) : (
                // If the info can't be loaded, then display a message
                !isLoading && <h2>Found no orders</h2>
            )}
            {/* if logged in */}
            <Post />
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Community;
