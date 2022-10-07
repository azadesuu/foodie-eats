// import "./profile.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, getOtherReviews } from "../../api";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

import "@fontsource/martel-sans";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import ReviewPeek from "../ReviewPeek";

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
                <a onClick={() => {
                    navigate(`/profile/${userProfile.username}/reviews`);
                    }}
                >
                    reviews
                </a>
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

    return (
        <div className="reviews">
            <div className="reviews-r1">
                <h2>reviews</h2>
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
                        {listReviews.length > 0 ? (
                            <div>
                                <Grid container spacing={{ xs: 2, md: 3 }}>
                                    {listReviews.map(review => (
                                        <Grid item xs={6} key={review}>
                                            <ReviewPeek reviewData={review} />
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

function Profile() {
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

    // if its the  logged in user, load the myprofile component
    const { data: userProfile, isLoading } = useQuery(
        "profile",
        () => getProfile(username),
        { enabled: !!username }
    );

    return (
        <div className="content-Profile">
            {isLoading && <CircularProgress className="spinner" />}
            {!isLoading && userProfile ? (
                <>
                    <span className="smallScreen-Profile">
                        <div className="c1">
                            <h1>{userProfile.username}</h1>
                            <Avatar
                                alt="user-profile-image"
                                // src={user.profileImage}
                                sx={{ 
                                    height: 110, 
                                    width:  110,
                                    mt: "-40px",
                                }}
                            />
                            {userProfile ? (
                                <div>
                                    <div className="form-control-profile">
                                        <label>Username </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={userProfile.username}
                                            readOnly="readOnly"
                                        />
                                    </div>
                                    <div className="form-control-profile-bio">
                                        <label>Bio </label>
                                        <textarea
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            value={userProfile.bio}
                                            readOnly="readOnly"
                                        />
                                    </div>
                                    <span className="smallScreen-Profile">
                                        <div className="viewallreviews">
                                            <a onClick={() => {
                                                navigate(`/profile/${userProfile.username}/reviews`);
                                            }}>
                                                View their reviews
                                            </a>
                                        </div>
                                    </span>

                                </div>
                            ) : (
                                <div>Error</div>
                            )}
                        </div>
                    </span>
                    <span className="bigScreen-Profile">
                        <TopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar user={userProfile} />
                            <div className="line6" />
                            <ReviewsBigScreen user={userProfile} />
                        </div>
                    </span>
                </>
            ) : (
                <h1>User not found.</h1>
            )}
            <div className="footer">
                <p>Copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Profile;