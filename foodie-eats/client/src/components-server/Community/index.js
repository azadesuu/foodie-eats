import "./index.css";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { getCommunityRecent, getCommunityMostLiked } from "../../api";
import ReviewPeek from "../ReviewPeek";

function Community() {
  // need to post  postcode
  const { data: listReviewsRecent, isLoading } = useQuery(
    "listReviewsRecent",
    () => getCommunityRecent()
  );
  const { data: listLikes, isLoading2 } = useQuery("listOfReviewsByLikes", () =>
    getCommunityMostLiked()
  );

  return (
    <div>
      <h1>Click on a review to View details</h1>
      {isLoading && <CircularProgress className="spinner" />}
      {listReviewsRecent ? (
        <div>
          <h1>
            <h1>Most Recent</h1>
          </h1>
          {/* review parameter contains the whole review document */}
          {listReviewsRecent.map(review => {
            return (
              <div>
                {/* <h1></h1>
                <h1>RestaurantName: {review.restaurantName}</h1>
                <h1>Name : {review.userID}</h1>
                <h1>Rating : {review.rating}</h1>
                <h1>Likes: {review.likeCount}</h1>
                <br /> */}
                <ReviewPeek reviewData={review} />
              </div>
            );
          })}
        </div>
      ) : (
        // If the info can't be loaded, then display a message
        !isLoading && <h2>Found no orders</h2>
      )}
      {isLoading2 && <CircularProgress className="spinner" />}
      {listLikes ? (
        <div>
          <h1>
            <h1>Most Liked</h1>
          </h1>
          {listLikes.map(review => {
            return (
              <div>
                <ReviewPeek reviewData={review} />
              </div>
            );
          })}
        </div>
      ) : (
        // If the info can't be loaded, then display a message
        !isLoading2 && <h2>Found no orders</h2>
      )}
    </div>
  );
}

export default Community;
