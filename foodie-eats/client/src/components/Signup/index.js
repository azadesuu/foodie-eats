import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export async function signupUser(user) {
    localStorage.removeItem("token");

    const { email, username, password } = user;

    if (!email || !username || !Password) {
        alert("Please provide valid email, username, and password.");
        return;
    }

    const endpoint = BASE_URL + '/user/signup';
    let data = await axios({
        url: endpoint,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(
            {
                email,
                username,
                password,
            },
            { withCredentials: true }
        ),
    })
        .then((res) => res.data)
        .catch(() => {
            return;
        });

    if (data.message) {
        alert(data.message);
    } else {
        localStorage.setItem("token", data);
    }
}