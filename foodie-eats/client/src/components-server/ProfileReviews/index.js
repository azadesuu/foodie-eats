import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../../actions/UserContext";
import { getMyReviews, getProfile } from "../../api";
import ReviewPeek from "../ReviewPeek";
import { sleep } from "../../hooks";

function ProfileReviews() {
  const [user, setUser] = useContext(UserContext);
  console.log(user);

  const { username } = useParams();
  const navigate = useNavigate();

  if (user?.username === username) {
    console.log(user?.username);
    console.log(username);
    navigate("/my-reviews");
    console.log("NAVIGATED TO MY-REVIEWS");
  }

  const { data: userProfile, isLoadingUser } = useQuery(
    "user-profile",
    () => getProfile(username),
    { enabled: !!username && !!user }
  );

  const { data: listReviews, isLoadingReviews } = useQuery(
    "listOfReviews",
    () => getMyReviews(userProfile?._id),
    { enabled: !!userProfile && !!user && !isLoadingUser }
  );

  return (
    <div>
      <h1>
        <h1>{username}'s Reviews</h1>
      </h1>
      {isLoadingReviews && <CircularProgress className="spinner" />}
      {listReviews ? (
        <div>
          {listReviews.map(review => {
            return <ReviewPeek reviewData={review} />;
          })}
        </div>
      ) : (
        // If the info can't be loaded, then display a message
        !isLoadingReviews && <h2>Found no reviews</h2>
      )}
    </div>
  );
}

export default ProfileReviews;
