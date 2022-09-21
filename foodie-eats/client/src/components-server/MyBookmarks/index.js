import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../actions/UserContext";

export default function MyBookmarks() {
    const [user, setUser] = useContext(UserContext);
    const [userId, setUserId] = useState();

    useEffect(() => {
        setUserId(user?._id);
    }, [user]);

    return (
        <>
            <h1>hi</h1>
            <h1>{userId}</h1>
        </>
    );
}
