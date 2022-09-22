import { useState } from "react";
import { useQuery } from "react-query";
import { getUserById } from "../../api";
import { useNavigate } from "react-router-dom";

const ReviewPeek = props => {
  const navigate = useNavigate();
  const { _id, restaurantName, userID, rating, likeCount } = props.reviewData;

    // const { data: user, isLoading } = useQuery(
    //   "username-query",
    //   () => getUserById(),
    //   { enabled: !!userID }
    // );
    // change to queried username once database is updated
  const [username, setUsername] = useState(userID);

  function viewReview() {
    navigate(`/review/${_id}`);
  }

  return (
    <button onClick={viewReview}>
      <div>
        <h1>ReviewID: {_id}</h1>
        <h1>RestaurantName: {restaurantName}</h1>
        <h1>Name : {username}</h1>
        <h1>Rating : {rating}</h1>
        <h1>Likes: {likeCount}</h1>
      </div>
    </button>
  );
};

export default ReviewPeek;
