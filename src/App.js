import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import './index.css'

import Login from './Login';
import PostFeed from './PostFeed';


function App() {
  return (
    <Router>
      <div className="App">
          <Routes>

            <Route path="/" element={ <PostFeed /> } />
            <Route path="/login" element={ <Login /> } />

          </Routes>
      </div>
    </Router>
  );
}

export default App;
