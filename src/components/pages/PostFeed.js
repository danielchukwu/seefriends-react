// imports: main
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// imports: custom hooks
import useVariables from '../../customhooks/useVariables';
import useGetOwner from "../../customhooks/useGetOwner";

// imports: components
import PostList from './PostList';
import HeaderPostFeed from '../headers_footers/HeaderPostFeed';
import Footer from '../headers_footers/Footer';
import { ACTIONS } from '../../App';

function reducer(posts, action){
   const newPost = action.payload.posts;
   const owner = action.payload.owner;
   const posts_url = action.payload.posts_url;
   const access_token = action.payload.access_token;
   const id = action.payload.id;
   
   switch (action.type){
      case "add-post":
         return [...posts, ...action.payload.posts];
   
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

      default:
         return posts
   }
}

const PostFeed = () => {
   const {owner, setOwner} = useGetOwner()
   // const [posts, setPosts] = useState(null)
   // const [posts, setPosts] = useState()
   const [posts, dispatchPost] = useReducer(reducer, [])
   const {posts_url, access_token} = useVariables()
   const navigate = useNavigate()
   
   // Logic: Fetch User Post
   useEffect(()=> {
      
      fetch(posts_url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
         }
      })
      .then(res => res.json())
      .then(data => {
         if (data.detail){
            throw Error("unknown user")
         }
         dispatchPost({ type: "add-post", payload: {posts: data}});
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })
   
   }, [posts_url, access_token, navigate])


   // console.log(posts)
   return (
      <div className="postfeed">

         <HeaderPostFeed />

         <main className='postfeed margin-b-60'>
            <div className="welcome-user pad-top-10">
               {owner && <h3>Welcome {owner.username}</h3>}
            </div>

            {posts && <PostList posts={posts} dispatchPost={dispatchPost}/>}

         </main>

         <Footer />
         
      </div>
   );
}

export default PostFeed;