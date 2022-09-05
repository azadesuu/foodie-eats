import axios from 'axios';

const BASE_URL = process.env.BASE_URL || "http:/localhost:5000"

axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url);
      const allowedOrigins = [BASE_URL];
      const token = localStorage.getItem('token'); // get the token
      
      if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${token}`; // we put our token in the header
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export async function loginUser(user) {
    const { username, password } = user;
  
    if (!username || !password) {
      alert("Must provide username and a password");
      return;
    }
  
    const endpoint = BASE_URL + `/login`;
  
    // POST the email and password to API to
    // authenticate user and receive the token explicitly
    let data = await axios({
      url: endpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      ),
    })
      .then((res) => res.data)
      .catch(() => {
        alert("Email not found or password doesn't match.");
      });
  
    if (data) {
      // store token locally
      localStorage.setItem("token", data);
    }
  }

  
// Get user associated with stored token
export const getUser = (jwt) => {
    const headers = {
      headers: { "x-auth-token": jwt },
    };
    return axios
      .get(`${BASE_URL}/user/find`, headers)
      .then((res) => res?.data?.data)
      .catch((err) => console.log(err));
  };
  
  // Authenticate user signup
  export async function signupUser(user) {
    localStorage.removeItem("token");
  
    const { username, email, password } = user;
  
    if (!username || !password || !email ) {
      alert("must provide an email, a password, and a username");
      return;
    }
  
    const endpoint = BASE_URL + `/signup`;

    // POST the email and password to API to
    // signup user and receive the token explicitly
    let data = await axios({
      url: endpoint,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(
        {
          username,
          email,
          password
        },
        { withCredentials: true }
      ),
    })
      .then((res) => res.data)
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



export const fetchReviews = () => axios.get(BASE_URL)
export const createReview = (newReview) => axios.post(BASE_URL, newReview)
