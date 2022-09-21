import "./index.css";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { getCommunityRecent, getCommunityMostLiked } from "../../api";
import ReviewPeek from "../ReviewPeek";

function Community() {
  const reviewQueryRecent = useQuery("listOfReviews", () =>
    getCommunityRecent()
  );
  const { data: listReviews, isLoading } = reviewQueryRecent;
  const reviewQueryLikes = useQuery("listOfReviewsByLikes", () =>
    getCommunityMostLiked()
  );
  const { data: listLikes, isLoading2 } = reviewQueryLikes;

  return (
    <div>
      <h1>
        <h1>Most Recent</h1>
      </h1>
      {isLoading && <CircularProgress className="spinner" />}
      {listReviews ? (
        <div>
          {listReviews.map(review => {
            return <ReviewPeek data={review} />;
          })}
        </div>
      ) : (
        // If the info can't be loaded, then display a message
        !isLoading && <h2>Found no orders</h2>
      )}
      <h1>
        <h1>Most Liked</h1>
      </h1>
      {isLoading2 && <CircularProgress className="spinner" />}
      {listLikes ? (
        <div>
          {listLikes.map(review => {
            return (
              <div>
                <h1>RestaurantName: {review.restaurantName}</h1>
                <h1>Name : {review.userID}</h1>
                <h1>Rating : {review.rating}</h1>
                <h1>Likes: {review.likeCount}</h1>
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

// return (
//   <div className="Community">
//     <div className="reviewsDisplay">
//       <h1><h1>Most Recent</h1></h1>
//       {listOfReviews.map((review) => {
//         return (
//         <div>
//            <h1>RestaurantName : {review.restaurantName}</h1>
//            <h1>Name : {review.userID}</h1>
//            <h1>Rating : {review.rating}</h1>
//            <h1>Likes: {review.likeCount}</h1>
//         </div>
//         );
//       })}
//       <h1><h1>Most Liked</h1></h1>
//       {listOfReviewsByLikes.map((review) => {
//         return (
//         <div>
//            <h1>RestaurantName : {review.restaurantName}</h1>
//            <h1>Name : {review.userID}</h1>
//            <h1>Rating : {review.rating}</h1>
//            <h1>Likes: {review.likeCount}</h1>
//         </div>
//         );
//       })}

//     </div>
//   </div>
// );
// }

export default Community;
