import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { getBookmarks } from "../../api";

import { UserContext } from "../../actions/UserContext";
import ReviewPeek from "../ReviewPeek";

export default function MyBookmarks() {
  const [user, setUser] = useContext(UserContext);

  const userId = user?.id;
  //{"_id":{"$in": ids}}
  const { data: listReviews, isLoading } = useQuery(
    "bookmarks",
    () => getBookmarks(user?._id),
    { enabled: user?.id }
  );

  return (
    <div>
      {!user && <CircularProgress className="spinner" />}
      {listReviews ? (
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
