import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./PostReview.css";

import "@fontsource/martel-sans";

import addImage from "../../assets/images/addImage.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TagsInput } from "react-tag-input-component";
import { UserContext } from "../../actions/UserContext";

import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createReview, getProfile } from "../../api";

import { uploadNewImage } from "../../api";

function PostReview() {
    const [user1] = useContext(UserContext);
    const { data: userProfile, isLoading } = useQuery(
        "my-user",
        () => getProfile(user1?.username),
        { enabled: !!user1?.username }
    );

    const navigate = useNavigate();

    const [currentRestaurantName, setRestaurantName] = useState("");

    const [currentDate, setDate] = useState("");

    const [currentStreetAddress, setStreetAddress] = useState("");
    const [currentState, setState] = useState("");
    const [currentSuburb, setSuburb] = useState("");
    const [currentPostcode, setPostcode] = useState("");

    const [currentDescription, setDescription] = useState("");
    const [currentRating, setRating] = useState("2");
    const [currentPublicity, setPublicity] = useState(false);
    const [currentPriceRange, setPriceRange] = useState("1");
    const [tags, setTags] = useState([]);

    //images
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const imageHandler = async () => {
        try {
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
    const onImageChange = async event => {
        if (event.target.files && event.target.files[0]) {
            await setImage(event.target.files[0]);
            await setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const postReview = async (
        restaurantName,
        isPublic,
        priceRange,
        rating,
        dateVisited,
        streetAddress,
        state,
        suburb,
        postcode,
        description,
        tags
    ) => {
        if (!restaurantName) {
            alert("restaurant name is missing");
        } else if (!dateVisited) {
            alert("date is missing");
        } else if (!streetAddress) {
            alert("street address is missing");
        } else if (!suburb) {
            alert("suburb is missing");
        } else if (!state) {
            alert("state is missing");
        } else if (!postcode) {
            alert("postcode is missing");
        } else if (!/^(0[289][0-9]{2})|([1-9][0-9]{3})$/.test(postcode)) {
            alert("Postcode is invalid.");
        } else if (!description) {
            alert("description is missing");
        } else if (image?.size / 1024 / 1024 > 10) {
            alert("image is too big!");
        } else {
            const address = {
                streetAddress: streetAddress,
                postcode: postcode,
                state: state,
                suburb: suburb
            };

            const url = await imageHandler();

            const review = await createReview({
                userId: user1?._id,
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
            if (!review) {
                alert("creation unsuccessful.");
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
        <div className="content-PostReview">
            <SEO data={allSEO.postreview} />

            {isLoading && (
                <CircularProgress className="spinner" sx={{ ml: 0 }} />
            )}
            {!isLoading && userProfile && (
                <div className="user-container">
                    <h1>POST</h1>
                    <span className="smallScreen-CreateReview">
                        <div id="outer">
                            <div className="r1">
                                <div className="switchContainer">
                                    <FormControlLabel
                                        sx={{
                                            gap: "5px"
                                        }}
                                        control={
                                            <Switch
                                                value="checked"
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
                                            />
                                        }
                                        checked={currentPublicity}
                                        label={
                                            currentPublicity
                                                ? "Public"
                                                : "Private"
                                        }
                                        onChange={e => {
                                            setPublicity(e.target.checked);
                                        }}
                                    />
                                </div>

                                <div className="sliderContainer">
                                    <Slider
                                        id="post-price"
                                        size="small"
                                        defaultValue={0}
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={4}
                                        track={false}
                                        onChange={e => {
                                            setPriceRange(e.target.value);
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
                                    defaultValue={1}
                                    size="medium"
                                    precision={1}
                                    onChange={e => {
                                        setRating(e.target.value);
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
                                    onChange={e => {
                                        setRestaurantName(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="details-container">
                                <input
                                    type="date"
                                    placeholder="date you visited DD/MM/YY"
                                    value={new Date()}
                                    onChange={e => {
                                        setDate(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="details-container">
                                <input
                                    type="text"
                                    placeholder="street address"
                                    onChange={e => {
                                        setStreetAddress(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div id="outerAddress">
                                <div className="suburb-container">
                                    <input
                                        type="text"
                                        placeholder="suburb"
                                        onChange={e => {
                                            setSuburb(e.target.value);
                                        }}
                                        required
                                    />
                                </div>

                                <div className="state-container">
                                    <FormControl fullWidth size="small">
                                        <InputLabel
                                            shrink={false}
                                            id="state-select-label"
                                            sx={{
                                                fontSize: "14px"
                                            }}
                                        >
                                            {currentState === "" ? "state" : ""}
                                        </InputLabel>
                                        <Select
                                            labelId="state-select-label"
                                            id="state-select"
                                            value={currentState}
                                            onChange={e => {
                                                setState(e.target.value);
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
                                        onKeyPress={event => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        onChange={e => {
                                            setPostcode(e.target.value);
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
                                        placeholder="description..."
                                        maxLength={150}
                                        onChange={e => {
                                            setDescription(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                                <div className="tags-input">
                                    <TagsInput
                                        name="tags"
                                        value={tags}
                                        placeHolder="#tags"
                                        maxLength={20}
                                        onChange={setTags}
                                    />
                                </div>
                                <span className="helper-text-post">
                                    maximum of 150 characters
                                </span>
                            </div>
                            <div className="add-image">
                                <label>
                                    Add your images here
                                    <br /> Click upload again to remove image.
                                    <input
                                        type="file"
                                        name="myImage"
                                        onChange={event => onImageChange(event)}
                                        accept="image/png, image/jpg, image/jpeg"
                                        onClick={e => {
                                            e.target.value = null;
                                            setPreviewImage(null);
                                            setImage(null);
                                        }}
                                        required
                                    />
                                </label>
                                {previewImage ? (
                                    <label>
                                        <img
                                            src={previewImage}
                                            alt="preview image"
                                            width={100}
                                            height={100}
                                        />
                                        <br />
                                    </label>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                            <div>
                                <button
                                    id="btn"
                                    className="postReviewButton"
                                    type="button"
                                    onClick={() => {
                                        postReview(
                                            currentRestaurantName,
                                            currentPublicity,
                                            currentPriceRange,
                                            currentRating,
                                            new Date(currentDate),
                                            currentStreetAddress,
                                            currentState,
                                            currentSuburb,
                                            currentPostcode,
                                            currentDescription,
                                            tags
                                        );
                                    }}
                                >
                                    POST
                                </button>
                            </div>
                        </form>
                    </span>
                    <span className="bigScreen-CreateReview">
                        <div id="outer">
                            <div className="switchContainer">
                                <FormControlLabel
                                    sx={{
                                        gap: "5px"
                                    }}
                                    control={
                                        <Switch
                                            value="checked"
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
                                        />
                                    }
                                    checked={currentPublicity}
                                    label={
                                        currentPublicity ? "Public" : "Private"
                                    }
                                    onChange={e => {
                                        setPublicity(!currentPublicity);
                                    }}
                                />
                            </div>
                            <div className="r2">
                                <div className="ratingContainer">
                                    <Rating
                                        name="size-medium"
                                        defaultValue={1}
                                        size="medium"
                                        precision={1}
                                        onChange={e => {
                                            setRating(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="sliderContainer">
                                    <Slider
                                        id="post-price"
                                        size="small"
                                        defaultValue={0}
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={4}
                                        track={false}
                                        onChange={e => {
                                            setPriceRange(e.target.value);
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
                                            onChange={e => {
                                                setRestaurantName(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="details-container">
                                        <input
                                            type="date"
                                            placeholder="date you visited DD/MM/YY"
                                            onChange={e => {
                                                setDate(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="description-tags">
                                        <div className="details-container">
                                            <textarea
                                                type="text"
                                                placeholder="description..."
                                                maxLength={150}
                                                onChange={e => {
                                                    setDescription(
                                                        e.target.value
                                                    );
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="tags-input">
                                            <TagsInput
                                                name="tags"
                                                value={tags}
                                                placeHolder="#tags"
                                                maxLength={20}
                                                onChange={setTags}
                                            />
                                        </div>
                                        <span className="helper-text-post">
                                            Maximum of 150 characters
                                        </span>
                                    </div>
                                </div>
                                <div className="r3-content2">
                                    <div className="details-container">
                                        <input
                                            type="text"
                                            placeholder="street address"
                                            onChange={e => {
                                                setStreetAddress(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                    </div>

                                    <div id="outerAddress">
                                        <div className="suburb-container">
                                            <input
                                                type="text"
                                                placeholder="suburb"
                                                onChange={e => {
                                                    setSuburb(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className="state-container">
                                            <FormControl fullWidth size="small">
                                                <InputLabel
                                                    shrink={false}
                                                    id="state-select-label"
                                                    sx={{
                                                        fontSize: "14px"
                                                    }}
                                                >
                                                    {currentState === ""
                                                        ? "state"
                                                        : ""}
                                                </InputLabel>
                                                <Select
                                                    labelId="state-select-label"
                                                    id="state-select"
                                                    value={currentState}
                                                    onChange={e => {
                                                        setState(
                                                            e.target.value
                                                        );
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
                                                onKeyPress={event => {
                                                    if (
                                                        !/[0-9]/.test(event.key)
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                onChange={e => {
                                                    setPostcode(e.target.value);
                                                }}
                                                required
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
                                        <label>
                                            Add your images here
                                            <br /> Click upload again to remove
                                            image.
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
                                                }}
                                                required
                                            />
                                        </label>
                                        {previewImage ? (
                                            <label>
                                                <img
                                                    src={previewImage}
                                                    alt="preview image"
                                                    width={100}
                                                    height={100}
                                                />
                                                <br />
                                            </label>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    id="btn"
                                    className="postReviewButton"
                                    type="button"
                                    onClick={() => {
                                        postReview(
                                            currentRestaurantName,
                                            currentPublicity,
                                            currentPriceRange,
                                            currentRating,
                                            new Date(currentDate),
                                            currentStreetAddress,
                                            currentState,
                                            currentSuburb,
                                            currentPostcode,
                                            currentDescription,
                                            tags
                                        );
                                    }}
                                >
                                    POST
                                </button>
                            </div>
                        </form>
                    </span>
                </div>
            )}
        </div>
    );
}

export default PostReview;
