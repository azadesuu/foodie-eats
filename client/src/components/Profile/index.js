import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./Profile.css";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, getOtherReviews } from "../../api";
import { useQuery } from "react-query";
import "@fontsource/martel-sans";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ReviewPeek from "../ReviewPeek";
import OtherTopUser from "../OtherTopUser";

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

function ReviewsBigScreen(props) {
    const user = props.user;
    const { data: listReviews, isLoading } = useQuery(
        "reviews",
        () => getOtherReviews(user?._id),
        { enabled: !!user }
    );
    const [input, setInput] = useState("");
    const [ratingChecked, setRatingChecked] = useState([
        {
            id: 1,
            label: "1-star",
            check: false
        },
        {
            id: 2,
            label: "2-star",
            check: false
        },
        {
            id: 3,
            label: "3-star",
            check: false
        },
        {
            id: 4,
            label: "4-star",
            check: false
        },
        {
            id: 5,
            label: "5-star",
            check: false
        }
    ]);
    const [priceChecked, setPriceChecked] = useState([
        {
            id: 1,
            label: "$",
            check: false
        },
        {
            id: 2,
            label: "$$",
            check: false
        },
        {
            id: 3,
            label: "$$$",
            check: false
        },
        {
            id: 4,
            label: "$$$$",
            check: false
        }
    ]);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    const handleRating = id => {
        setRatingChecked(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, check: !item.check };
                } else {
                    return { ...item };
                }
            });
        });
    };
    const handlePriceRange = id => {
        setPriceChecked(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, check: !item.check };
                } else {
                    return { ...item };
                }
            });
        });
    };

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
                        <IconButton
                            sx={{
                                color: "#000000"
                            }}
                            ref={anchorRef}
                            aria-controls={
                                open ? "composition-menu" : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            <FilterAltIcon />
                        </IconButton>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-end"
                            transition
                            disablePortal
                            sx={{
                                zIndex: 95
                            }}
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === "bottom-end"
                                                ? "right top"
                                                : "left bottom"
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            border: "2px solid",
                                            borderTopRightRadius: "10px",
                                            borderBottomRightRadius: "10px",
                                            borderBottomLeftRadius: "10px",
                                            marginTop: "5px",
                                            marginRight: "-5px",
                                            minHeight: "139px",
                                            width: "130px"
                                        }}
                                    >
                                        <ClickAwayListener
                                            onClickAway={handleClose}
                                        >
                                            <MenuList
                                                autoFocusItem={open}
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <div className="multi-level">
                                                    <div className="item">
                                                        <input
                                                            type="checkbox"
                                                            id="title-rating"
                                                        />
                                                        <ArrowRightIcon
                                                            id="arrow"
                                                            sx={{
                                                                margin:
                                                                    "10px 0 -7px 0"
                                                            }}
                                                        />
                                                        <label for="title-rating">
                                                            rating
                                                        </label>
                                                        <ul>
                                                            {ratingChecked.map(
                                                                ({
                                                                    label,
                                                                    id,
                                                                    check
                                                                }) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                id
                                                                            }
                                                                        >
                                                                            <li>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value={
                                                                                        id
                                                                                    }
                                                                                    onChange={() =>
                                                                                        handleRating(
                                                                                            id
                                                                                        )
                                                                                    }
                                                                                    checked={
                                                                                        check
                                                                                    }
                                                                                />
                                                                                {
                                                                                    label
                                                                                }
                                                                            </li>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="item">
                                                        <input
                                                            type="checkbox"
                                                            id="title-price"
                                                        />
                                                        <ArrowRightIcon
                                                            id="arrow"
                                                            sx={{
                                                                margin:
                                                                    "10px 0 -7px 0"
                                                            }}
                                                        />
                                                        <label for="title-price">
                                                            price range
                                                        </label>
                                                        <ul>
                                                            {priceChecked.map(
                                                                ({
                                                                    label,
                                                                    id,
                                                                    check
                                                                }) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                id
                                                                            }
                                                                        >
                                                                            <li>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    value={
                                                                                        id
                                                                                    }
                                                                                    onChange={() =>
                                                                                        handlePriceRange(
                                                                                            id
                                                                                        )
                                                                                    }
                                                                                    checked={
                                                                                        check
                                                                                    }
                                                                                />
                                                                                {
                                                                                    label
                                                                                }
                                                                            </li>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
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
                                    {listReviews
                                        .filter(review => {
                                            const searchInput = input.toLowerCase();
                                            const resName = review.restaurantName.toLowerCase();
                                            const tagNames = review.tags;
                                            const filterInputRating = ratingChecked.map(
                                                item => {
                                                    if (item.check) {
                                                        return item.id;
                                                    } else {
                                                        return null;
                                                    }
                                                }
                                            );
                                            const filterInputPriceRange = priceChecked.map(
                                                item => {
                                                    if (item.check) {
                                                        return item.id;
                                                    } else {
                                                        return null;
                                                    }
                                                }
                                            );

                                            const resRating = review.rating;
                                            const resPriceRange =
                                                review.priceRange;

                                            if (
                                                filterInputRating.some(
                                                    item => item !== null
                                                ) &&
                                                filterInputPriceRange.some(
                                                    item => item !== null
                                                )
                                            ) {
                                                return (
                                                    filterInputRating &&
                                                    filterInputRating.some(
                                                        rating =>
                                                            resRating === rating
                                                    ) &&
                                                    filterInputPriceRange &&
                                                    filterInputPriceRange.some(
                                                        price =>
                                                            resPriceRange ===
                                                            price
                                                    )
                                                );
                                            } else if (
                                                filterInputPriceRange.some(
                                                    item => item !== null
                                                )
                                            ) {
                                                return (
                                                    filterInputPriceRange &&
                                                    filterInputPriceRange.some(
                                                        price =>
                                                            resPriceRange ===
                                                            price
                                                    )
                                                );
                                            } else if (
                                                filterInputRating.some(
                                                    item => item !== null
                                                )
                                            ) {
                                                return (
                                                    filterInputRating &&
                                                    filterInputRating.some(
                                                        rating =>
                                                            resRating === rating
                                                    )
                                                );
                                            }

                                            if (input.startsWith("#")) {
                                                return tagNames.some(tag =>
                                                    searchInput
                                                        .substring(1)
                                                        .startsWith(tag)
                                                );
                                            } else {
                                                return resName.startsWith(
                                                    searchInput
                                                );
                                            }
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
                    !isLoading && <h2>Found no reviews</h2>
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
    useEffect(() => {
        if (user) {
            const isUser = username === user?.username;
            if (isUser) {
                navigate("/my-profile");
            }
        }
    }, [user, navigate, username]);

    // if its the  logged in user, load the myprofile component
    const { data: userProfile, isLoading } = useQuery(
        "profile",
        () => getProfile(username),
        { enabled: !!username }
    );

    return (
        <div className="content-Profile">
            <SEO data={allSEO.viewuser} username={username} />
            {isLoading && <CircularProgress className="spinner" />}
            {!isLoading && userProfile ? (
                <>
                    <span className="smallScreen-Profile">
                        <div className="c1">
                            <h1>{userProfile.username}</h1>
                            <Avatar
                                alt="user-profile-image"
                                src={
                                    userProfile.profileImage !== ""
                                        ? userProfile.profileImage
                                        : null
                                }
                                sx={{
                                    height: 110,
                                    width: 110,
                                    mt: "-40px"
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
                                            <a
                                                onClick={() => {
                                                    navigate(
                                                        `/profile/${userProfile.username}/reviews`
                                                    );
                                                }}
                                            >
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
                        <OtherTopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar user={userProfile} />
                            <div className="line6" />
                            <ReviewsBigScreen user={userProfile} />
                        </div>
                    </span>
                </>
            ) : (
                !isLoading && <h1>User not found.</h1>
            )}
        </div>
    );
}

export default Profile;
