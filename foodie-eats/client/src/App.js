// temporary comment for server testing
// import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import Community from './components/Community';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import MyProfile from './components/MyProfile';

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useNavigate, Navigate } from 'react-router';
import Community from "./components-server/Community";
import Login from "./components-server/Login";
import SignUp from "./components-server/SignUp";
import MyProfile from "./components-server/MyProfile";
import ForgotPassword from './components-server/ForgotPassword';
// import MyProfile from './components/MyProfile';

function App() {
  const isLoggedIn = true;
  return (
    <>
      <div>
        <Routes>
          <Route index path="/" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/" element={isLoggedIn ? <Content /> : <Navigate to="/login" />} /> */}
          {/* <Route path="/my-profile" element={isLoggedIn ? <MyBookmarks /> : <Navigate to="/login" />} />
          <Route path="/my-bookmarks" element={isLoggedIn ? <MyProfile /> : <Navigate to="/login" />} />
          <Route path="/forgot-password" element={isLoggedIn ? <ForgotPassword /> : <Navigate to="/login" />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
