import { useEffect, useState } from 'react';
import useVariables from './customhooks/useVariables';
import PostList from './PostList'



const PostFeed = () => {
   const [posts, setPosts] = useState(null)
   const {posts_url, token_key} = useVariables()
   
   const access_token = JSON.parse(localStorage.getItem(token_key)).access
   
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
         setPosts(data)
      })
      .catch(err => {
         console.log(err.message)
      })
   
   }, [])


   return (
      <main className='postfeed'>
         <div className="welcome-user pad-top-10">
            <h3>Welcome {"username"}</h3>
         </div>

         {posts && <PostList posts={posts} />}

      </main>
   );
}

export default PostFeed;