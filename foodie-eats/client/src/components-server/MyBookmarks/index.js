import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";
import { ReviewPeek } from "../ReviewPeek";

export default function MyBookmarks() {
  const [user, setUser] = useContext(UserContext);

  //{"_id":{"$in": ids}}
  const reviewQueryRecent = useQuery("bookmarksList", () =>
    getBookmarks(user?.bookmarks)
  );
  const { data: listReviews, isLoading } = reviewQueryRecent;

  return (
    <div>
      {user ? (
        <div>
          {listReviews.map(review => {
            return <ReviewPeek data={review} />;
          })}
        </div>
      ) : (
        <h1>Bookmarks not found</h1>
      )}
    </div>
  );
}
