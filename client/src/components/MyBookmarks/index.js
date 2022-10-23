import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import React from "react"; // required
import "./MyBookmarks.css";

import { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getBookmarks, getProfile } from "../../api";
import { UserContext } from "../../actions/UserContext";

import "@fontsource/martel-sans";

import ReviewPeek from "../ReviewPeek";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

function Post() {
    return (
        <div className="postButton">
            <SEO data={allSEO.mybookmarks} />
             <IconButton href="/create-review">
                <PostAddIcon
                    id="btn"
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
                <Avatar
                    alt="user-profile-image"
                    src={
                        userProfile.profileImage !== ""
                            ? userProfile.profileImage
                            : null
                    }
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
    const listReviews = props.reviews;
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
                    <IconButton
                        sx={{
                            color: "#000000"
                        }}
                        ref={anchorRef}
                        aria-controls={open ? "composition-menu" : undefined}
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
                                                                        key={id}
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
                                                                        key={id}
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
            <div className="line" />
            <div className="reviews">
                <div className="reviews-content">
                    <List
                        id="bookmarks-small"
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
                                borderRadius: "10px",
                                maxHeight: "4px"
                            }
                        }}
                    >
                        {!user && <CircularProgress className="spinner" />}
                        {listReviews.length > 0 ? (
                            <div>
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
                                        const resPriceRange = review.priceRange;

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
                                                        resPriceRange === price
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
                                                        resPriceRange === price
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
                                    .map(review => {
                                        return (
                                            <ReviewPeek reviewData={review} />
                                        );
                                    })}
                            </div>
                        ) : (
                            <h2>Bookmarks not found</h2>
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
}

function ReviewsBigScreen(props) {
    const user = props.user;
    const listReviews = props.reviews;
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
            <div className="bookmarks-r1">
                <h2>bookmarks</h2>
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
                id="bookmarks-big"
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
                        borderRadius: "10px",
                        maxHeight: "4px"
                    }  
                }}
            >
                {!user && <CircularProgress className="spinner" />}
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
                                    const resPriceRange = review.priceRange;

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
                                                rating => resRating === rating
                                            ) &&
                                            filterInputPriceRange &&
                                            filterInputPriceRange.some(
                                                price => resPriceRange === price
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
                                                price => resPriceRange === price
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
                                                rating => resRating === rating
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
                                        return resName.startsWith(searchInput);
                                    }
                                })
                                .map(review => {
                                    return (
                                        <Grid item xs={6} key={review}>
                                            <ReviewPeek reviewData={review} />
                                        </Grid>
                                    );
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
    const [user] = useContext(UserContext);

    const { data: userProfile, isLoading } = useQuery(
        "bookmarks",
        () => getProfile(user?.username),
        { enabled: !!user }
    );

    const { data: bookmarks, isLoading2 } = useQuery(
        "bookmarked-reviews",
        () => getBookmarks({ bookmarks: userProfile.bookmarks }),
        { enabled: !!userProfile }
    );
    return (
        <>
            {(isLoading2 || isLoading) && (
                <CircularProgress className="spinner" />
            )}
            {!isLoading2 && userProfile && bookmarks ? (
                <div className="content-MyBookmarks">
                    <SEO data={allSEO.mybookmarks} />

                    <span className="smallScreen-MyBookmarks">
                        <h1>BOOKMARKS</h1>
                        <ReviewsSmallScreen user={user} reviews={bookmarks} />
                        <Post />
                    </span>
                    <span className="bigScreen-MyBookmarks">
                        <TopUser user={userProfile} />

                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                            <ReviewsBigScreen
                                user={userProfile}
                                reviews={bookmarks}
                            />
                        </div>
                    </span>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default MyBookmarks;
