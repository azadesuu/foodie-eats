import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path= "/login" element={ <Login/> } ></Route>
          <Route path= "/register" element={ <Register/> } ></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;