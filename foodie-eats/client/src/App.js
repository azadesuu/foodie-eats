import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Community from './components/Community';
import MyBookmarks from './components/MyBookmarks';
// import Profile from './components/Profile';
import Reviews from './components/Reviews';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path= "/login" element={ <Login/> } ></Route>
          <Route path= "/register" element={ <Register/> } ></Route>
          <Route path= "/community" element={ <Community/> } ></Route>
          <Route path= "/my-bookmarks" element={ <MyBookmarks/> } ></Route>
          {/* <Route path= "/profile" element={ <Profile/> } ></Route> */}
          <Route path= "/my-reviews" element={ <Reviews/> } ></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;