import React from "react"; // required
import "./index.css";

import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { getBookmarks } from "../../api";
import { UserContext } from "../../actions/UserContext";
import { getProfile } from "../../api";

import "@fontsource/martel-sans";

import NavLoggedIn from '../LoggedInNavBar';
import ReviewPeek from "../ReviewPeek";

import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';

import List from '@mui/material/List';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

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
        </div>
    )
}

function TopUser() {
    // getting logged in user
    const [user1, setUser1] = useContext(UserContext);
    // console.log(user1);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [bio, setBio] = useState();
    const [profileImage, setProfileImage] = useState();
    const [userId, setUserId] = useState();

    const [editButton, setEditButton] = useState(false);
    const updateUser = () => {
        setEditButton(!editButton);
    };

    const { data: userProfile, isLoading } = useQuery(
        "my-profile",
        () => getProfile(user1?.username),
        { enabled: !!user1?.username }
    );
    return (
        <div className="top-user">
            <div className="top-user-r1">
                <Avatar alt="user-profile-image" src={userProfile.profileImage} sx={{ height: 130, width: 130 }}/>
                <div className="top-user-info">
                <h2>{userProfile.username}</h2>
                <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p><span className="detail">7</span> reviews</p>
                <p><span className="detail">10k</span> likes</p>
            </div>
        </div>
    )
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
    )
}

function ReviewsSmallScreen() {
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
                    overflowX: 'hidden', 
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

function ReviewsBigScreen() {
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
            <div className="bookmarks-r1">
                <h2>bookmarks</h2>
                <SearchBar />
            </div>
            <Box sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                overflowX: 'hidden',
                maxHeight:  "300px",
                padding: '1%',
                width: '90%',
                "&::-webkit-scrollbar": {
                    width: '0.3em',
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: '#BEE5B0',
                    borderRadius: '10px',
                }
            }}>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    {!user && <CircularProgress className="spinner" />}
                    {listReviews ? (
                        <div>
                            {listReviews.map((review) => {
                                <Grid item xs={2} sm={6} md={6} key={review}>
                                    return <ReviewPeek reviewData={review} />;
                                </Grid>
                            })}
                        </div>
                    ) : (
                        <h2>Bookmarks not found</h2>
                    )}  
                </Grid>
            </Box>         
        </div>
    )
}

function Bookmarks() {
    return (
        <div className="content">
            <NavLoggedIn />
            <span className="smallScreen-mybookmarks">
                <h1>BOOKMARKS</h1>
                <SearchBar />
                <div className="line" />
                <ReviewsSmallScreen />
                <Post />
            </span>
            <span className="bigScreen-mybookmarks">
                <TopUser />
                <div className="line5" />
                <div className="r1">
                    <Sidebar />
                    <div className="line6" />
                    <ReviewsBigScreen />
                </div>
            </span>
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>  
        </div>
    )
}

export default Bookmarks;