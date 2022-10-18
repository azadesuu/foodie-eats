import "./Community.css";

import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import {
    getCommunityRecent,
    getCommunityMostLiked,
    getAllReviews
} from "../../api";

import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";

import PostAddIcon from "@mui/icons-material/PostAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ReviewPeek from "../ReviewPeek";

function SearchBar(props) {
    const [input, setInput] = useState("");
    const [checked, setChecked] = useState([])
    const [rating, setRating] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const { data: allReviews, isLoading3 } = useQuery("allReviews", () =>
        getAllReviews()
    );
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
    const handleRating = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1 ) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    const ratingList = [
        {
            id: 1,
            value: 1,
            label: "1-star",
        },
        {
            id: 2,
            value: 2,
            label: "2-star",
        },
        {
            id: 3,
            value: 3,
            label: "3-star",
        },
        {
            id: 4,
            value: 4,
            label: "4-star",
        },
        {
            id: 5,
            value: 5,
            label: "5-star",
        },
    ];
    const priceRangeList = [
        {
            id: 1,
            value: 1,
            label: "$",
        },
        {
            id: 2,
            value: 2,
            label: "$$",
        },
        {
            id: 3,
            value: 3,
            label: "$$$",
        },
        {
            id: 4,
            value: 4,
            label: "$$$$",
        },
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
                    value={input}
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
                                                    {ratingList.map(({ label, id, value }) => {
                                                        return (
                                                            <div key={id} value={value}>
                                                                <li>
                                                                    <input 
                                                                        type="checkbox"
                                                                        onChange={() => 
                                                                            handleRating(id)
                                                                        }
                                                                        checked={
                                                                            checked.indexOf(id) === -1 ?
                                                                                false : true
                                                                        }
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
                                                    {priceRangeList.map(({ label, id, value }) => {
                                                        return (
                                                            <div key={id} value={value}>
                                                                <li>
                                                                    <input type="checkbox"/>
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
            {isLoading3 && <CircularProgress className="spinner" />}
            {allReviews && input && (
                <div className="searchResult">
                    <List
                        sx={{
                            paddingLeft: "30px",
                            overflowY: "auto",
                            "&::-webkit-scrollbar": {
                                width: "0.3em"
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#BEE5B0",
                                borderRadius: "10px",
                                maxHeight: "4px"
                            },
                            transition: "all 0.5s ease",
                        }}
                    >
                        {allReviews
                            .filter(review => {
                                const searchInput = input.toLowerCase();
                                const resName = review.restaurantName.toLowerCase();

                                return (
                                    searchInput &&
                                    resName.startsWith(searchInput)
                                );
                            })
                            .map(review => {
                                return (
                                    <div>
                                        <ReviewPeek reviewData={review} />
                                        <div className="line5"></div>
                                    </div>
                                );
                            })
                        }
                    </List>
                </div>
            )}
        </div>
    );
}

function Post() {
    return (
        <div className="postButton">
            <span className="smallScreen-Community">
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
            </span>
        </div>
    );
}

function Community() {
    const [location, setLocation] = useState(3000);
    const [filters, setFilters] = useState({
        rating: [],
        price: []
    });
    const { data: listReviewsRecent, isLoading } = useQuery(
        "listReviewsRecent",
        () => getCommunityRecent()
    );
    const { data: listLikes, isLoading2 } = useQuery(
        "listOfReviewsByLikes",
        () => getCommunityMostLiked()
    );
    const showFilteredResults = (filters) => {

    };
    const handleFilters = (filters, category) => {
        const newFilters = {...filters}
        newFilters[category] = filters
        
        if (category === "price") {
 
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    };

    return (
        <div className="content-Community">
            <span className="bigScreen-Community">
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
                        onChange={e => {
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
                        onChange={e => {
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
            <SearchBar 
                handleFilters={filters => handleFilters(filters, "rating")}
            />
            <div className="line4" />
            {isLoading2 && <CircularProgress className="spinner" />}
            {listLikes ? (
                <div className="toprecom">
                    <h2>TOP RECOMMENDATIONS</h2>
                    <span className="smallScreen-Community">
                        <div className="toprecom-content">
                            <List
                                id="top-recom-small"
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
                                    .filter(
                                        review =>
                                            review.address.postcode === location
                                    )
                                    .slice(0, 9)
                                    .map(review => {
                                        return (
                                            <div>
                                                <ReviewPeek
                                                    reviewData={review}
                                                />
                                                <div className="line3"></div>
                                            </div>
                                        );
                                    })
                                }
                            </List>
                        </div>
                    </span>
                    <span className="bigScreen-Community">
                        <Box
                            id="top-recom-big"
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
                                    .filter(
                                        review =>
                                            review.address.postcode === location
                                    )
                                    .slice(0, 9)
                                    .map(review => (
                                        <Grid item xs={4} key={review}>
                                            <ReviewPeek reviewData={review} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </span>
                </div>
            ) : (
                // If the info can"t be loaded, then display a message
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
                                id="top-recom-small"
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
                                    .filter(
                                        review =>
                                            review.address.postcode === location
                                    )
                                    .map(review => {
                                        return (
                                            <div>
                                                <ReviewPeek
                                                    reviewData={review}
                                                />
                                                <div className="line3"></div>
                                            </div>
                                        );
                                    })
                                }
                            </List>
                        </div>
                    </span>
                    <span className="bigScreen-Community">
                        <Box
                            id="top-recom-big"
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
                                    .filter(
                                        review =>
                                            review.address.postcode === location
                                    )
                                    .map(review => (
                                        <Grid item xs={4} key={review}>
                                            <ReviewPeek reviewData={review} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </span>
                </div>
            ) : (
                // If the info can"t be loaded, then display a message
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
