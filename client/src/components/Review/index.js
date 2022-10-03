
import "./Review.css";
import NavLoggedIn from "../LoggedInNavBar";

import { useContext } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../../actions/UserContext";

import { useQuery } from "react-query";
import "@fontsource/martel-sans";
import { CircularProgress } from "@mui/material";

import addImage from "../../assets/images/addImage.png";
import { getReview } from "../../api";

import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Moment from "moment";

import ImageIcon from '@mui/icons-material/Image';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';

function Review(props) {
    const navigate = useNavigate();

    const { reviewId } = useParams();
    const { data: review, isLoading } = useQuery(
        "view-review",
        () => getReview(reviewId),
        { enabled: !!reviewId }
    );

    const marks = [
        {
            value: 1,
            label: "$"
        },
        {
            value: 2,
            label: "$$"
        },
        {
            value: 3,
            label: "$$$"
        },
        {
            value: 4,
            label: "$$$$"
        }
    ];

    return (
        <div className="content-Review">
            <NavLoggedIn />
            {isLoading && !review && <CircularProgress className="spinner" />}
            {review ? (
                <div className="user-container">
                    <h1>REVIEW</h1>
                    <span className="smallScreen-Review">
                        <div id="outer">
                            <div className="r1">
                                <div className="switchContainer">
                                    <FormControlLabel
                                        sx={{
                                            gap: "5px",
                                        }}
                                        control={
                                            <Switch 
                                                sx={{
                                                    width: 36,
                                                    height: 20,
                                                    padding: 0,
                                                    gap: "10px",
                                                    "& .MuiSwitch-switchBase": {
                                                        padding: 0,
                                                        margin: 0.3,
                                                        transitionDuration: "300ms",
                                                        "&.Mui-checked": {
                                                            transform: "translateX(16px)",
                                                            color: "#FFFCFB",
                                                        "& + .MuiSwitch-track": {
                                                            backgroundColor: "#D9D9D9",
                                                            opacity: 1,
                                                            border: 0,
                                                        },
                                                        "&.Mui-disabled + .MuiSwitch-track": {
                                                            opacity: 0.5,
                                                        },
                                                        },
                                                    },
                                                    "& .MuiSwitch-thumb": {
                                                        boxSizing: "border-box",
                                                        width: 16,
                                                        height: 16,
                                                    },
                                                    "& .MuiSwitch-track": {
                                                        borderRadius: "10px",
                                                        bgcolor: "#A9CABB",
                                                        opacity: 1,

                                                    },
                                                }}
                                                checked={review.isPublic} 
                                            />}
                                        label={review.isPublic ? "Private":"Public"}
                                    />
                                </div>
                                <div className="likes-bookmark">
                                    <div className="likes">
                                        {/* if clicked */}
                                        {/* <ThumbUpAltIcon/> */}
                                        {/* else */}
                                        <ThumbUpOffAltIcon />
                                        <p>{review.likeCount}k</p>
                                    </div>
                                    <BookmarkBorderIcon 
                                        sx={{
                                            fontSize: "25px"
                                        }}        
                                    />
                                    {/* if bookmarked */}
                                    {/* <BookmarkIcon 
                                        sx={{
                                            fontSize: "25px"
                                        }}
                                    /> */}
                                </div>
                            </div>
                            <div className="r1">
                                <div className="ratingContainer">
                                    <Rating
                                        name="size-medium"
                                        defaultValue={review.rating}
                                        size="medium"
                                        precision={1}
                                        emptyIcon={
                                            <StarIcon 
                                                style={{
                                                    opacity: 0.55 
                                                }} 
                                                fontSize="inherit" 
                                            />}
                                        readOnly
                                    />
                                </div>
                                <div className="sliderContainer">
                                    <Slider
                                        defaultValue={review.priceRange}
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={4}
                                        track={false}
                                        disabled
                                        sx={{
                                            "& .MuiSlider-thumb": {
                                                color: "#BEE5B0",
                                                height: 10,
                                                width: 10,
                                                "&:focus, &:hover, &.Mui-active": {
                                                    boxShadow:
                                                    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)"
                                                }
                                            },
                                            "& .MuiSlider-rail": {
                                                color: "#949292",
                                                height: "1px",
                                                opacity: 100
                                            },
                                            "& .MuiSlider-markLabel": {
                                                fontSize: 10
                                            },
                                            "& .MuiSlider-mark": {
                                                color: "#949292",
                                                height: 5,
                                                width: 5,
                                                borderRadius: "5px",
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <form>
                            {/* user name field */}
                            <div className="details-container">
                                <input
                                    type="text"
                                    placeholder={review.restaurantName}
                                    disabled
                                />
                            </div>

                            <div className="details-container">
                                <input
                                    type="text"
                                    placeholder={Moment(review.dateVisited).format(
                                        "MMMM Do, YYYY"
                                    )}
                                    disabled
                                />
                            </div>

                            <div className="details-container">
                                <input
                                    type="text"
                                    placeholder={review.address.streetAddress}
                                    disabled
                                />
                            </div>

                            <div id="outerAddress">
                                <div className="suburb-container">
                                    <input
                                        type="text"
                                        placeholder={review.address.suburb}
                                        disabled
                                    />
                                </div>

                                <div className="state-container">
                                    <input
                                        type="text"
                                        placeholder={review.address.state}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div id="outerAddress">
                                <div className="postcode-container">
                                    <input
                                        type="text"
                                        placeholder={review.address.postcode}
                                        disabled
                                    />
                                </div>
                                <div className="country-container">
                                    <input
                                        type="text"
                                        placeholder={review.address.country}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="details-container">
                                <textarea
                                    type="text"
                                    placeholder={review.description}
                                    disabled
                                />
                            </div>

                            <div className="add-image">
                                <ImageIcon 
                                    sx={{
                                        fontSize: "72px",
                                        bgcolor: "#D9D9D9",
                                        borderRadius: "10px",
                                    }}    
                                />
                            </div>
                            <div className="line"/>
                            <div className="r2">
                                <p>
                                    Date published {
                                        Moment(review.dateReviewed).format(
                                            "MMMM Do, YYYY"
                                        )
                                    }
                                </p>
                                <p>By 
                                    <button
                                        className="authorButton"
                                        onClick={() => {
                                            navigate(`/profile/${review.userId.username}`);
                                        }} 
                                    >
                                        {review.userId.username}
                                    </button>
                                </p>
                                <button
                                    className="editReviewButton"
                                    type="button"
                                    onClick={() => {
                                        navigate(`review/${review._id}/edit`);
                                    }}
                                >
                                    EDIT
                                </button>
                            </div>
                        </form>                        
                    </span>
                    <span className="bigScreen-Review">
                        <div id="outer">
                            <div className="r1">
                                <div className="ratingContainer">
                                    <Rating
                                        name="size-medium"
                                        defaultValue={review.rating}
                                        size="medium"
                                        precision={1}
                                        emptyIcon={
                                            <StarIcon 
                                                style={{
                                                    opacity: 0.55 
                                                }} 
                                                fontSize="inherit" 
                                            />}
                                        readOnly
                                    />
                                    <div className="price"></div>
                                </div>
                                <div className="likes-bookmark">
                                    <div className="likes">
                                        {/* if clicked */}
                                        {/* <ThumbUpAltIcon /> */}
                                        {/* else */}
                                        <ThumbUpOffAltIcon />
                                        <p>{review.likeCount}k</p>
                                    </div>
                                    <BookmarkBorderIcon 
                                        sx={{ 
                                            fontSize: "40px" 
                                        }} 
                                    />
                                    {/* if bookmarked */}
                                    {/* <BookmarkIcon 
                                        sx={{
                                            fontSize: "40px"
                                        }}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className="review-container">
                            <h3>{review.restaurantName}</h3>
                            <h4>{review.address.streetAddress} {review.address.state} {review.address.postcode}</h4>
                            <div className="review-tags">
                                <p>Japanese</p>
                            </div>
                            <p>{review.description}</p>
                            <div className="add-image">
                                <ImageIcon 
                                    sx={{
                                        fontSize: "170px",
                                    }}    
                                />
                            </div>
                        </div>
                        <div className="line"/>
                            <div className="r1">
                                <div className="r2">
                                    <p>
                                        Date published {
                                            Moment(review.dateReviewed).format(
                                                "MMMM Do, YYYY"
                                            )
                                        }
                                    </p>
                                    <p>By 
                                        <button
                                            className="authorButton"
                                            onClick={() => {
                                                navigate(`/profile/${review.userId.username}`);
                                            }} 
                                        >
                                            {review.userId.username}
                                        </button>
                                    </p>
                                </div>
                                <button
                                    className="editReviewButton"
                                    type="button"
                                    onClick={() => {
                                        navigate(`review/${review._id}/edit`);
                                    }}
                                >
                                    EDIT
                                </button>
                            </div>
                    </span>
                </div>
            ) : (
                <div>
                    <h1>Not Found.</h1>
                </div>
            )}
            <div className="footer">
                <p>copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default Review;
