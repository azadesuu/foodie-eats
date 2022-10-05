import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./api";
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
// yet to be implemented with css
import Theme from "./components/Theme";
import Logout from "./components-server/Logout";

const queryClient = new QueryClient();

const PrivateRoutes = props => {
    if (props.loggedIn === undefined) {
        return null; // or loading indicator/spinner/etc
    }

    if (props.loggedIn === props.shouldBe) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) return;

        //gets the user from the signed jwt token
        const getUserWithJwt = async () => {
            const newUser = await getUser(jwt);
            setUser(newUser?.body);
            return newUser;
        };
        //console log user
        getUserWithJwt();
    }, [setUser]);

    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={[user, setUser, getUser]}>
                <div>
                    <Routes>
                        {/* public routes */}
                        <Route path="/home" element={<Community />} />
                        {/* <Route
                            path="/profile/:username"
                            element={<Profile />}
                        /> */}
                        {/* <Route
                            path="/profile/:username/reviews"
                            element={<ProfileReviews />}
                        /> */}
                        {/* must be public */}
                        <Route path="*" element={<PageNotFound />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/"
                            element={
                                <PrivateRoutes
                                    loggedIn={true}
                                    shouldBe={true}
                                />
                            }
                        >
                            <Route path="/logout" element={<Logout />} />

                            <Route path="/my-theme" element={<Theme />} />
                            <Route
                                path="/my-bookmarks"
                                element={<MyBookmarks />}
                            />
                            <Route path="/my-profile" element={<MyProfile />} />
                            <Route path="/my-reviews" element={<MyReviews />} />
                            <Route
                                path="/change-password"
                                element={<ChangePassword />}
                            />
                            <Route
                                path="/create-review"
                                element={<PostReview />}
                            />
                            <Route
                                path="/review/:reviewId"
                                element={<Review user={user} />}
                            />
                            <Route
                                path="/review/:reviewId/edit"
                                element={<EditReview />}
                            />
                        </Route>
                    </Routes>
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
