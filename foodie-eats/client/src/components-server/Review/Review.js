
import './Review.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import "@fontsource/martel-sans";

import addImage from './../../assets/addImage.png'
import { useNavigate } from 'react-router-dom';

import Slider from '@mui/material/Slider'
import Rating from '@mui/material/Rating'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel';
import Moment from 'moment';

function Review() {
    const navigate = useNavigate();
    const [Review, setReview] = useState([]);

    const marks = [
        {
            value: 1,
            label: '$',
        },
        {
            value: 2,
            label: '$$',
        },
        {
            value: 3,
            label: '$$$',
        },
        {
            value: 4,
            label: '$$$$',
        },
    ];

    useEffect(() => {
        Axios.get("http://localhost:5000/review/getReview").then((response) => {
            setReview(response.data)
        });
    }, []);

    console.log(Review);

    return (

        <div className="profile-info">
            {Review.map((review) => {
                return (
                    <div className="user-container">

                        <h1>Review</h1>

                        <div id="outer">
                            <div className='switchContainer'>
                                <FormControlLabel control={<Switch checked={review.isPublic} />} label="Public" />
                            </div>

                            <div className='sliderContainer'>
                                <Slider defaultValue={review.priceRange} step={1} marks={marks} min={1} max={4} track={false} disabled />
                            </div>

                            <div className='ratingContainer'>
                                <Rating name="size-medium" defaultValue={review.rating} size="medium" precision={1} disabled />
                            </div>
                        </div>



                        <form>
                            {/* user name field */}
                            <div className='details-container'>
                                <input type="text" placeholder={review.restaurantName} disabled />
                            </div>

                            <div className='details-container'>

                                <input type="text" placeholder={Moment(review.dateVisited).format('MMMM Do, YYYY')} disabled />
                            </div>

                            <div className='details-container'>
                                <input type="text" placeholder={review.address.street_address} disabled />
                            </div>

                            <div id="outerAddress">
                                <div className='suburb-container'>
                                    <input type="text" placeholder={review.address.suburb} disabled />
                                </div>

                                <div className='state-container'>
                                    <input type="text" placeholder={review.address.state} disabled />
                                </div>
                            </div>

                            <div id="outerAddress">
                                <div className='postcode-container'>
                                    <input type="text" placeholder={review.address.postcode} disabled />
                                </div>
                                <div className='country-container'>
                                    <input type="text" placeholder={review.address.country} disabled />
                                </div>
                            </div>


                            <div className='details-container'>
                                <textarea type="text" placeholder={review.description} disabled />
                            </div>

                            <div className='add-image-text'>
                                <p>Add your image</p>
                            </div>

                            <div>
                                <button className="addImageButton">
                                    <img className="addImage" src={addImage} />
                                </button>
                            </div>

                            <div>
                                <button className="editReviewButton" type="button" onClick={() => {
                                    navigate("./../edit-review")
                                }}>
                                    EDIT
                                </button>
                            </div>


                        </form>

                    </div>
                );
            })}
        </div>
    );
}

export default Review