import { useContext, useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../../actions/UserContext";
import { getMyReviews } from "../../api";

function MyReviews() {
  const [user, setUser] = useContext(UserContext);

  const reviewQueryRecent = useQuery("listOfReviews", () =>
    getMyReviews(user?._id)
  );
  const { data: listReviews, isLoading } = reviewQueryRecent;

  return (
    <div>
      <h1>
        <h1>My Reviews</h1>
      </h1>
      {isLoading && <CircularProgress className="spinner" />}
      {listReviews ? (
        <div>
          {listReviews.map(review => {
            return (
              <div>
                <h1>RestaurantName: {review.restaurantName}</h1>
                <h1>Name : {review.username}</h1>
                <h1>Rating : {review.rating}</h1>
                <h1>Likes: {review.likeCount}</h1>
              </div>
            );
          })}
        </div>
      ) : (
        // If the info can't be loaded, then display a message
        !isLoading && <h2>Found no reviews</h2>
      )}
    </div>
  );
}

export default MyReviews;
