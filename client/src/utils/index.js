export const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
        return true;
    }

    return false;
};

const getPublicId = imageURL =>
    imageURL
        .split("/")
        .pop()
        .split(".")[0];
