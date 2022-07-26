import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./EditReview.css";
import "@fontsource/martel-sans";

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
import Alert from "@mui/material/Alert";
import Moment from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, Select, MenuItem, CircularProgress } from "@mui/material";
import { deleteNewImage, uploadNewImage } from "../../api";

function EditReview() {
    const navigate = useNavigate();
    const [user] = useContext(UserContext);

    const { reviewId } = useParams();
    const { data: review, isLoading } = useQuery(
        "view-review",
        () => getReview(reviewId),
        { enabled: !!reviewId }
    );
    const [currentPublicity, setPublicity] = useState(false);
    const [tags, setTags] = useState([]);

    //images
    const [previousImage, setPreviousImage] = useState(null);
    const [newImage, setNewImage] = useState(false);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [editReview, setEditReview] = useState(false);

    useEffect(() => {
        if (!review || !user) {
            navigate(-1);
        } else if (review?.userId._id !== user?._id) {
            setEditReview(true);
            setAlertStatus("warning");
            setAlertMessage("You have no permission to edit this review.");
            setTimeout(function() {
                navigate(-1);
            }, 2000);
        }
        setPublicity(review?.isPublic);
        setPreviousImage(review?.reviewImage ? review?.reviewImage : "");
        setPreviewImage(review?.reviewImage ? review?.reviewImage : "");
    }, [review, user, navigate, editReview]);

    const imageHandler = async () => {
        try {
            if (!newImage) return previousImage;
            else await deleteImageHandler(previousImage);
            if (!image) return "";
            else {
                const formData = new FormData();
                formData.set("image", image);
                const result = await uploadNewImage({
                    file: formData
                });
                return result;
            }
        } catch (err) {
            alert(err);
        }
    };

    async function deleteImageHandler(url) {
        if (url && (url !== "" || url !== undefined || url != null)) {
            try {
                const deleted = await deleteNewImage({ url: url });
                if (deleted) {
                    return true;
                } else {
                    setEditReview(true);
                    setAlertStatus("error");
                    setAlertMessage("Error occured, image was not deleted.");
                }
            } catch (err) {
                alert(err);
            }
        }
    }
    const onImageChange = async event => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setNewImage(true);
        }
    };

    const confirmDelete = async () => {
        const review = await deleteReview(reviewId);
        if (review) {
            setEditReview(true);
            setAlertStatus("success");
            setAlertMessage("Review deleted.");
            setTimeout(function() {
                navigate("/my-reviews");
            }, 2000);
        } else {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("An error occured, please try again later.");
        }
    };

    const submitUpdatedReview = async (
        _id,
        userId,
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
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Restaurant name is missing.");
        } else if (!dateVisited) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Date is missing.");
        } else if (!userId) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("User doesn't exist.");
        } else if (!address.streetAddress) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Street address is missing.");
        } else if (!address.suburb) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Suburb is missing.");
        } else if (!address.state) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("State is missing.");
        } else if (!address.postcode) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Postcode is missing.");
        } else if (!description) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Description is missing.");
        } else if (
            !/^(0[289][0-9]{2})|([1-9][0-9]{3})$/.test(address.postcode)
        ) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Postcode is invalid.");
        } else if (image?.size / 1024 / 1024 > 10) {
            setEditReview(true);
            setAlertStatus("error");
            setAlertMessage("Image is too big!");
        } else {
            const url = await imageHandler();

            const updatedReviewRecord = await updateReview({
                _id: _id,
                userId: userId,
                restaurantName: restaurantName,
                isPublic: isPublic,
                reviewImage: url,
                priceRange: priceRange,
                rating: rating,
                dateVisited: dateVisited,
                address: address,
                description: description,
                tags: tags
            });
            if (!updatedReviewRecord) {
                setEditReview(true);
                setAlertStatus("error");
                setAlertMessage("Update unsuccessful!");
            } else {
                navigate(`/review/${review?._id}`);
            }
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
            <SEO data={allSEO.editreview} />
            {isLoading && <CircularProgress className="spinner" />}
            {!isLoading && review && user && (
                <div className="user-container">
                    <div className="Edit-title">
                        <h1>EDIT</h1>
                        <DeleteIcon
                            sx={{
                                fontSize: "35px",
                                textAlign: "end",
                                marginBottom: "10px",
                                marginLeft: "40px",
                                cursor: "pointer"
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
                                        id="post-price"
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
                                    placeholder="restaurant name"
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
                                    placeholder="street address"
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
                                        placeholder="suburb"
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
                                        maxLength="4"
                                        placeholder="postcode"
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
                                        maxLength={160}
                                        placeholder="description..."
                                        defaultValue={review.description}
                                        onChange={e => {
                                            review.description = e.target.value;
                                        }}
                                    />
                                </div>
                                <div className="tags-input">
                                    <TagsInput
                                        name="tags"
                                        maxLength={20}
                                        value={review.tags}
                                        placeHolder="#tags"
                                        onChange={setTags}
                                    />
                                </div>
                            </div>
                            <div className="add-image">
                                {previewImage ? (
                                    <>
                                        <label>
                                            Add your images here
                                            <br />
                                            Click upload again to remove image.
                                            <input
                                                type="file"
                                                name="myImage"
                                                onChange={event =>
                                                    onImageChange(event)
                                                }
                                                accept="image/png, image/jpg, image/jpeg"
                                                onClick={e => {
                                                    e.target.value = null;
                                                    setPreviewImage(null);
                                                    setNewImage(true);
                                                }}
                                                required
                                            />
                                        </label>
                                        <label>
                                            <img
                                                src={previewImage}
                                                alt="preview"
                                                width={100}
                                                height={100}
                                            />
                                            <br />
                                        </label>
                                    </>
                                ) : (
                                    <label>
                                        Add your images here
                                        <input
                                            type="file"
                                            name="myImage"
                                            onChange={event =>
                                                onImageChange(event)
                                            }
                                            accept="image/png, image/jpg, image/jpeg"
                                            onClick={e => {
                                                e.target.value = null;
                                                setPreviewImage(null);
                                                setNewImage(true);
                                            }}
                                            required
                                        />
                                    </label>
                                )}
                            </div>
                            <div>
                                <button
                                    id="btn"
                                    className="editReviewButton"
                                    type="button"
                                    onClick={() => {
                                        submitUpdatedReview(
                                            review._id,
                                            review.userId._id,
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
                                        id="post-price"
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
                                            placeholder="restaurant name"
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
                                                placeholder="description..."
                                                maxLength={160}
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
                                                maxLength={20}
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
                                            placeholder="street address"
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
                                                placeholder="suburb"
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
                                                maxLength="4"
                                                placeholder="postcode"
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
                                        {previewImage ? (
                                            <label>
                                                Add your images here
                                                <br /> Click upload again to
                                                remove image.
                                            </label>
                                        ) : (
                                            <label>Add your images here</label>
                                        )}
                                        <label>
                                            <input
                                                type="file"
                                                name="myImage"
                                                onChange={event =>
                                                    onImageChange(event)
                                                }
                                                accept="image/png, image/jpg, image/jpeg"
                                                onClick={e => {
                                                    e.target.value = null;
                                                    setPreviewImage(null);
                                                    setImage(null);
                                                    setNewImage(true);
                                                }}
                                                required
                                            />
                                        </label>
                                        {previewImage ? (
                                            <label>
                                                <img
                                                    src={previewImage}
                                                    alt="preview"
                                                    width={100}
                                                    height={100}
                                                />
                                                <br />
                                            </label>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    id="btn"
                                    className="editReviewButton"
                                    type="button"
                                    onClick={() => {
                                        submitUpdatedReview(
                                            review._id,
                                            review.userId._id,
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
            {editReview ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "20px"
                    }}
                >
                    {alertMessage}
                </Alert>
            ) : (
                <></>
            )}
        </div>
    );
}

export default EditReview;
