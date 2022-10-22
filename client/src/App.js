import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { createReview, getUser } from "./api";
import { UserContext } from "./actions/UserContext";
import Community from "./components/Community";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ChangePassword from "./components/ChangePassword";
import MyProfile from "./components/MyProfile";
import MyReviews from "./components/MyReviews";
import MyBookmarks from "./components/MyBookmarks";
import PostReview from "./components/PostReview";
import EditReview from "./components/EditReview";
import Review from "./components/Review";
import ForgotPassword from "./components/ForgotPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import ProfileReviews from "./components/ProfileReviews";
import Theme from "./components/Theme";
import Logout from "./components-server/Logout";
import Footer from "./components/Footer";

import NavBar from "./components/NavBar";
import LoggedInNavBar from "./components/LoggedInNavBar";

import { isLoggedIn } from "./utils";

function App() {
    const queryClient = new QueryClient();
    const [user, setUser] = useState(null);
    const currTheme = localStorage.getItem("theme");

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) return;

        //gets the user from the signed jwt token
        const getUserWithJwt = async () => {
            const newUser = await getUser(jwt);
            if (newUser) {
                setUser(newUser?.body);
                if (!currTheme) {
                    localStorage.setItem("theme", newUser.body.theme);
                }
            }
        };
        //console log user
        getUserWithJwt();
    }, [setUser]);
    const NavigationBar = props => {
        if (isLoggedIn()) {
            return <LoggedInNavBar />;
        } else {
            return <NavBar />;
        }
    };
    const Private = ({ Component }) => {
        return isLoggedIn() ? <Component /> : <Navigate to="/login" />;
    };
    const Public = ({ Component }) => {
        return !isLoggedIn() ? <Component /> : <Navigate to="/home" />;
    };
    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={[user, setUser, getUser]}>
                <NavigationBar />
                <div>
                    <Routes>
                        {/* public routes */}
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Community />} />
                        <Route
                            path="/review/:reviewId"
                            element={<Review user={user} />}
                        />
                        <Route
                            path="/profile/:username"
                            element={<Profile />}
                        />
                        <Route
                            path="/profile/:username/reviews"
                            element={<ProfileReviews />}
                        />
                        <Route path="*" element={<PageNotFound />} />

                        {/* must be public */}
                        <Route
                            path="/login"
                            element={<Public Component={Login} />}
                        />
                        <Route
                            path="/signup"
                            element={<Public Component={SignUp} />}
                        />
                        <Route
                            path="/forgot-password"
                            element={<Public Component={ForgotPassword} />}
                        />

                        {/* must be private */}
                        <Route
                            path="/logout"
                            element={<Private Component={Logout} />}
                        />
                        <Route
                            path="/my-theme"
                            element={<Private Component={Theme} />}
                        />
                        <Route
                            path="/my-bookmarks"
                            element={<Private Component={MyBookmarks} />}
                        />
                        <Route
                            path="/my-profile"
                            element={<Private Component={MyProfile} />}
                        />
                        <Route
                            path="/my-reviews"
                            element={<Private Component={MyReviews} />}
                        />
                        <Route
                            path="/change-password"
                            element={<Private Component={ChangePassword} />}
                        />
                        <Route
                            path="/create-review"
                            element={<Private Component={PostReview} />}
                        />
                        <Route
                            path="/review/:reviewId/edit"
                            element={<Private Component={EditReview} />}
                        />
                    </Routes>
                </div>
                <Footer />
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
