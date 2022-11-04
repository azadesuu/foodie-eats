import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./Community.css";
import React from "react";
import { useQuery } from "react-query";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getCommunityRecent, getCommunityMostLiked } from "../../api";

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
import { resolveComponentProps } from "@mui/base";

function SearchBar(props) {
    const ratingChecked = props.ratingChecked;
    const setRatingChecked = props.setRatingChecked;
    const priceChecked = props.priceChecked;
    const setPriceChecked = props.setPriceChecked;
    const [input, setInput] = useState("");

    const allReviews = props.allReviews;
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
                                <ClickAwayListener onClickAway={handleClose}>
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
                                                        margin: "10px 0 -7px 0"
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
                                                                <div key={id}>
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
                                                                        {label}
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
                                                        margin: "10px 0 -7px 0"
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
                                                                <div key={id}>
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
                                                                        {label}
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
                                borderRadius: "10px",
                                maxHeight: "4px"
                            },
                            transition: "all 0.5s ease"
                        }}
                    >
                        {allReviews
                            .filter(review => {
                                const searchInput = input.toLowerCase();
                                const resName = review.restaurantName.toLowerCase();
                                const tagNames = review.tags;

                                if (input.startsWith("#")) {
                                    return (
                                        searchInput &&
                                        tagNames.some(tag =>
                                            searchInput
                                                .substring(1)
                                                .startsWith(tag)
                                        )
                                    );
                                } else {
                                    return (
                                        searchInput &&
                                        resName.startsWith(searchInput)
                                    );
                                }
                            })
                            .map(review => {
                                return (
                                    <div>
                                        <ReviewPeek reviewData={review} />
                                        <div className="line5"></div>
                                    </div>
                                );
                            })}
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
    const [location, setLocation] = useState("3000");
    const { data: listReviewsRecent, isLoading } = useQuery(
        "listReviewsRecent",
        () => getCommunityRecent()
    );
    const { data: listLikes, isLoading2 } = useQuery(
        "listOfReviewsByLikes",
        () => getCommunityMostLiked()
    );
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

    return (
        <div className="content-Community">
            <SEO data={allSEO.community} />

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
                        name="location"
                        id="location"
                        value={location}
                        maxLength="4"
                        onChange={e => {
                            setLocation(e.target.value);
                        }}
                        required
                    />
                </div>
            </span>
            <SearchBar
                allReviews={listReviewsRecent}
                ratingChecked={ratingChecked}
                setRatingChecked={setRatingChecked}
                priceChecked={priceChecked}
                setPriceChecked={setPriceChecked}
            />
            <div className="line4" />
            <div className="toprecom">
                <h2>TOP RECOMMENDATIONS</h2>
                {isLoading && <CircularProgress className="spinner"/>}
                {listLikes ? (
                    <>
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
                                            borderRadius: "10px",
                                            maxHeight: "4px"
                                        }
                                    }}
                                >
                                    {/* review parameter contains the whole review document */}
                                    {listLikes
                                        .filter(review => {
                                            const postcodeInput = Number(location);
                                            const reviewPostcode =
                                                review.address.postcode;
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
                                                );
                                            }
                                            return (
                                                postcodeInput &&
                                                reviewPostcode === postcodeInput
                                            );
                                        })
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
                                        .filter(review => {
                                            const postcodeInput = Number(location);
                                            const reviewPostcode =
                                                review.address.postcode;
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
                                                );
                                            }
                                            return (
                                                postcodeInput &&
                                                reviewPostcode === postcodeInput
                                            );
                                        })
                                        .slice(0, 9)
                                        .map(review => {
                                            return (
                                                <Grid item xs={4} key={review}>
                                                    <ReviewPeek
                                                        reviewData={review}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                </Grid>
                            </Box>
                        </span>
                    </>
                ) : (
                    // If the info can"t be loaded, then display a message
                    !isLoading && <h2>Found no orders</h2>
                )}
            </div>
            <div className="line4" />
            <div className="recent">
                <h2>RECENT</h2>
                {isLoading && <CircularProgress className="spinner"/>}
                {listReviewsRecent ? (
                    <>
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
                                            borderRadius: "10px",
                                            maxHeight: "4px"
                                        }
                                    }}
                                >
                                    {/* review parameter contains the whole review document */}
                                        {listReviewsRecent
                                            .filter(review => {
                                                const postcodeInput = Number(location);
                                                const reviewPostcode =
                                                    review.address.postcode;
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
                                                        ) &&
                                                        postcodeInput &&
                                                        reviewPostcode === postcodeInput
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
                                                        ) &&
                                                        postcodeInput &&
                                                        reviewPostcode === postcodeInput
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
                                                        ) &&
                                                        postcodeInput &&
                                                        reviewPostcode === postcodeInput
                                                    );
                                                }
                                                return (
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
                                                );
                                            })
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
                                        .filter(review => {
                                            const postcodeInput = Number(location);
                                            const reviewPostcode =
                                                review.address.postcode;
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
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
                                                    ) &&
                                                    postcodeInput &&
                                                    reviewPostcode === postcodeInput
                                                );
                                            }
                                            return (
                                                postcodeInput &&
                                                reviewPostcode === postcodeInput
                                            );
                                        })
                                        .map(review => (
                                            <Grid item xs={4} key={review}>
                                                <ReviewPeek reviewData={review} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>
                        </span>
                    </>
                ) : (
                    // If the info can"t be loaded, then display a message
                    !isLoading && <h2>Found no orders</h2>
                )}
            </div>
            <Post />
        </div>
    );
}

export default Community;
