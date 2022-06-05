// imports: main
import { useEffect, useState, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// imports: custom hooks
import useVariables from '../../customhooks/useVariables';

// imports: components
import PostList from './PostList'
import Header from '../headers_footers/Header'
import Footer from '../headers_footers/Footer';
import { reducerPost } from '../../App';



const PostSingle = () => {
   const { id } = useParams()
   // const {owner, setOwner} = useGetOwner()
   const [post, dispatchPost] = useReducer(reducerPost, []);
   const {posts_url, access_token} = useVariables()
   const navigate = useNavigate()
   
   useEffect(()=> {
      
      if (id){
         fetch(posts_url+id+"/", {
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
            dispatchPost({ type: "add-post", payload: {posts: [data]}});
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
      }
   
   }, [posts_url, access_token, navigate, id])


   console.log(post)
   return (
      <div className="postfeed">

         <Header page="Post" left={"go-back"} right={"search-chats"} />

         <main className='postfeed'>

            {post && <PostList posts={post} dispatchPost={dispatchPost}/>}

         </main>

         {/* <Footer /> */}
         
      </div>
   );
}

export default PostSingle;