import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom"
import Community from "./components/community/community"
function App() {
    return (
        <Router>
            <li><a href= "/community">Community</a></li>
            <Routes>
                <Route path='/community' element= {<Community />} />
            </Routes>
        </Router>
    )
}

export default App;