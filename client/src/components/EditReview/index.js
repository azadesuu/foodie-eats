import "./index.css";
import "@fontsource/martel-sans";
import addImage from "../../assets/images/addImage.png";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { updateReview, getReview } from "../../api";

import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function EditReview() {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);

    const { reviewId } = useParams();
    const { data: review, isLoading } = useQuery(
        "view-review",
        () => getReview(reviewId),
        { enabled: !!reviewId }
    );

    const submitUpdatedReview = async (
        _id,
        restaurantName,
        isPublic,
        priceRange,
        rating,
        dateVisited,
        address,
        description
    ) => {
        if (!restaurantName) {
            alert("restaurant name is missing");
        } else if (!dateVisited) {
            alert("date is missing");
        } else if (!address.streetAddress) {
            alert("street address is missing");
        } else if (!address.suburb) {
            alert("suburb is missing");
        } else if (!address.state) {
            alert("state is missing");
        } else if (!address.postcode) {
            alert("postcode is missing");
        } else if (!description) {
            alert("description is missing");
        } else if (
            parseInt(address.postcode) < 3000 ||
            parseInt(address.postcode) > 3999
        ) {
            alert("postcode must be between 3000 and 3999");
        } else {
            const updatedReviewRecord = await updateReview({
                _id: _id,
                restaurantName: restaurantName,
                isPublic: isPublic,
                priceRange: priceRange,
                rating: rating,
                dateVisited: dateVisited,
                address: address,
                description: description
            });
            if (updatedReviewRecord) {
                alert("Review has been updated!.");
            } else {
                alert("Update unsuccessful. Please try again.");
            }
            navigate(-1);
        }
    };

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
            {!isLoading ? (
                <div className="user-container">
                    {review?.userId._id !== user?._id ? (
                        <Navigate to={`/review/${reviewId}`} />
                    ) : (
                        <>
                            <h1>EDIT</h1>

                            <div id="outer">
                                <div className="switchContainer">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                defaultChecked={review.isPublic}
                                            />
                                        }
                                        label="Public"
                                        onChange={e => {
                                            review.isPublic = e.target.checked;
                                        }}
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
                                        onChange={e => {
                                            review.priceRange = e.target.value;
                                        }}
                                    />
                                </div>

                                <div className="ratingContainer">
                                    <Rating
                                        name="size-medium"
                                        defaultValue={review.rating}
                                        size="medium"
                                        precision={1}
                                        onChange={e => {
                                            review.rating = e.target.value;
                                        }}
                                    />
                                </div>
                            </div>

                            <form>
                                {/* user name field */}
                                <div className="details-container">
                                    <input
                                        type="text"
                                        defaultValue={review.restaurantName}
                                        onChange={e => {
                                            review.restaurantName =
                                                e.target.value;
                                        }}
                                    />
                                </div>

                                <div className="details-container">
                                    <input
                                        type="date"
                                        value={review.dateVisited.slice(0, 10)}
                                        onChange={e => {
                                            review.dateVisited = e.target.value;
                                        }}
                                    />
                                </div>

                                <div className="details-container">
                                    <input
                                        type="text"
                                        defaultValue={
                                            review.address.streetAddress
                                        }
                                        onChange={e => {
                                            review.address.streetAddress =
                                                e.target.value;
                                        }}
                                    />
                                </div>

                                <div id="outerAddress">
                                    <div className="suburb-container">
                                        <input
                                            type="text"
                                            defaultValue={review.address.suburb}
                                            onChange={e => {
                                                review.address.suburb =
                                                    e.target.value;
                                            }}
                                        />
                                    </div>

                                    <div className="state-container">
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="state-select-label">
                                                State
                                            </InputLabel>
                                            <Select
                                                defaultValue={
                                                    review.address.state
                                                }
                                                labelId="state-select-label"
                                                id="state-select"
                                                label="State"
                                                onChange={e => {
                                                    review.address.state =
                                                        e.target.value;
                                                }}
                                            >
                                                <MenuItem value="ACT">
                                                    ACT
                                                </MenuItem>
                                                <MenuItem value="NSW">
                                                    NSW
                                                </MenuItem>
                                                <MenuItem value="NT">
                                                    NT
                                                </MenuItem>
                                                <MenuItem value="QLD">
                                                    QLD
                                                </MenuItem>
                                                <MenuItem value="SA">
                                                    SA
                                                </MenuItem>
                                                <MenuItem value="TAS">
                                                    TAS
                                                </MenuItem>
                                                <MenuItem value="VIC">
                                                    VIC
                                                </MenuItem>
                                                <MenuItem value="WA">
                                                    WA
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div id="outerAddress">
                                    <div className="postcode-container">
                                        <input
                                            type="text"
                                            maxLength="4"
                                            defaultValue={
                                                review.address.postcode
                                            }
                                            onKeyPress={event => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            onChange={e => {
                                                review.address.postcode =
                                                    e.target.value;
                                            }}
                                        />
                                    </div>

                                    <div className="country-container">
                                        <input
                                            type="text"
                                            placeholder="Australia"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="details-container">
                                    <textarea
                                        type="text"
                                        defaultValue={review.description}
                                        onChange={e => {
                                            review.description = e.target.value;
                                        }}
                                    />
                                </div>

                                <div className="add-image-text">
                                    <p>Add your image</p>
                                </div>

                                <div>
                                    <button className="addImageButton">
                                        <img
                                            className="addImage"
                                            src={addImage}
                                        />
                                    </button>
                                </div>

                                <div>
                                    <button
                                        className="editReviewButton"
                                        type="button"
                                        onClick={() => {
                                            submitUpdatedReview(
                                                review._id,
                                                review.restaurantName,
                                                review.isPublic,
                                                review.priceRange,
                                                review.rating,
                                                review.dateVisited,
                                                review.address,
                                                review.description
                                            );
                                        }}
                                    >
                                        DONE
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default EditReview;
