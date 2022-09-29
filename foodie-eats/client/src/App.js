import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUser } from "./api";
import { UserContext } from "./actions/UserContext";
import Community from "./components/Community";
import Login from "./components/Login";
import Logout from "./components-server/Logout";
import SignUp from "./components/SignUp";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components-server/Profile";
import ProfileReviews from "./components-server/ProfileReviews";
// import ViewReview from "./components-server/ViewReview";
import MyProfile from "./components/MyProfile";
import MyReviews from "./components/MyReviews";
import MyBookmarks from "./components/MyBookmarks";
import PostReview from "./components/PostReview";
import EditReview from "./components/EditReview";
import Review from "./components/Review";
import Theme from "./components-server/Theme";
// import ChangePassword from "./components-server/ChangePassword";

import ForgotPassword from "./components/ForgotPassword";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    const [user, setUser] = useState();
    const [appTheme, setAppTheme] = useState("honeydew");
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) {
            setAppTheme("honeydew");
            return;
        }
        //gets the user from the signed jwt token
        const getUserWithJwt = async () => {
            const newUser = await getUser(jwt);
            setUser(newUser?.body);
            setAppTheme(newUser?.body.theme);
            return newUser;
        };
        //console log user
        getUserWithJwt();
    }, [setUser]);

    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={[user, setUser]}>
                <div>
                    <Routes>
                        {/* public routes */}
                        <Route path="/" element={<Community />} />
                        <Route
                            path="/profile/:username"
                            element={<Profile />}
                        />
                        <Route
                            path="/profile/:username/reviews"
                            element={<ProfileReviews />}
                        />
                        {/* <Route
                            path="/review/:reviewId"
                            element={<ViewReview />}
                        /> */}
                        <Route path="/logout" element={<Logout />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />

                        {/* private routes */}
                        {/* <Route path="/change-password" element={<ChangePassword />} /> */}
                        <Route path="/my-theme" element={<Theme />} />
                        <Route path="/my-bookmarks" element={<MyBookmarks />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/my-reviews" element={<MyReviews />} />
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                        <Route path="/create-review" element={<PostReview />} />
                        <Route path="/review/:reviewId" element={<Review />} />
                        <Route
                            path="/edit-review/:reviewId"
                            element={<EditReview />}
                        />
                    </Routes>
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
