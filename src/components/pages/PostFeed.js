// imports: main
import { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// imports: custom hooks
import useVariables from '../../customhooks/useVariables';
import useGetOwner from "../../customhooks/useGetOwner";

// imports: components
import PostList from './PostList';
import Header from '../headers_footers/Header';
import Footer from '../headers_footers/Footer';
import { reducerPost } from '../../App';
import Loading from './Loading';
import ProfileSuggestions from './ProfileSuggestions';


const PostFeed = () => {
   const {owner} = useGetOwner()
   // const [posts, setPosts] = useState(null)
   // const [posts, setPosts] = useState()
   const [posts, dispatchPost] = useReducer(reducerPost, [])
   const [showLoading, setShowLoading] = useState(true)
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
         dispatchPost({ type: "add-post", payload: {posts: data}});
         setShowLoading(false)
      })
      .catch(err => {
         console.log(err.message)
      })
   
   }, [posts_url, access_token, navigate])


   console.log(owner)

   // console.log(posts)
   return (
      <div className="postfeed">

         <Header page="Posts" left={"logo"} right={"search-chats"} />

         { owner && owner.profile.following.length > 0 &&
         <main className='postfeed margin-b-60'>
            {posts && owner &&
            <div className="welcome-user pad-top-10">
               {owner && <h3>Welcome {owner.username}</h3>}
            </div>}

            {posts && <PostList posts={posts} dispatchPost={dispatchPost}/>}

            
            {showLoading && <Loading />}
            

         </main>}

         {owner && owner.profile.following.length === 0 &&
         <div>
            <ProfileSuggestions justRegistered={false}/>
         </div>}

         
         <Footer />
         
      </div>
   );
}

export default PostFeed;