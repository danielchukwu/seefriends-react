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
import TellsSingle from './components/pages/TellsSingle';
import Comment from './components/pages/Comment';


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
            <Route path="/tells/:id" element={ <TellsSingle /> } />

            <Route path="/:type/:id/comments" element={ <Comment /> } /> {/* :type = posts, tells */}
            
            <Route path="/users/activity" element={ <Activity /> } />
            <Route path="/users/profile" element={ <UserProfile /> } />
            <Route path="/users/profile/:id" element={ <UserProfile /> } />
            <Route path="/users/profile/saved" element={ <Saved /> } />

            <Route path='users/profile/:id/fff/:page' element={ <FFF />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

export const ACTIONS = {
  ADD_POST: "add-post",
  LIKE_POST: "like-post",
  DISLIKE_POST: "dislike-post",
}

export function reducerPost(posts, action){
  const newPost = action.payload.posts;
  const owner = action.payload.owner;
  const posts_url = action.payload.posts_url;
  const access_token = action.payload.access_token;
  const id = action.payload.id;
  
  switch (action.type){
    case "add-post":
      return [...action.payload.posts];

    case "like-post":
      const post = newPost.find(post => post.id === id);

      post.liked = !post.liked;   // sets liked: to true or false. it's where the magic happens
      if (post.liked){
          post.likers.push(owner.id);
      } else {
          post.likers.pop();
      }

      // Send Like to Backend
      fetch(posts_url+id+'/like/', {
          method: "GET",
          headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err.message);
          })

      return [...newPost]

    case "save-post":
      const post1 = newPost.find(post => post.id === id);
      if (post1.savers.includes(owner.id)){
          post1.savers = post1.savers.filter(id => id !== owner.id);
      } else {
          post1.savers.push(owner.id);
      }
      console.log("savers", post1.savers)

      // Send Like to Backend
      fetch(posts_url+id+'/save-post/', {
          method: "GET",
          headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err.message);
          })

      return [...newPost]

    case "tell-on-post":
      console.log("Tell On Post Dispatch!");

      const newPosts = posts;
      const post2 = newPosts.find(post => post.id === id);
      post2.tellers_count += 1;
      

      const uploadData = new FormData();
      uploadData.append('body', action.payload.body);
      
      fetch(posts_url + id + "/tell-on-post/", {
          method: "POST",
          headers: {Authorization: `Bearer ${access_token}`},
          body: uploadData
      })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => console.log(err))

      return [...newPost]

    default:
      return posts
}
}

export function reducerTell (tells, action){
  const newTell = action.payload.tells;
  const owner = action.payload.owner;
  const tells_url = action.payload.tells_url;
  const access_token = action.payload.access_token;
  const id = action.payload.id;
  
    switch (action.type){
      case "add-tell":
        return [...action.payload.tells];
    
      case "like-tell":
        let tell = newTell.find(tell => tell.id === id);

        tell.liked = !tell.liked;   // sets liked: to true or false. it's where the magic happens
        if (tell.liked){
          tell.likers.push(owner.id);
        } else {
          tell.likers.pop();
        }

        // Send Like to Backend
        fetch(tells_url+id+'/like/', {
          method: "GET",
          headers: {"Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`
        }
        })
          .then(res => {
              return res.json();
          })
          .then(data => {
              console.log(data)
          })
          .catch(err => {
              console.log(err.message);
          })

        return [...newTell]

      case "save-tell":
        // Send saved post to Backend
        const tell1 = newTell.find(tell => tell.id === id);
        if (tell1.savers.includes(owner.id)){
          tell1.savers = tell1.savers.filter(id => id !== owner.id);
        } else {
          tell1.savers.push(owner.id);
        }
        
        fetch(tells_url+id+'/save-tell/', {
          method: "GET",
          headers: {"Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        }
        })
          .then(res => {
              return res.json();
          })
          .then(data => {
              console.log(data)
          })
          .catch(err => {
              console.log(err.message);
          })
          
        return [...newTell]

      case "tell-on-tell":
        // FormData: will act as a form for us with Content-Type: "multipart/form-data"
        const tell2 = newTell.find(tell => tell.id === id);
        tell2.tellers_count += 1;

        // newTell.unShift({id: Date.now(), comments: [], created: Date.now(), date: "0 seconds ago", liked: false, likers: [], owner: owner, savers: [], tell_on_tell: tell2, tell_on_post: null, tellers: [], tellers_count: 0, type: "tell"})

        const uploadData = new FormData();
        uploadData.append('body', action.payload.body);
        
        fetch(tells_url + id + "/tell-on-tell/", {
            method: "POST",
            headers: {Authorization: `Bearer ${access_token}`},
            body: uploadData
        })
            .then(res => {
              return res.json();
            })
            .then(data => {
              newTell.unshift(data)
              console.log(newTell)
              return [...newTell]
            })
            .catch(err => console.log(err))
      
      return [...newTell]
      default:
        return tells
    }
}