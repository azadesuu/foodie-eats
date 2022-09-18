// temporary comment for server testing
// import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import Community from './components/Community';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import MyProfile from './components/MyProfile';

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Community from "./components-server/Community";
import Login from "./components-server/Login";
import SignUp from "./components-server/SignUp";
import MyProfile from "./components-server/MyProfile";
// import ForgotPassword from './components/ForgotPassword';
// import MyProfile from './components/MyProfile';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index path="/" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/community" element={<Community />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-bookmarks" element={<MyProfile />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/my-profile" element={<MyProfile/>} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
