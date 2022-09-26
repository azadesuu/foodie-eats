import React from "react"; // required
import "./index.css";

import { UserContext } from "../../actions/UserContext";
import { useContext } from "react";
import { getMyReviews } from "../../api";
import { useQuery } from "react-query";

import "@fontsource/martel-sans";

import NavLoggedIn from "../LoggedInNavBar";
import ReviewPeek from "../ReviewPeek";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";

import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

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
            <span className="smallScreen">
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
            </span>
        </div>
    );
}

function Reviews() {
    const [user, setUser] = useContext(UserContext);
    const { data: listReviews, isLoading } = useQuery(
        "my-reviews",
        () => getMyReviews(user?._id),
        { enabled: !!user }
    );

    return (
        <div className="reviews">
            <div>I am {user?.username}</div>
            <div className="reviews-content">
                <List
                    sx={{
                        width: "100%",
                        justifyContent: "center",
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
                    {isLoading && <CircularProgress className="spinner" />}
                    {listReviews ? (
                        <div>
                            {listReviews.length > 0 ? (
                                <div>
                                    {listReviews.map(review => {
                                        return (
                                            <ReviewPeek reviewData={review} />
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
    );
}

function MyReviews() {
    return (
        <div className="content">
            <NavLoggedIn />

            <h1>MY REVIEWS</h1>
            <SearchBar />
            <div className="line" />
            <Reviews />
            <Post />
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default MyReviews;
