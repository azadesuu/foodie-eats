import "./index.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { getCommunityRecent, getCommunityMostLiked } from "../../api";

function Community() {
    const reviewQueryRecent = useQuery("listOfReviews", getCommunityRecent);
    const { data: listOfReviews, isLoading, error } = reviewQueryRecent;
    const reviewQueryLikes = useQuery(
        "listOfReviewsByLikes",
        getCommunityMostLiked
    );

    return (
        <div className="Community">
            <div className="reviewsDisplay">
                <h1>
                    <h1>Most Recent</h1>
                </h1>
                {listOfReviews.map(review => {
                    return (
                        <div>
                            <h1>RestaurantName : {review.restaurantName}</h1>
                            <h1>Name : {review.userID}</h1>
                            <h1>Rating : {review.rating}</h1>
                            <h1>Likes: {review.likeCount}</h1>
                        </div>
                    );
                })}
                <h1>
                    <h1>Most Liked</h1>
                </h1>
                {listOfReviewsByLikes.map(review => {
                    return (
                        <div>
                            <h1>RestaurantName : {review.restaurantName}</h1>
                            <h1>Name : {review.userID}</h1>
                            <h1>Rating : {review.rating}</h1>
                            <h1>Likes: {review.likeCount}</h1>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Community;
