import { useContext } from "react";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../../actions/UserContext";
import { getMyReviews } from "../../api";
import ReviewPeek from "../ReviewPeek";

function MyReviews() {
    const [user, setUser] = useContext(UserContext);
    const { data: listReviews, isLoading } = useQuery(
        "my-reviews",
        () => getMyReviews(user?._id),
        { enabled: !!user }
    );

    return (
        <div>
            <h1>
                <h1>My Reviews</h1>
            </h1>
            {isLoading && <CircularProgress className="spinner" />}
            {listReviews ? (
                <div>
                    {listReviews.length > 0 ? (
                        <div>
                            <h1>{user?.username}'s Reviews</h1>
                            {listReviews.map(review => {
                                return <ReviewPeek reviewData={review} />;
                            })}
                        </div>
                    ) : (
                        // If the info can't be loaded, then display a message
                        <h2>User has not posted</h2>
                    )}
                </div>
            ) : (
                <h2>Found no reviews</h2>
            )}
        </div>
    );
}

export default MyReviews;
