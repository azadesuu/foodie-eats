import "./index.css";
import "@fontsource/martel-sans";

import addImage from "../../assets/images/addImage.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";

import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createReview, getProfile } from "../../api";

function PostReview() {
    const [user1, setUser1] = useContext(UserContext);
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
    const [currentPublicity, setPublicity] = useState("false");
    const [currentPriceRange, setPriceRange] = useState("1");

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
        description
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
        } else if (parseInt(postcode) < 3000 || parseInt(postcode) > 3999) {
            alert("postcode must be between 3000 and 3999");
        } else if (!description) {
            alert("description is missing");
        } else {
            const address = {
                street_address: streetAddress,
                postcode: postcode,
                state: state,
                suburb: suburb
            };
            const review = await createReview({
                userId: user1?._id,
                restaurantName: restaurantName,
                isPublic: isPublic,
                priceRange: priceRange,
                rating: rating,
                dateVisited: dateVisited,
                address: address,
                description: description
            });
            if (!review) {
                alert("creation unsucessful.");
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
        <div className="profile-info">
            {!userProfile && <CircularProgress className="spinner" />}
            {userProfile && (
                <div className="user-container">
                    <h1>POST</h1>

                    <div id="outer">
                        <div className="switchContainer">
                            <FormControlLabel
                                control={<Switch />}
                                label="Public"
                                onChange={e => {
                                    setPublicity(e.target.checked);
                                }}
                            />
                        </div>

                        <div className="sliderContainer">
                            <Slider
                                defaultValue={0}
                                step={1}
                                marks={marks}
                                min={1}
                                max={4}
                                track={false}
                                onChange={e => {
                                    setPriceRange(e.target.value);
                                }}
                            />
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
                            />
                        </div>

                        <div className="details-container">
                            <input
                                type="date"
                                placeholder="date you visited DD/MM/YY"
                                onChange={e => {
                                    setDate(e.target.value);
                                }}
                            />
                        </div>

                        <div className="details-container">
                            <input
                                type="text"
                                placeholder="street address"
                                onChange={e => {
                                    setStreetAddress(e.target.value);
                                }}
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
                                />
                            </div>

                            <div className="state-container">
                                <FormControl fullWidth size="small">
                                    <InputLabel id="state-select-label">
                                        State
                                    </InputLabel>
                                    <Select
                                        labelId="state-select-label"
                                        id="state-select"
                                        label="State"
                                        onChange={e => {
                                            setState(e.target.value);
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

                        <div className="details-container">
                            <textarea
                                type="text"
                                placeholder="description..."
                                onChange={e => {
                                    setDescription(e.target.value);
                                }}
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
                                        currentDescription
                                    );
                                }}
                            >
                                POST
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PostReview;
