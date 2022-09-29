import axios from "axios";

const SERVER_URL = "http://localhost:5000"; //server url

// add token to every request made to API
// axios.interceptors.request.use(
//     config => {
//         const { origin } = new URL(config.url);
//         const allowedOrigins = [SERVER_URL];
//         const token = localStorage.getItem("token");
//         if (allowedOrigins.includes(origin)) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else delete axios.defaults.headers.common["Authorization"];
};

// ----------AUTHENTICATION: login/signup/forgotpassword
export async function loginUser(user) {
    const { email, password } = user;

    if (!email || !password) {
        alert("Must provide email and a password");
        return;
    }

    const endpoint = SERVER_URL + "/login";
    let data = await axios
        .post(
            endpoint,
            {
                email: email,
                password: password
            },
            { withCredentials: true }
        )
        .then(res => res.data)
        .catch(err => {
            alert("email not found or password does not match.");
        });
    if (data) {
        // store token locally
        await localStorage.setItem("token", data);
        if (!localStorage.hasOwnProperty("token")) {
            alert("token not set");
        }
    }
}

// Get user associated with stored token
export const getUser = jwt => {
    const headers = {
        headers: { "x-auth-token": jwt }
    };
    return axios
        .get(`${SERVER_URL}/findTokenUser`, headers)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// Authenticate user signup
export async function signupUser(user) {
    localStorage.removeItem("token");

    const { username, email, password } = user;

    if (!username || !password || !email) {
        alert("must provide an email, a password, and a username");
        return;
    }

    const endpoint = SERVER_URL + "/signup";

    // POST the email and password to API to
    // signup user and receive the token explicitly
    let data = await axios
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
}

export async function forgotPassword(email) {
    const user_email = { email: email };
    return axios
        .post(`${SERVER_URL}/forgotPassword`, user_email)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
}
//-------------------------------------------------
// community page

// export const getCommunityPostcode = postcode => {
//     return axios
//         .get(`${SERVER_URL}/review/${postcode}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

export const getCommunityRecent = async () => {
    return await axios
        .get("http://localhost:5000/review/getReviewsByRecent")
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getCommunityMostLiked = async () => {
    return await axios
        .get(`http://localhost:5000/review/getReviewsByLikes`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
// // use req.query.search
// // https://stackoverflow.com/questions/67244679/how-to-create-search-form-in-mern-application
// // https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
// export const getCommunitySearch = searchValue => {
//     return axios
//         .get(`${SERVER_URL}/review?search=${searchValue}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// // use req.query.rt and req.query.pr (integers)
// // if raitng/price range == 0, do not filter anything (for that field)
// // If we need to work with numbers, and convert query statements from text to number, we can simply add a plus sign in front of statement.
// export async function getCommunityFilter(rating, priceRange) {
//     return axios
//         .get(`${SERVER_URL}/review?rt=${rating}&$pr=${priceRange}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// }

// //------------------------ Review APIs (Create, ViewOne, Edit)

export const createReview = async data => {
    // const {
    //     restaurantName,
    //     isPublic,
    //     priceRange,
    //     rating,
    //     dateVisited,
    //     address,
    //     description
    // } = data;

    console.log(`called ${SERVER_URL}/review/createReview`);
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
    // const {
    //     _id,
    //     restaurantNamee,
    //     isPublic,
    //     priceRange,
    //     rating,
    //     dateVisited,
    //     address,
    //     description
    // } = data;
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

export const getBookmarks = bookmarks => {
    return axios
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
export const getUserById = async userId => {
    return await axios
        .get(`${SERVER_URL}/account/${userId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getProfile = async username => {
    return await axios
        .get(`${SERVER_URL}/account/profile/${username}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getMyProfile = async username => {
    return await axios
        .get(`${SERVER_URL}/account/my-profile/${username}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

//--- My Reviews
export const getMyReviews = async userId => {
    return await axios
        .get(`${SERVER_URL}/account/myReviews/${userId}`)
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
    const { userId, username, email, bio, image } = profile;

    return await axios
        .patch(`${SERVER_URL}/account/updateUser/${userId}`, profile)
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
    const { userId, newTheme } = data;

    return await axios
        .patch(`${SERVER_URL}/account/changeTheme/${userId}`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
