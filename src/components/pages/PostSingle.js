// imports: main
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// imports: custom hooks
import useVariables from '../../customhooks/useVariables';

// imports: components
import PostList from './PostList'
import HeaderGBT from '../headers_footers/HeaderGBT'
import Footer from '../headers_footers/Footer';



const PostSingle = () => {
   const { id } = useParams()
   // const {owner, setOwner} = useGetOwner()
   const [post, setPost] = useState(null)
   const {posts_url, access_token} = useVariables()
   const navigate = useNavigate()
   
   console.log(posts_url+id+"/")
   
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
            setPost([data])
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

         <HeaderGBT title="Post" />

         <main className='postfeed'>

            {post && <PostList posts={post} />}

         </main>

         {/* <Footer /> */}
         
      </div>
   );
}

export default PostSingle;