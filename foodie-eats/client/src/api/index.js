import axios from "axios";

const SERVER_URL = "http://localhost:5000"; //server url

// add token to every request made to API
axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [SERVER_URL];
        const token = localStorage.getItem("token");
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
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
        await localStorage.setItem("token", JSON.stringify(data));
        if (!localStorage.hasOwnProperty("token")){
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

export const getCommunityRecent = async () => {
    return axios
        .get("http://localhost:5000/review/getReviewsByRecent")
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getCommunityMostLiked = () => {
    return axios
        .get(`http://localhost:5000/review/getReviewsByLikes`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// //------------------------ Review APIs (Create, ViewOne, Edit)

// // create review
// export const createReview = review => {
//     const {
//         user_id,
//         username,
//         dateVisited,
//         restaurantName,
//         rating,
//         description,
//         images,
//         address,
//         publicBool,
//         tags
//     } = review;
//     return axios
//         .put(`${SERVER_URL}/review/newReview`, review)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const getOneReview = reviewId => {
//     return axios
//         .get(`${SERVER_URL}/review/${reviewId}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// // not all fields will be filled in
// export const editOneReview = reviewEdit => {
//     const {
//         user_id,
//         username,
//         dateVisited,
//         restaurantName,
//         rating,
//         description,
//         images,
//         address,
//         publicBool,
//         tags
//     } = reviewEdit;

//     return axios
//         .patch(`${SERVER_URL}/review/${reviewId}/edit`, reviewEdit)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const bookmarkReview = (userId, reviewId) => {
//     return axios
//         .get(`${SERVER_URL}/review/bookmark/${reviewId}`, userId)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// // -------------- Bookmarks page

// // export const fetchReviews = () => axios.get(SERVER_URL);
// // export const createReview = (newReview) => axios.post(SERVER_URL, newReview);

// //
// export const getBookmarks = userId => {
//     return axios
//         .get(`${SERVER_URL}/review/mybookmarks/${userId}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

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
// export const getProfile = userId => {
//     return axios
//         .get(`${SERVER_URL}/account/${userId}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const getMyProfile = userId => {
//     return axios
//         .get(`${SERVER_URL}/account/my-profile/${userId}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// //--- My Reviews
// export const getMyReviews = userId => {
//     return axios
//         .get(`${SERVER_URL}/account/myReviews/${userId}`)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

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

// export const editMyProfile = profile => {
//     const { username, profile_image, bio } = profile;

//     return axios
//         .patch(`${SERVER_URL}/account/updateUser/${userId}`, profile)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const changePassword = (oldPassword, newPassword) => {
//     const passwords = { oldPassword, newPassword };
//     return axios
//         .patch(`${SERVER_URL}/account/changePassword/${userId}`, passwords)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };

// export const changeTheme = theme => {
//     return axios
//         .patch(`${SERVER_URL}/account/changeTheme/${userId}`, theme)
//         .then(res => res?.data?.data)
//         .catch(err => console.log(err));
// };
