//1 lowercase and uppercase alphabet and one number
const strongPassword = new RegExp("(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");
// 6-16 alphanumeric characters with underscores or dots
const validUsername = new RegExp(
    "^[a-zA-Z](_(?!(.|_))|.(?![_.])|[a-zA-Z0-9]){4,14}[a-zA-Z0-9]$"
);
// checking if its a valid formatted email
const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
};

export const checkProfileFields = data => {
    const { username, email, password, bio } = data;
    if (username) {
        if (!validUsername.test(username)) {
            alert(
                "Username is not valid. Username must be 6-16 characters and alphanumeric (or with underscores/periods)"
            );
            return false;
        }
    }
    if (email) {
        if (!validEmail.test(email)) {
            alert("Email is not valid. Please try again");
            return false;
        }
    }
    if (password) {
        if (!strongPassword.test(password)) {
            alert(
                "Password must have min 8 characters, 1 lower/uppercase character and 1 numerical digit."
            );
            return false;
        }
    }
    if (bio) {
        if (bio.length > 100) {
            alert("Length of bio exceeds the maximum of 100.");
            return false;
        }
    }
    return true;
};
