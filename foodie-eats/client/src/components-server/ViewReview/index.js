import { updateReview } from "../../../../server/controllers/reviewController";
import { getReview } from "../../api";

export default function ViewReview(props) {
  const user = useContext(UserContext);

  const { reviewId } = useParams();
  try {
    const review = getReview(reviewId);
  } catch (err) {
    alert("error occured");
  }
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
    setFlag(!flagged);
  }

  async function togglePublic() {
    setPublic(!publicBool);
  }

  async function updateReview(){
    

  }

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
            <button onClick={toggleLike}>{liked ? UnLike : Like}</button>
            <button onClick={toggleFlag}>{flagged ? Unflag : Flag}</button>
            <button onClick={toggleBookmark}>
              {bookmarked ? UnBookmark : Bookmark}
            </button>
            <button onClick={toggleBookmark}>
              {publicBool ? Private : Public}
            </button>
          </div>
        </div>
      ) : (
        <h1>Review not Found</h1>
      )}
    </div>
  );
}
