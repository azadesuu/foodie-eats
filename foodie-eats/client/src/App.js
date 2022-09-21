import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { getUser } from "./api";
import { useLogOut, sleep } from "./hooks";
import { UserContext } from "./actions/UserContext";
import Community from "./components-server/Community";
import Login from "./components-server/Login";
import Logout from "./components-server/Logout";
import SignUp from "./components-server/SignUp";
import Profile from "./components-server/Profile";
import ProfileReviews from "./components-server/Profile";
import MyProfile from "./components-server/MyProfile";
import MyReviews from "./components-server/MyProfile";
import MyBookmarks from "./components-server/MyBookmarks";
import Theme from "./components-server/Theme";
import ChangePassword from "./components-server/ForgotPassword";
import ForgotPassword from "./components-server/ForgotPassword";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appTheme, setAppTheme] = useState("honeydew");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      setIsLoggedIn(false);
      setAppTheme("honeydew");
      return;
    }
    //gets the user from the signed jwt token
    const getUserWithJwt = async () => {
      const newUser = await getUser(jwt);
      setUser(newUser?.body);
      setIsLoggedIn(true);
      setAppTheme(newUser?.body.theme);
    };
    getUserWithJwt();

    // if (isLoggedIn) {
    //   // if the userID has changed
    //   if (newUser?.body._id !== user?.body._id) {
    //     alert("User has changed");
    //     sleep(5000);
    //     localStorage.removeItem("token");
    //     setAppTheme("honeydew");
    //     setUser({});
    //     navigate("/");
    //   } else {
    //     setAppTheme(newUser?.body.theme);
    //   }
    // } else {
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={[user, setUser]}>
        <div>
          <Routes>
            <Route path="/" element={<Community />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route
              path="/profile/:username/reviews"
              element={<ProfileReviews />}
            />
            <Route path="/logout" element={<Logout />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* <Route path="/my-reviews" element={<Login />} /> */}
            {/* <Route path="/change-password" element={<ChangePassword />} /> */}
            <Route path="/my-theme" element={<Theme />} />
            <Route path="/my-bookmarks" element={<MyBookmarks />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
