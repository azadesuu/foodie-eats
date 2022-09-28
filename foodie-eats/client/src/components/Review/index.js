import "./index.css";
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

function Review(props) {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const { reviewId } = useParams();
    const { data: review, isLoading } = useQuery(
        "view-review",
        () => getReview(reviewId),
        { enabled: !!reviewId && !!user }
    );
    console.log(user);
    console.log(review);

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
        <div className="profile-info">
            {(isLoading && !review) && <CircularProgress className="spinner" />}
            {review ? (
                <div className="user-container">
                    <h1>Review</h1>

                    <div id="outer">
                        <div className="switchContainer">
                            <FormControlLabel
                                control={<Switch checked={review.isPublic} />}
                                label="Public"
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
                            />
                        </div>

                        <div className="ratingContainer">
                            <Rating
                                name="size-medium"
                                defaultValue={review.rating}
                                size="medium"
                                precision={1}
                                disabled
                            />
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
                                placeholder={review.address.street_address}
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

                        <div className="add-image-text">
                            <p>Add your image</p>
                        </div>

                        <div>
                            <button className="addImageButton">
                                <img className="addImage" src={addImage} />
                            </button>
                        </div>

                        <div>
                            <button
                                className="editReviewButton"
                                type="button"
                                onClick={() => {
                                    navigate("./../edit-review");
                                }}
                            >
                                EDIT
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Not Found.</h1>
                </div>
            )}
        </div>
    );
}

export default Review;
