import React from "react"; // required
import "./MyBookmarks.css";

import { useContext } from "react";
import { useQuery } from "react-query";
import { getBookmarks } from "../../api";
import { UserContext } from "../../actions/UserContext";

import "@fontsource/martel-sans";

import NavLoggedIn from "../LoggedInNavBar";
import ReviewPeek from "../ReviewPeek";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

function SearchBar() {
    const data = [
        { Name: "Calia", Author: "abcd123" },
        { Name: "David's Hotpot", Author: "xyz789" }
    ];
    return (
        <div className="searchbar">
            <div className="searchrow">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    id="search"
                    // value="{{search}}"
                    required
                />
                <FilterAltIcon />
            </div>
            <div className="searchResult"></div>
        </div>
    );
}

function Post() {
    return (
        <div className="postButton">
            <IconButton href="#">
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
        </div>
    );
}

function TopUser(props) {
    const userProfile = props.user;
    return (
        <div className="top-user">
            <div className="top-user-r1">
                {/* <Avatar
                    alt="user-profile-image"
                    src={userProfile.profileImage}
                    sx={{ height: 130, width: 130 }}
                /> */}
                <div className="top-user-info">
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p>
                    <span className="detail">7</span> reviews
                </p>
                <p>
                    <span className="detail">10k</span> likes
                </p>
            </div>
        </div>
    );
}

function Sidebar() {
    return (
        <div className="sidebar-content">
            <a href="my-profile">profile</a>
            <a href="my-reviews">reviews</a>
            <div id="current">
                <a href="my-bookmarks">bookmarks</a>
            </div>
            <a href="my-theme">theme</a>
        </div>
    );
}

function ReviewsSmallScreen(props) {
    const user = props.user;
    const listReviews = props.listReviews;

    return (
        <div className="reviews">
            <div className="reviews-content">
                <List
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        ml: "5px",
                        overflowX: "hidden",
                        overflowY: "auto",
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
                    {!user && <CircularProgress className="spinner" />}
                    {listReviews ? (
                        <div>
                            {listReviews.map(review => {
                                return <ReviewPeek reviewData={review} />;
                            })}
                        </div>
                    ) : (
                        <h2>Bookmarks not found</h2>
                    )}
                </List>
            </div>
        </div>
    );
}

function ReviewsBigScreen(props) {
    const user = props.user;
    const listReviews = props.listReviews;

    return (
        <div className="reviews">
            <div className="bookmarks-r1">
                <h2>bookmarks</h2>
                <SearchBar />
            </div>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: "440px",
                    padding: "1%",
                    width: "90%",
                    marginTop: "10px",
                    "&::-webkit-scrollbar": {
                        width: "0.3em"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#BEE5B0",
                        borderRadius: "10px"
                    }
                }}
            >
                {!user && <CircularProgress className="spinner" />}
                {listReviews ? (
                    <div>
                        <Grid 
                            container 
                            spacing={{ xs: 2, md: 3 }}
                        >
                            {listReviews.map(review => {
                                <Grid 
                                    item 
                                    xs={6} 
                                    key={review}
                                >
                                    <ReviewPeek reviewData={review} />;
                                </Grid>;
                            })}
                        </Grid>
                    </div>
                ) : (
                    <h2>Bookmarks not found</h2>
                )}
            </Box>
        </div>
    );
}

function MyBookmarks() {
    const user = useContext(UserContext);
    const { data: listReviews, isLoading } = useQuery(
        "bookmarks",
        () => getBookmarks(user?.bookmarks),
        { enabled: user?.bookmarks }
    );
    return (
        <>
            {user ? (
                <div className="content-MyBookmarks">
                    <NavLoggedIn />
                    <span className="smallScreen-MyBookmarks">
                        <h1>BOOKMARKS</h1>
                        <SearchBar />
                        <div className="line" />
                        {user?.bookmarks && !listReviews && !isLoading ? (
                            <CircularProgress className="spinner" />
                        ) : (
                            <ReviewsSmallScreen
                                user={user}
                                reviews={listReviews}
                            />
                        )}
                        <Post />
                    </span>
                    <span className="bigScreen-MyBookmarks">
                        <TopUser user={user} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                            <ReviewsBigScreen
                                user={user}
                                reviews={listReviews}
                            />

                        </div>
                    </span>
                    <div className="footer">
                        <p>Copyright © 2022 All-for-one</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default MyBookmarks;
