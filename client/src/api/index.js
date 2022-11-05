import axios from "axios";

const SERVER_URL = "https://foodie-eats-server.herokuapp.com";

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [SERVER_URL];
        const token = localStorage.getItem("token");
        console.log(origin);
        if (allowedOrigins.includes(origin) && token) {
            config.headers["authorization"] = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
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
        alert("Must provide an email, a password, and a username.");
        return;
    }

    const endpoint = SERVER_URL + "/signup";

    // POST the email and password to API to
    // signup user and receive the token explicitly
    return await axios
        .post(endpoint, {
            username,
            email,
            password
        })
        .then(res => res?.data?.data)
        .catch(err => {
            if (err?.response?.data?.message) {
                alert(err?.response?.data?.message);
            } else {
                console.log(err);
            }
        });
};

export const forgotPassword = async data => {
    return await axios
        .post(`${SERVER_URL}/forgotPassword`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
// COMMUNITY

export const getCommunityRecent = async () => {
    return await axios
        .get(`${SERVER_URL}/review/getReviewsByRecent`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const getCommunityMostLiked = async () => {
    return await axios
        .get(`${SERVER_URL}/review/getReviewsByLikes`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// //------------------------ Review APIs (Create, ViewOne, Update, Bookmark, Like)
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

//add reviewId to user object
export const toggleBookmark = async data => {
    const { reviewId, userId } = data;
    return await axios
        .patch(`${SERVER_URL}/account/bookmark/${reviewId}/${userId}`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

//add userId to review object
export const toggleLike = async data => {
    const { userId, reviewId } = data;
    return await axios
        .patch(`${SERVER_URL}/review/like/${userId}/${reviewId}`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// delete user review
export const deleteReview = async reviewId => {
    return await axios
        .delete(`${SERVER_URL}/review/delete/${reviewId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// // -------------- Bookmarks page
export const getBookmarks = async data => {
    return await axios
        .post(`${SERVER_URL}/account/my-bookmarks/get`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// // ------ Profiles

export const getProfile = async username => {
    return await axios
        .get(`${SERVER_URL}/account/profile/${username}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// // ------ Other Reviews
export const getOtherReviews = async userId => {
    return await axios
        .get(`${SERVER_URL}/account/other-reviews/${userId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// // ------ My Reviews
export const getMyReviews = async userId => {
    return await axios
        .get(`${SERVER_URL}/account/my-reviews/${userId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// //--- Profile Edits

export const updateUser = async profile => {
    const { userId } = profile;
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
    const { userId } = data;
    return await axios
        .patch(`${SERVER_URL}/account/changeTheme/${userId}`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

// imageUploads
export const uploadProfileImage = async data => {
    const { userId } = data;
    return await axios
        .post(`${SERVER_URL}/account/uploadProfileImage/${userId}`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const deleteProfileImage = async data => {
    const { userId } = data;
    return await axios
        .post(`${SERVER_URL}/account/deleteProfileImage/${userId}`)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const uploadReviewImage = async data => {
    const { file, reviewId } = data;
    return await axios
        .post(`${SERVER_URL}/review/uploadReviewImage/${reviewId}`, file)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const uploadNewImage = async data => {
    const { file } = data;
    return await axios
        .post(`${SERVER_URL}/account/uploadNewImage`, file)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};

export const deleteNewImage = async data => {
    return await axios
        .post(`${SERVER_URL}/account/deleteNewImage`, data)
        .then(res => res?.data?.data)
        .catch(err => console.log(err));
};
