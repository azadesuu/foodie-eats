import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./ReviewPeek.css";

const theme = createTheme({
    palette: {
        background: {
            green: "#BEE5B0",
            grey: "#ECE7E5",
            white: "#FFFCFB"
        },
        text: {
            main: "#000000"
        },
        img: {
            main: "#000000"
        }
    }
});

const ReviewPeek = props => {
    const navigate = useNavigate();
    const {
        _id,
        restaurantName,
        userId,
        rating,
        likeCount,
        dateVisited,
        description,
        images
    } = props.reviewData;
    const [username, setUsername] = useState(userId.username);

    function viewReview() {
        navigate(`/review/${_id}`);
    }

    return (
        <ThemeProvider theme={theme}>
            <List
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <ListItemButton
                    onClick={event => {
                        viewReview();
                    }}
                    alignItems="flex-start"
                    sx={{
                        width: "95%",
                        bgcolor: "background.white",
                        borderRadius: "10px",
                        marginRight: "10px",
                        minHeight: "146px",
                        boxShadow: "0 5px 5px rgba(0, 0, 0, 0.25)",
                        "&:hover": { bgcolor: "white" }
                    }}
                >
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <div className="t1">
                                    <Typography
                                        variant="body2"
                                        display="inline"
                                        fontSize="10px"
                                        fontFamily="Martel Sans"
                                        marginBottom={0.2}
                                    >
                                        Date visited:{" "}
                                        {new Date(
                                            dateVisited
                                        ).toLocaleDateString("en-GB")}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        display="inline"
                                        fontSize="10px"
                                        fontFamily="Martel Sans"
                                    >
                                        By {username}
                                    </Typography>
                                </div>
                                <div className="line2"></div>
                                <div className="t2">
                                    <Typography
                                        variant="h5"
                                        fontSize="15px"
                                        fontFamily="Martel Sans"
                                        display="inline"
                                    >
                                        {restaurantName}
                                    </Typography>
                                    <div className="like">
                                        <ThumbUpIcon sx={{ fontSize: 15 }} />
                                        <Typography
                                            variant="body2"
                                            fontSize="10px"
                                            fontFamily="Martel Sans"
                                            display="inline"
                                            mt="1px"
                                        >
                                            {likeCount}
                                        </Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Rating
                                    name="read-only"
                                    value={rating}
                                    size="small"
                                    readOnly
                                />
                                <Typography
                                    variant="body2"
                                    fontSize="10px"
                                    fontFamily="Martel Sans"
                                >
                                    {description.length <= 70
                                        ? description
                                        : description.substr(0, 70) + "..."}
                                    <a
                                        onClick={event => {
                                            viewReview();
                                        }}
                                        id="link"
                                    >
                                        Read More
                                    </a>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    fontSize="10px"
                                    fontFamily="Martel Sans"
                                    display="flex"
                                    justifyContent="flex-end"
                                    mb="0px"
                                >
                                    {/* +{images.length} images */}
                                    +2 images
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            </List>
        </ThemeProvider>
    );
};

export default ReviewPeek;
