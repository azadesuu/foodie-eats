import React from "react";
import "./MyReviews.css";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { getMyReviews } from "../../api";
import { useQuery } from "react-query";
import { getProfile } from "../../api";

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
            <div id="current">
                <a href="my-reviews">reviews</a>
            </div>
            <a href="my-bookmarks">bookmarks</a>
            <a href="my-theme">theme</a>
        </div>
    );
}

function ReviewsSmallScreen(props) {
    const user = props.user;
    const { data: listReviews, isLoading } = useQuery("my-reviews", () =>
        getMyReviews(user?._id)
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
        },
    ]);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
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
    const handleRating = (id) => {
        setRatingChecked(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return {...item, check:!item.check};
                } else {
                    return {...item};
                }
            })
        })
    };
    const handlePriceRange = (id) => {
        setPriceChecked(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return {...item, check:!item.check};
                } else {
                    return {...item};
                }
            })
        })
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
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
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
                            zIndex: 95,
                        }}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                    placement === "bottom-end" ? "right top" : "left bottom",
                                }}
                            >
                                <Paper
                                    sx={{
                                        border: "2px solid #BEE5B0",
                                        borderTopRightRadius: "10px",
                                        borderBottomRightRadius: "10px",
                                        borderBottomLeftRadius: "10px",
                                        marginTop: "5px",
                                        marginRight: "-5px",
                                        minHeight: "139px",
                                        width: "130px"
                                    }}
                                >
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <div className="multi-level">
                                                <div className="item">
                                                    <input type="checkbox" id="title-rating"/>
                                                    <ArrowRightIcon
                                                        id="arrow"
                                                        sx={{
                                                            margin: "10px 0 -7px 0",                                                    
                                                        }}
                                                    />
                                                    <label for="title-rating">rating</label>
                                                    <ul>
                                                        {ratingChecked.map(({ label, id, check }) => {
                                                            return (
                                                                <div key={id} >
                                                                    <li>
                                                                        <input 
                                                                            type="checkbox"
                                                                            value={id}
                                                                            onChange={() => 
                                                                                handleRating(id)
                                                                            }
                                                                            checked={check}
                                                                        />
                                                                        {label}
                                                                    </li>
                                                                </div>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="item">
                                                    <input type="checkbox" id="title-price"/>
                                                    <ArrowRightIcon
                                                        id="arrow"
                                                        sx={{
                                                            margin: "10px 0 -7px 0"
                                                        }}
                                                    />
                                                    <label for="title-price">price range</label>
                                                    <ul>
                                                        {priceChecked.map(({ label, id, check }) => {
                                                            return (
                                                                <div key={id} >
                                                                    <li>
                                                                        <input 
                                                                            type="checkbox"
                                                                            value={id}
                                                                            onChange={() => 
                                                                                handlePriceRange(id)
                                                                            }
                                                                            checked={check}
                                                                        />
                                                                        {label}
                                                                    </li>
                                                                </div>
                                                            );
                                                        })}
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
                                        {listReviews
                                            .filter(review => {
                                                const searchInput = input.toLowerCase();
                                                const resName = review.restaurantName.toLowerCase();
                                                const tagNames = review.tags;
                                                const filterInputRating = ratingChecked.map((item) => {
                                                    if (item.check) {
                                                        return item.id;
                                                    } else {
                                                        return null;
                                                    }
                                                });
                                                const filterInputPriceRange = priceChecked.map((item) => {
                                                    if (item.check) {
                                                        return item.id;
                                                    } else {
                                                        return null;
                                                    }
                                                });
                    
                                                const resRating = review.rating;
                                                const resPriceRange = review.priceRange;
                                                    
                                                if (filterInputRating.some(item => item !== null) && filterInputPriceRange.some(item => item !== null)) {
                                                    return (
                                                        (filterInputRating && filterInputRating.some(rating => resRating === rating)) &&
                                                        (filterInputPriceRange && filterInputPriceRange.some(price => resPriceRange === price))
                                                    );
                                                } else if (filterInputPriceRange.some(item => item !== null)) {
                                                    return (
                                                        filterInputPriceRange && filterInputPriceRange.some(price => resPriceRange === price)
                                                    );
                                                } else if (filterInputRating.some(item => item !== null)) {
                                                    return (
                                                        filterInputRating && filterInputRating.some(rating => resRating === rating)
                                                    );
                                                }

                                                if (input.startsWith("#")) {
                                                    return (
                                                        tagNames.some(tag => searchInput.substring(1).startsWith(tag))
                                                    );
                                                } else {
                                                    return (
                                                        resName.startsWith(searchInput)
                                                    );
                                                }
                                            }).map(review => {
                                                return (
                                                    <ReviewPeek reviewData={review} />
                                                );
                                            })
                                        }
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
        "my-reviews",
        () => getMyReviews(user?._id),
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
        },
    ]);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
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
    const handleRating = (id) => {
        setRatingChecked(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return {...item, check:!item.check};
                } else {
                    return {...item};
                }
            })
        })
    };
    const handlePriceRange = (id) => {
        setPriceChecked(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return {...item, check:!item.check};
                } else {
                    return {...item};
                }
            })
        })
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
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
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
                                zIndex: 95,
                            }}
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                        placement === "bottom-end" ? "right top" : "left bottom",
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            border: "2px solid #BEE5B0",
                                            borderTopRightRadius: "10px",
                                            borderBottomRightRadius: "10px",
                                            borderBottomLeftRadius: "10px",
                                            marginTop: "5px",
                                            marginRight: "-5px",
                                            minHeight: "139px",
                                            width: "130px"
                                        }}
                                    >
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <div className="multi-level">
                                                    <div className="item">
                                                        <input type="checkbox" id="title-rating"/>
                                                        <ArrowRightIcon
                                                            id="arrow"
                                                            sx={{
                                                                margin: "10px 0 -7px 0",                                                    
                                                            }}
                                                        />
                                                        <label for="title-rating">rating</label>
                                                        <ul>
                                                            {ratingChecked.map(({ label, id, check }) => {
                                                                return (
                                                                    <div key={id} >
                                                                        <li>
                                                                            <input 
                                                                                type="checkbox"
                                                                                value={id}
                                                                                onChange={() => 
                                                                                    handleRating(id)
                                                                                }
                                                                                checked={check}
                                                                            />
                                                                            {label}
                                                                        </li>
                                                                    </div>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="item">
                                                        <input type="checkbox" id="title-price"/>
                                                        <ArrowRightIcon
                                                            id="arrow"
                                                            sx={{
                                                                margin: "10px 0 -7px 0"
                                                            }}
                                                        />
                                                        <label for="title-price">price range</label>
                                                        <ul>
                                                            {priceChecked.map(({ label, id, check }) => {
                                                                return (
                                                                    <div key={id} >
                                                                        <li>
                                                                            <input 
                                                                                type="checkbox"
                                                                                value={id}
                                                                                onChange={() => 
                                                                                    handlePriceRange(id)
                                                                                }
                                                                                checked={check}
                                                                            />
                                                                            {label}
                                                                        </li>
                                                                    </div>
                                                                );
                                                            })}
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
                                            const filterInputRating = ratingChecked.map((item) => {
                                                if (item.check) {
                                                    return item.id;
                                                } else {
                                                    return null;
                                                }
                                            });
                                            const filterInputPriceRange = priceChecked.map((item) => {
                                                if (item.check) {
                                                    return item.id;
                                                } else {
                                                    return null;
                                                }
                                            });
                
                                            const resRating = review.rating;
                                            const resPriceRange = review.priceRange;
                                                
                                            if (filterInputRating.some(item => item !== null) && filterInputPriceRange.some(item => item !== null)) {
                                                return (
                                                    (filterInputRating && filterInputRating.some(rating => resRating === rating)) &&
                                                    (filterInputPriceRange && filterInputPriceRange.some(price => resPriceRange === price))
                                                );
                                            } else if (filterInputPriceRange.some(item => item !== null)) {
                                                return (
                                                    filterInputPriceRange && filterInputPriceRange.some(price => resPriceRange === price)
                                                );
                                            } else if (filterInputRating.some(item => item !== null)) {
                                                return (
                                                    filterInputRating && filterInputRating.some(rating => resRating === rating)
                                                );
                                            }

                                            if (input.startsWith("#")) {
                                                return (
                                                    tagNames.some(tag => searchInput.substring(1).startsWith(tag))
                                                );
                                            } else {
                                                return (
                                                    resName.startsWith(searchInput)
                                                );
                                            }
                                        }).map(review => (
                                            <Grid item xs={6} key={review}>
                                                <ReviewPeek reviewData={review} />
                                            </Grid>
                                        ))
                                    }
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

function MyReviews() {
    const [user] = useContext(UserContext);
    
    return (
        <>
            {user ? (
                <div className="content-MyReviews">
                    <span className="smallScreen-MyReviews">
                        <h1>MY REVIEWS</h1>
                        <ReviewsSmallScreen user={user} />
                        <Post />
                    </span>
                    <span className="bigScreen-MyReviews">
                        <TopUser user={user} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="line6" />
                            <ReviewsBigScreen user={user} />
                        </div>
                    </span>
                    <div className="footer">
                        <p>Copyright © 2022 All-for-one</p>
                    </div>
                </div>
            ) : (
                <CircularProgress className="spinner" />
            )}
        </>
    );
}

export default MyReviews;
