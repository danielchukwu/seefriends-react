import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import './index.css'

import Login from './components/pages/Login';
import PostFeed from './components/pages/PostFeed';
import TellsFeed from './components/pages/TellsFeed';
import Activity from './components/pages/Activity';
import UserProfile from './components/pages/UserProfile';
import AddPost from './components/pages/AddPost';
import AddTell from './components/pages/AddTell';
import Saved from './components/pages/Saved';
import FFF from './components/pages/FFF';
import PostSingle from './components/pages/PostSingle';


function App() {
  return (
    <Router>
      <div className="App">
          <Routes>

            <Route path="/login" element={ <Login /> } />

            <Route path="/addpost" element={ <AddPost /> } />
            <Route path="/addtell" element={ <AddTell /> } />

            <Route path="/" element={ <PostFeed /> } />
            <Route path="/tellsfeed" element={ <TellsFeed /> } />

            <Route path="/posts/:id" element={ <PostSingle /> } />
            
            <Route path="/users/activity" element={ <Activity /> } />
            <Route path="/users/profile" element={ <UserProfile /> } />
            <Route path="/users/profile/:id" element={ <UserProfile /> } />
            <Route path="/users/profile/saved" element={ <Saved /> } />

            <Route path='users/profile/:id/fff' element={ <FFF />} />
            <Route path='users/profile/:id/fff/:page' element={ <FFF />} />
            

          </Routes>
      </div>
    </Router>
  );
}

export default App;
