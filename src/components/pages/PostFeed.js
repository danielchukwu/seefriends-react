// imports: main
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// imports: custom hooks
import useVariables from '../../customhooks/useVariables';
import useGetOwner from "../../customhooks/useGetOwner";

// imports: components
import PostList from './PostList'
import HeaderPostFeed from '../headers_footers/HeaderPostFeed'
import Footer from '../headers_footers/Footer';



const PostFeed = () => {
   const {owner, setOwner} = useGetOwner()
   const [posts, setPosts] = useState(null)
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
         setPosts(data)
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })
   
   }, [posts_url, access_token, navigate])


   return (
      <div className="postfeed">

         <HeaderPostFeed />

         <main className='postfeed margin-b-60'>
            <div className="welcome-user pad-top-10">
               {owner && <h3>Welcome {owner.username}</h3>}
            </div>

            {posts && <PostList posts={posts} setPosts={setPosts} />}

         </main>

         <Footer />
         
      </div>
   );
}

export default PostFeed;