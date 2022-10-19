import "./EditReview.css";
import "@fontsource/martel-sans";
import addImage from "../../assets/images/addImage.png";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { updateReview, getReview, deleteReview } from "../../api";
import { TagsInput } from "react-tag-input-component";

import DeleteIcon from "@mui/icons-material/Delete";

import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import Moment from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress
} from "@mui/material";
import NavLoggedIn from "../LoggedInNavBar";

function EditReview() {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const { reviewId } = useParams();
    const { data: review, isLoading } = useQuery(
        "view-review",
        () => getReview(reviewId),
        { enabled: !!reviewId }
    );
    const [currentPublicity, setPublicity] = useState(review.isPublic);
    const [tags, setTags] = useState([]);
    const confirmDelete = async () => {
        const review = await deleteReview(reviewId);
        if (review) {
            alert("Review deleted.");
            navigate("/my-reviews");
        } else {
            alert("An error occured, please try again later");
        }
    };

    useEffect(() => {
        if (review?.userId._id !== user?._id) {
            alert("You have no permission to edit this review");
            navigate(-1);
        }
    }, [user]);

    const submitUpdatedReview = async (
        _id,
        restaurantName,
        isPublic,
        priceRange,
        rating,
        dateVisited,
        address,
        description,
        tags
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
            !/^(0[289][0-9]{2})|([1-9][0-9]{3})$/.test(address.postcode)
        ) {
            alert("Postcode is invalid.");
        } else {
            const updatedReviewRecord = await updateReview({
                _id: _id,
                restaurantName: restaurantName,
                isPublic: isPublic,
                priceRange: priceRange,
                rating: rating,
                dateVisited: dateVisited,
                address: address,
                description: description,
                tags: tags
            });
            if (!review) {
                alert("update unsuccessful.");
            }
            navigate(`/review/${review?._id}`);
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
        <div className="content-EditReview">
            <NavLoggedIn />
            {isLoading && <CircularProgress className="spinner" />}
            {review && (
                <div className="user-container">
                    <div className="Edit-title">
                        <h1>EDIT</h1>
                        <DeleteIcon
                            onClick={e => {
                                if (
                                    window.confirm(
                                        "Are you sure you wish to delete this review?"
                                    )
                                )
                                    confirmDelete();
                            }}
                            sx={{
                                fontSize: "35px",
                                textAlign: "end",
                                marginBottom: "10px",
                                marginLeft: "40px"
                            }}
                            onClick={e => {
                                if (
                                    window.confirm(
                                        "Are you sure you wish to delete this review?"
                                    )
                                )
                                    confirmDelete();
                            }}
                        />
                    </div>
                    <span className="smallScreen-EditReview">
                        <div id="outer">
                            <div className="r1">
                                <div className="switchContainer">
                                    <FormControlLabel
                                        sx={{
                                            gap: "5px"
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
                                                        transitionDuration:
                                                            "300ms",
                                                        "&.Mui-checked": {
                                                            transform:
                                                                "translateX(16px)",
                                                            color: "#FFFCFB",
                                                            "& + .MuiSwitch-track": {
                                                                backgroundColor:
                                                                    "#D9D9D9",
                                                                opacity: 1,
                                                                border: 0
                                                            },
                                                            "&.Mui-disabled + .MuiSwitch-track": {
                                                                opacity: 0.5
                                                            }
                                                        }
                                                    },
                                                    "& .MuiSwitch-thumb": {
                                                        boxSizing: "border-box",
                                                        width: 16,
                                                        height: 16
                                                    },
                                                    "& .MuiSwitch-track": {
                                                        borderRadius: "10px",
                                                        bgcolor: "#A9CABB",
                                                        opacity: 1
                                                    }
                                                }}
                                                defaultChecked={
                                                    currentPublicity
                                                }
                                            />
                                        }
                                        label={
                                            currentPublicity
                                                ? "Public"
                                                : "Private"
                                        }
                                        onChange={e => {
                                            review.isPublic = e.target.checked;
                                            setPublicity(e.target.checked);
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
                                                borderRadius: "5px"
                                            }
                                        }}
                                    />
                                </div>
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
                                        review.restaurantName = e.target.value;
                                    }}
                                />
                            </div>

                            <div className="details-container">
                                <input
                                    type="date"
                                    value={Moment(review.dateVisited).format(
                                        "YYYY-MM-DD"
                                    )}
                                    onChange={e => {
                                        review.dateVisited = e.target.value;
                                    }}
                                />
                            </div>

                            <div className="details-container">
                                <input
                                    type="text"
                                    defaultValue={review.address.streetAddress}
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
                                        <Select
                                            defaultValue={review.address.state}
                                            labelId="state-select-label"
                                            id="state-select"
                                            label="State"
                                            onChange={e => {
                                                review.address.state =
                                                    e.target.value;
                                            }}
                                            sx={{
                                                ".MuiOutlinedInput-notchedOutline": {
                                                    border: 0
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    border: "none"
                                                }
                                            }}
                                        >
                                            <MenuItem value="ACT">ACT</MenuItem>
                                            <MenuItem value="NSW">NSW</MenuItem>
                                            <MenuItem value="NT">NT</MenuItem>
                                            <MenuItem value="QLD">QLD</MenuItem>
                                            <MenuItem value="SA">SA</MenuItem>
                                            <MenuItem value="TAS">TAS</MenuItem>
                                            <MenuItem value="VIC">VIC</MenuItem>
                                            <MenuItem value="WA">WA</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div id="outerAddress">
                                <div className="postcode-container">
                                    <input
                                        type="text"
                                        maxlength="4"
                                        defaultValue={review.address.postcode}
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
                            <div className="description-tags">
                                <div className="details-container">
                                    <textarea
                                        type="text"
                                        defaultValue={review.description}
                                        onChange={e => {
                                            review.description = e.target.value;
                                        }}
                                    />
                                </div>
                                <div className="tags-input">
                                    <TagsInput
                                        name="tags"
                                        value={review.tags}
                                        placeHolder="#tags"
                                        onChange={setTags}
                                    />
                                </div>
                            </div>
                            <div className="add-image">
                                <button className="addImageButton">
                                    <img className="addImage" src={addImage} />
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
                                            review.description,
                                            tags
                                        );
                                    }}
                                >
                                    DONE
                                </button>
                            </div>
                        </form>
                    </span>
                    <span className="bigScreen-EditReview">
                        <div id="outer">
                            <div className="switchContainer">
                                <FormControlLabel
                                    sx={{
                                        gap: "5px"
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
                                                        transform:
                                                            "translateX(16px)",
                                                        color: "#FFFCFB",
                                                        "& + .MuiSwitch-track": {
                                                            backgroundColor:
                                                                "#D9D9D9",
                                                            opacity: 1,
                                                            border: 0
                                                        },
                                                        "&.Mui-disabled + .MuiSwitch-track": {
                                                            opacity: 0.5
                                                        }
                                                    }
                                                },
                                                "& .MuiSwitch-thumb": {
                                                    boxSizing: "border-box",
                                                    width: 16,
                                                    height: 16
                                                },
                                                "& .MuiSwitch-track": {
                                                    borderRadius: "10px",
                                                    bgcolor: "#A9CABB",
                                                    opacity: 1
                                                }
                                            }}
                                            defaultChecked={currentPublicity}
                                        />
                                    }
                                    label={
                                        currentPublicity ? "Public" : "Private"
                                    }
                                    onChange={e => {
                                        review.isPublic = e.target.checked;
                                        setPublicity(e.target.checked);
                                    }}
                                />
                            </div>
                            <div className="r2">
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
                                                borderRadius: "5px"
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <form>
                            {/* user name field */}
                            <div className="r3">
                                <div className="r3-content1">
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
                                            value={Moment(
                                                review.dateVisited
                                            ).format("YYYY-MM-DD")}
                                            onChange={e => {
                                                review.dateVisited =
                                                    e.target.value;
                                            }}
                                        />
                                    </div>
                                    <div className="description-tags">
                                        <div className="details-container">
                                            <textarea
                                                type="text"
                                                defaultValue={
                                                    review.description
                                                }
                                                onChange={e => {
                                                    review.description =
                                                        e.target.value;
                                                }}
                                            />
                                        </div>
                                        <div className="tags-input">
                                            <TagsInput
                                                name="tags"
                                                value={review.tags}
                                                placeHolder="#tags"
                                                onChange={setTags}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="r3-content2">
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
                                                defaultValue={
                                                    review.address.suburb
                                                }
                                                onChange={e => {
                                                    review.address.suburb =
                                                        e.target.value;
                                                }}
                                            />
                                        </div>

                                        <div className="state-container">
                                            <FormControl fullWidth size="small">
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
                                                    sx={{
                                                        ".MuiOutlinedInput-notchedOutline": {
                                                            border: 0
                                                        },
                                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            border: "none"
                                                        }
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
                                                maxlength="4"
                                                defaultValue={
                                                    review.address.postcode
                                                }
                                                onKeyPress={event => {
                                                    if (
                                                        !/[0-9]/.test(event.key)
                                                    ) {
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
                                    <div className="add-image">
                                        <button className="addImageButton">
                                            <img
                                                className="addImage"
                                                src={addImage}
                                            />
                                        </button>
                                    </div>
                                </div>
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
                                            review.description,
                                            tags
                                        );
                                    }}
                                >
                                    DONE
                                </button>
                            </div>
                        </form>
                    </span>
                </div>
            )}
            <div className="footer">
                <p>Copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}

export default EditReview;
