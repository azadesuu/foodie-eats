import { toggleLike } from "../../api";

const ReviewPeek = review => {
  <div>
    <div>
      <h1>RestaurantName: {review.restaurantName}</h1>
      <h1>Name : {review.userID}</h1>
      <h1>Rating : {review.rating}</h1>
      <h1>Likes: {review.likeCount}</h1>
    </div>
  </div>;
};

export default ReviewPeek;
