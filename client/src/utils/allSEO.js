const site = "FoodieEats";
export const allSEO = {
    login: {
        title: `${site} | Login`,
        description: "Login to your account.",
        link: "/login"
    },
    signup: {
        title: `${site} | Sign Up`,
        description: "Create an account for free.",
        link: "/signup"
    },
    forgotpassword: {
        title: `ForgotPassword | ${site}`,
        description:
            "Forgot Password. Please enter your email to reset password.",
        link: "/forgot-password"
    },
    community: {
        title: `Community | ${site}`,
        description:
            "View top recommendations and recents from users. Login for more features.",
        link: "/create-review"
    },
    viewuser: {
        title: `<username> | ${site}`,
        description: "<username>'s reviews. Login for more features.",
        link: "/profile/<username>"
    },
    viewprofilereviews: {
        title: `<username> | ${site}`,
        description: "<username>'s reviews. Login for more features.",
        link: "/profile/<username>/reviews"
    },
    postreview: {
        title: `Post Review | ${site}`,
        description:
            "Post a review. In order to do this, please login to your account.",
        link: "/create-review"
    },
    viewreview: {
        title: `<restaurant-name> | ${site}`,
        description: "<restaurant name> review. Login for more features.",
        link: "/review/<id>"
    },
    editreview: {
        title: `Edit Review | ${site}`,
        description:
            "Edit your review. In order to do this, please login to your account.",
        link: "/review/<id>/edit"
    },
    myprofile: {
        title: `MyProfile | ${site}`,
        description:
            "My Profile. View and edit your details. Please login to your account.",
        link: "/my-profile"
    },
    myreviews: {
        title: `MyReviews | ${site}`,
        description:
            "Find and view your reviews. In order to view, please login to your account.",
        link: "/my-reviews"
    },
    mybookmarks: {
        title: `MyBookmarks | ${site}`,
        description:
            "Find and view your bookmarks. In order to view, please login to your account.",
        link: "/my-bookmarks"
    },
    changepassword: {
        title: `Change Password | ${site}`,
        description:
            "Change your password. In order to do this, please login to your account.",
        link: "/change-password"
    },
    mytheme: {
        title: `MyTheme | ${site}`,
        description:
            "Custom skins to personalize your browser. Login to customize your account.",
        link: "/my-theme"
    }
};
// import { allSEO } from "../../utils/allSEO";
// import SEO from "../SEO";
{
    /* <SEO data={allSEO.signup} /> */
}
