
import './index.css';
import { useState, useEffect} from "react"; 
import Axios from "axios";

function Community() {
  const [listOfReviews, setListOfReviews] = useState([]);
  const [listOfReviewsByLikes, setListOfReviewsByLikes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/review/getReviewsByRecent").then((response) => {
      setListOfReviews(response.data)
    });

    Axios.get("http://localhost:5000/review/getReviewsByLikes").then((response) => {
      setListOfReviewsByLikes(response.data)
    });

  }, []);

  return (
    <div className="Community">
      <div className="reviewsDisplay">
        <h1><h1>Most Recent</h1></h1>
        {listOfReviews.map((review) => {
          return (
          <div>
             <h1>RestaurantName : {review.restaurantName}</h1>
             <h1>Name : {review.userID}</h1>
             <h1>Rating : {review.rating}</h1>
             <h1>Likes: {review.likeCount}</h1>
          </div>
          );
        })}
        <h1><h1>Most Liked</h1></h1>
        {listOfReviewsByLikes.map((review) => {
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
