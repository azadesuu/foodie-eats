// tags code is from Theashish Maurya
// https://blog.theashishmaurya.me/how-to-create-a-tag-input-feature-in-reactjs-and-material-ui

import "./index.css";
import "../../actions/script";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../../actions/UserContext";
import { getMyReviews } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState, useContext } from "react";

function NewReview() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    // state hook functions
    // restaurant details
    const [restaurantName, setRestaurantName] = useState("");
    const [street, setStreet] = useState("");
    const [postcode, setPostcode] = useState(3000);
    const [state, setState] = useState("");
    const [suburb, setSuburb] = useState("");
    const [country, setCountry] = useState("");
    // price, rating
    const [priceRange, setPriceRange] = useState(1);
    const [rating, setRating] = useState(1);
    //review details
    const [description, setDescription] = useState("");
    //  const [images, setImage] = useState(""); //unavailable at the moment
    const [tags, SetTags] = useState([]);
    const [publicBool, setPublicBool] = useState(false);

    const Tags = ({ data, handleDelete }) => {
        return (
            <Box
                sx={{
                    background: "#283240",
                    height: "100%",
                    display: "flex",
                    padding: "0.4rem",
                    margin: "0 0.5rem 0 0",
                    justifyContent: "center",
                    alignContent: "center",
                    color: "#ffffff"
                }}
            >
                <Stack direction="row" gap={1}>
                    <Typography>{data}</Typography>
                    <Cancel
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            handleDelete(data);
                        }}
                    />
                </Stack>
            </Box>
        );
    };

    const tagRef = useRef();

    const handleDelete = value => {
        const newtags = tags.filter(val => val !== value);
        SetTags(newtags);
    };
    const handleOnSubmit = e => {
        e.preventDefault();
        SetTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleOnSubmit}>
                <TextField
                    inputRef={tagRef}
                    fullWidth
                    variant="standard"
                    size="small"
                    sx={{ margin: "1rem 0" }}
                    margin="none"
                    placeholder={tags.length < 5 ? "Enter tags" : ""}
                    InputProps={{
                        startAdornment: (
                            <Box
                                sx={{
                                    margin: "0 0.2rem 0 0",
                                    display: "flex"
                                }}
                            >
                                {tags.map((data, index) => {
                                    return (
                                        <Tags
                                            data={data}
                                            handleDelete={handleDelete}
                                            key={index}
                                        />
                                    );
                                })}
                            </Box>
                        )
                    }}
                />
            </form>
        </Box>
    );
}

export default NewReview;
