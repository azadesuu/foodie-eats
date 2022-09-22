import { getReview } from "../../api";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../actions/UserContext";
import { useQuery } from "react-query";

export default function ViewReview() {
  const user = useContext(UserContext);

  const { reviewId } = useParams();
  const { data: review, isLoading } = useQuery(
    "view-review",
    () => getReview(reviewId),
    { enabled: !!reviewId && !!user }
  );
  const [liked, setLiked] = useState(review?.userLikes.includes(user?._id));
  const [flagged, setFlagged] = useState(review?.flagged.includes(user?._id));
  const [bookmarked, setBookmarked] = useState(
    user?.bookmarks.includes(reviewId)
  );
  const [publicBool, setPublicBool] = useState(review?.publicBool);

  async function toggleLike() {
    setLiked(!liked);
  }

  async function toggleBookmark() {
    setBookmarked(!bookmarked);
  }

  async function toggleFlag() {
    setFlagged(!flagged);
  }

  async function togglePublic() {
    setPublicBool(!publicBool);
  }

  async function updateReview() {}

  return (
    <div>
      {review ? (
        <div>
          <div>
            <h1>RestaurantName: {review.restaurantName}</h1>
            <h1>Name : {review.userID}</h1>
            <h1>Rating : {review.rating}</h1>
            <h1>Likes: {review.likeCount}</h1>
            <br />
            <button onClick={toggleLike}>
              {liked ? <h1>UnLike</h1> : <h1>Like</h1>}
            </button>
            <button onClick={toggleFlag}>
              {flagged ? <h1>Unflag</h1> : <h1>Flag</h1>}
            </button>
            <button onClick={toggleBookmark}>
              {bookmarked ? <h1>UnBookmark</h1> : <h1>Bookmark</h1>}
            </button>
            <button onClick={toggleBookmark}>
              {publicBool ? <h1>Private</h1> : <h1>Public</h1>}
            </button>
          </div>
        </div>
      ) : (
        <h1>Review not Found</h1>
      )}
    </div>
  );
}
