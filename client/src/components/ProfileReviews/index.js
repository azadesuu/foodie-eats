import React from "react";
import "./ProfileReviews.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { getOtherReviews } from "../../api";
import { useQuery } from "react-query";
import { getProfile } from "../../api";

import "@fontsource/martel-sans";

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

function Post() {
    return (
        <div className="postButton">
            <span className="smallScreen">
                <IconButton href="/create-review">
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

function TopUser(props) {
    const userProfile = props.user;
    return (
        <div className="top-user">
            <div className="top-user-r1">
                <Avatar
                    alt="user-profile-image"
                    // src={userProfile.profileImage}
                    sx={{ height: 130, width: 130 }}
                />
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

function Sidebar(props) {
    const userProfile = props.user;
    const navigate = useNavigate();

    return (
        <div className="sidebar-content">
            <div id="current">
                <a
                    onClick={() => {
                        navigate(`/profile/${userProfile.username}/reviews`);
                    }}
                >
                    reviews
                </a>
            </div>
        </div>
    );
}

function ReviewsSmallScreen(props) {
    const user = props.user;
    const { data: listReviews, isLoading } = useQuery("reviews", () =>
        getOtherReviews(user?._id)
    );
    const [input, setInput] = useState("");

    return (
        <div>
            <div className="searchbar">
                <div className="searchrow">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search"
                        name="search"
                        id="search"
                        onChange={e => setInput(e.target.value)}
                    />
                    <FilterAltIcon />
                </div>
            </div>
            <div className="reviews">
                <div className="reviews-content">
                    <List
                        id="myreviews-small"
                        sx={{
                            width: "100%",
                            justifyContent: "center",
                            ml: "5px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            flexDirection: "column",
                            "&::-webkit-scrollbar": {
                                width: "0.3em"
                            },
                            "&::-webkit-scrollbar-thumb": {
                                borderRadius: "10px",
                                maxHeight: "4px"
                            }
                        }}
                    >
                        {isLoading && <CircularProgress className="spinner" />}
                        {listReviews ? (
                            <div>
                                {listReviews.length > 0 ? (
                                    <div>
                                        {listReviews
                                            .filter(review => {
                                                const searchInput = input.toLowerCase();
                                                const resName = review.restaurantName.toLowerCase();

                                                return resName.startsWith(
                                                    searchInput
                                                );
                                            })
                                            .map(review => {
                                                return (
                                                    <ReviewPeek
                                                        reviewData={review}
                                                    />
                                                );
                                            })}
                                    </div>
                                ) : (
                                    // If the info can't be loaded, then display a message
                                    <h2>User has not posted</h2>
                                )}
                            </div>
                        ) : (
                            <h2>Found no reviews</h2>
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
}

function ReviewsBigScreen(props) {
    const user = props.user;
    const { data: listReviews, isLoading } = useQuery(
        "reviews",
        () => getOtherReviews(user?._id),
        { enabled: !!user }
    );
    const [input, setInput] = useState("");

    return (
        <div className="reviews">
            <div className="reviews-r1">
                <h2>reviews</h2>
                <div className="searchbar">
                    <div className="searchrow">
                        <SearchIcon />
                        <input
                            type="text"
                            placeholder="Search"
                            name="search"
                            id="search"
                            onChange={e => setInput(e.target.value)}
                        />
                        <FilterAltIcon />
                    </div>
                </div>
            </div>
            <Box
                id="myreviews-big"
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
                        borderRadius: "10px"
                    }
                }}
            >
                {!user && <CircularProgress className="spinner" />}
                {listReviews ? (
                    <div>
                        {listReviews.length > 0 ? (
                            <div>
                                <Grid container spacing={{ xs: 2, md: 3 }}>
                                    {listReviews
                                        .filter(review => {
                                            const searchInput = input.toLowerCase();
                                            const resName = review.restaurantName.toLowerCase();

                                            return resName.startsWith(
                                                searchInput
                                            );
                                        })
                                        .map(review => (
                                            <Grid item xs={6} key={review}>
                                                <ReviewPeek
                                                    reviewData={review}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </div>
                        ) : (
                            // If the info can't be loaded, then display a message
                            <h2>User has not posted</h2>
                        )}
                    </div>
                ) : (
                    <h2>Found no reviews</h2>
                )}
            </Box>
        </div>
    );
}

function ProfileReviews() {
    //getting visited user
    const navigate = useNavigate();
    const { username } = useParams();

    const [user] = useContext(UserContext);
    const [loggedUsername, setloggedUsername] = useState("");
    useEffect(() => {
        setloggedUsername(user?.username);
        const isUser = username === loggedUsername;
        if (isUser) {
            navigate("/my-profile");
        }
    }, [user]);

    // if its the logged in user, load the myprofile component
    const { data: userProfile, isLoading } = useQuery(
        "profile",
        () => getProfile(username),
        { enabled: !!username }
    );

    return (
        <>
            {userProfile ? (
                <div className="content-ProfileReviews">
                    <span className="smallScreen-ProfileReviews">
                        <h1> {userProfile.username}'s REVIEWS</h1>
                        <ReviewsSmallScreen user={userProfile} />
                        <Post />
                    </span>
                    <span className="bigScreen-ProfileReviews">
                        <TopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                            <ReviewsBigScreen user={userProfile} />
                        </div>
                    </span>
                </div>
            ) : (
                <CircularProgress className="spinner" />
            )}
        </>
    );
}

export default ProfileReviews;
