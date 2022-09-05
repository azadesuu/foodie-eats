// import logo from "./assets/logo192.png";
// import { useDispatch } from 'react-redux';
// import { useEffect }, React from 'react';
// import { getReviews } from './actions/reviews'
//dispatch an action
// import { createReview } from './actions/reviews'

// const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getReviews());}, [dispatch]);
  // use actions from server

  // // const handleSubmit = () => {
  //     e.preventDefault()
  //     dispatch(createReview(reviewData))
  // }
  //
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Community from './components/Community';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyProfile from './components/MyProfile';
// import ForgotPassword from './components/ForgotPassword';
// import MyProfile from './components/MyProfile';

function App() {
  return (
    <>
    <div>
        <Routes>
            <Route index path= "/" element={<Community/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path='/community' element= {<Community />} />
            <Route path='/my-profile' element= {<MyProfile />} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            {/* <Route path="/my-profile" element={<MyProfile/>} /> */}
        </Routes>

      </div>
    </>
  )
}

export default App;
