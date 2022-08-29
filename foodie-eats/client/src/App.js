import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Login from './components/Login';

function App() {
  return (
    <>
    <div>
        <Routes>
            <Route path= "/" element={<Login/>} >
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App;