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
import { ACTIONS, reducerPost } from '../../App';


const PostFeed = () => {
   const {owner, setOwner} = useGetOwner()
   // const [posts, setPosts] = useState(null)
   // const [posts, setPosts] = useState()
   const [posts, dispatchPost] = useReducer(reducerPost, [])
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
      })
      .catch(err => {
         console.log(err.message)
      })
   
   }, [posts_url, access_token, navigate])


   // console.log(posts)
   return (
      <div className="postfeed">

         <Header page="Posts" left={"logo"} right={"search-chats"} />

         <main className='postfeed margin-b-60'>
            <div className="welcome-user pad-top-10">
               {owner && <h3>Welcome {owner.username}</h3>}
            </div>

            {posts && <PostList posts={posts} dispatchPost={dispatchPost}/>}

            
            <div className="test-react">
               
               <div className="spinner-box">
                  <div className="circle-box">
                     <div className="circle-core"></div>
                  </div>
               </div>

            </div>
            

         </main>

         
         <Footer />
         
      </div>
   );
}

export default PostFeed;