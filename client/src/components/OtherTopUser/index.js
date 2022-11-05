import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { getOtherReviews } from "../../api";
import { useQuery } from "react-query";
import { useEffect } from "react";

export default function TopUser(props) {
    const userProfile = props.user;
    const [numReviews, setNumReviews] = useState("..");
    const [numLikes, setNumLikes] = useState("..");
    let i = 0;
    let total = 0;

    const { data: listReviews, isLoading } = useQuery(
        "reviews",
        () => getOtherReviews(userProfile?._id),
        { enabled: !!userProfile }
    );
    useEffect(() => {
        if (isLoading === false) {
            setNumReviews(listReviews.length);
            total = 0;
            for (i = 0; i < listReviews.length; i++) {
                total += listReviews[i].likeCount;
            }
            setNumLikes(total);
        }
    }, [isLoading]);

    return (
        <div className="top-user">
            <div className="top-user-r1">
                <Avatar
                    alt="user-profile-image"
                    src={
                        userProfile.profileImage !== ""
                            ? userProfile.profileImage
                            : null
                    }
                    sx={{ height: 130, width: 130 }}
                />
                <div className="top-user-info">
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p>
                    <span className="detail">
                        {!isLoading ? numReviews : `..`}
                    </span>{" "}
                    reviews
                </p>
                <p>
                    <span className="detail">
                        {!isLoading ? numLikes : `..`}
                    </span>{" "}
                    likes
                </p>
            </div>
        </div>
    );
}
