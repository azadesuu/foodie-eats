import React from "react"; // required
import "./index.css";

import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getBookmarks } from "../../api";
import { UserContext } from "../../actions/UserContext";

import "@fontsource/martel-sans";

import NavLoggedIn from '../LoggedInNavBar';
import ReviewPeek from "../ReviewPeek";

import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';

import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import CircularProgress from "@mui/material/CircularProgress";


function Title() {
    return (
        <div>
            <h1>BOOKMARKS</h1>
        </div>
    );
}

function SearchBar() {
    const data = [{"Name": "Calia", "Author": "abcd123"}, {"Name": "David's Hotpot", "Author": "xyz789"}]
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
            <div className="searchResult">

            </div>
        </div>
    )
}

function Post() {
    return(
        <div className="postButton">
            <span className="smallScreen">
                <IconButton href='#'>
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
    )
}

function Reviews() {
    const [user, setUser] = useContext(UserContext);

    const userId = user?.id;
    //{"_id":{"$in": ids}}
    const { data: listReviews, isLoading } = useQuery(
        "bookmarks",
        () => getBookmarks(user?._id),
        { enabled: user?.id }
    );

    return (
        <div className="reviews">
            <div className="reviews-content">
                <List sx={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        overflowY: 'auto',
                        flexDirection: "column",
                        "&::-webkit-scrollbar": {
                            width: '0.3em',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#FFFEEC',
                            borderRadius: '10px',
                            maxHeight: '4px',
                        }
                    }}>
                {!user && <CircularProgress className="spinner" />}
                {listReviews ? (
                    <div>
                        {listReviews.map((review) => {
                            return <ReviewPeek reviewData={review} />;
                        })}
                    </div>
                    ) : (
                        <h2>Bookmarks not found</h2>
                    )}  
                </List>         
            </div>
        </div>
    )
}

function Bookmarks() {
    return (
        <div className="content">
            <NavLoggedIn />
            <Title />
            <SearchBar />
            <div className="line" />
            <Reviews />
            <Post />
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>  
        </div>
    )
}

export default Bookmarks;