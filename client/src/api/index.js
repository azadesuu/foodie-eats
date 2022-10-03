import axios from "axios";

// const SERVER_URL = "http://localhost:5000"; //server url
const SERVER_URL = "https://foodie-eats.herokuapp.com"; //server url
// const SERVER_URL = process.env.SERVER_URL; //server url

export const setAuthToken = async token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else delete axios.defaults.headers.common["Authorization"];
};

// ----------AUTHENTICATION: login/signup/forgotpassword
export const loginUser = async user => {
    const { email, password } = user;

    if (!email || !password) {
        alert("Must provide email and a password");
        return;
    }
    const endpoint = SERVER_URL + `/login`;

    let data = await axios({
        url: endpoint,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(
            {
                email: email,
                password: password
            },
            { withCredentials: true }
        )
    })
        .then(res => res.data)
        .catch(() => {
            alert("Email not found or password doesn't match.");
        });

    if (data) {
        // store token locally
        localStorage.setItem("token", data);
    }
};

// Get user associated with stored token
export const getUser = async jwt => {
    const headers = {
        headers: { "x-auth-token": jwt }
    };
    return await axios
        .get(`${SERVER_URL}/findTokenUser`, headers)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// Authenticate user signup
export const signupUser = async user => {
    localStorage.removeItem("token");

    const { username, email, password } = user;

    if (!username || !password || !email) {
        alert("must provide an email, a password, and a username");
        return;
    }

    const endpoint = SERVER_URL + "/signup";

    // POST the email and password to API to
    // signup user and receive the token explicitly
    const data = await axios
        .post(endpoint, {
            username,
            email,
            password
        })
        .then(res => res.data)
        .catch(() => {
            return;
        });
    if (!data) {
        alert("Please try again with a different email or stronger password.");
    } else if (data.message) {
        // show error message
        alert(data.message);
    } else {
        // store token locally
        localStorage.setItem("token", data);
    }
};

export const forgotPassword = async email => {
    const user_email = { email: email };
    return axios
        .post(`${SERVER_URL}/forgotPassword`, user_email)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
// COMMUNITY

export const getCommunityRecent = async data => {
    return await axios
        .get(`${SERVER_URL}/review/getReviewsByRecent`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getCommunityMostLiked = async data => {
    return await axios
        .get(`${SERVER_URL}/review/getReviewsByLikes`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
// // use req.query.search
// // https://stackoverflow.com/questions/67244679/how-to-create-search-form-in-mern-application
// // https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
// // If we need to work with numbers, and convert query statements from text to number, we can simply add a plus sign in front of statement.
export const getCommunitySearch = data => {
    const { search, rating, priceRange, tag, postcode } = data;
    return axios
        .get(`${SERVER_URL}/review/search`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// //------------------------ Review APIs (Create, ViewOne, Edit)

export const createReview = async data => {
    return await axios
        .put(`${SERVER_URL}/review/createReview`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getReview = async reviewId => {
    return await axios
        .get(`${SERVER_URL}/review/getReview/${reviewId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const updateReview = async data => {
    return await axios
        .patch(`${SERVER_URL}/review/updateReview`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

//add to user object
// export const toggleBookmark = (userId, reviewId) => {
//     return axios
//         .patch(`${SERVER_URL}/review/bookmark/${reviewId}`, userId)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

//add to review object
// export const toggleLike = (userId, reviewId) => {
//     return axios
//         .patch(`${SERVER_URL}/review/like/${userId}`, reviewId)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

//change boolean
// export const togglePublic = (userId, reviewId) => {
//     return axios
//         .patch(`${SERVER_URL}/review/togglePublic/${userId}`, reviewId)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const deleteReview = (userId, reviewId) => {
//     return axios
//         .patch(`${SERVER_URL}/review/unlike/${userId}`, reviewId)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// // -------------- Bookmarks page
export const getBookmarks = async bookmarks => {
    if (bookmarks === undefined) return [];
    return await axios
        .get(`${SERVER_URL}/account/my-bookmarks`, bookmarks)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// // use req.query.search
// // https://stackoverflow.com/questions/67244679/how-to-create-search-form-in-mern-application
// // https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
// export const getBookmarksSearch = searchValue => {
//     return axios
//         .get(`${SERVER_URL}/review/mybookmarks?search=${searchValue}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// // use req.query.rt and req.query.pr (integers)
// // if raitng/price range == 0, do not filter anything (for that field)
// // If we need to work with numbers, and convert query statements from text to number, we can simply add a plus sign in front of statement.
// export const getBookmarksFilter = (rating, priceRange) => {
//     return axios
//         .get(`${SERVER_URL}/review/mybookmarks?rt=${rating}&$pr=${priceRange}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// // ------ Profiles

export const getProfile = async username => {
    return await axios
        .get(`${SERVER_URL}/account/profile/${username}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

//--- My Reviews
export const getMyReviews = async userId => {
    return await axios
        .get(`${SERVER_URL}/account/my-reviews/${userId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// // use req.query.search
// // https://stackoverflow.com/questions/67244679/how-to-create-search-form-in-mern-application
// // https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
// export const getMyReviewsSearch = search => {
//     return axios
//         .get(`${SERVER_URL}/account/myReviews/search?=${tagValue}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const getMyReviewsTag = tagValue => {
//     return axios
//         .get(`${SERVER_URL}/account/myReviews/search?=${tagValue}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// //--- Profile Edits

export const updateUser = async profile => {
    return await axios
        .patch(`${SERVER_URL}/account/updateUser/${profile.userId}`, profile)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const updatePassword = async data => {
    return await axios
        .put(`${SERVER_URL}/account/updatePassword`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const changeTheme = async data => {
    const { userId } = data;

    return await axios
        .patch(`${SERVER_URL}/account/changeTheme/${userId}`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
