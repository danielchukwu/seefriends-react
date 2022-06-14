// imports: main
import { useEffect, useState, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// imports: custom hooks
import useVariables from '../../customhooks/useVariables';

// imports: components
import PostList from './PostList'
import Header from '../headers_footers/Header'
import { reducerPost, reducerTell } from '../../App';
import TellsList from './TellsList';
import Loading from './Loading';




const PostSingle = () => {
   const { id } = useParams()
   // const {owner, setOwner} = useGetOwner()
   const [post, dispatchPost] = useReducer(reducerPost, []);
   const [tells, dispatchTell] = useReducer(reducerTell, []);  // Tell threads on single post

   const {posts_url, access_token} = useVariables()
   const navigate = useNavigate()

   const [showLoading, setShowLoading] = useState(true)
   
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
            setShowLoading(false)
            dispatchPost({ type: "add-post", payload: {posts: [data]}});
            dispatchTell({ type: "add-tell", payload: {tells: data.threads}});
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
      }
      
   
   }, [posts_url, access_token, navigate, id])


   // console.log(post)
   return (
      <div className="postfeed">

         <Header page="Post" left={"go-back"} right={"search-chats"} />

         <main className='postfeed'>
            <div className="background-white">
               {post && <PostList posts={post} dispatchPost={dispatchPost}/>}
            </div>

            {post &&
            <div className="thread-container">
               <div className="thread-count-container">
                  <div className="mobile-page-550">
                     <div className="thread-flex">
                        <h3 className="no-margin thread-title">Threads</h3>
                        <p className="no-margin">{tells.length}</p>
                     </div>
                  </div>
               </div>
               {tells && <TellsList tells={tells} dispatchTell={dispatchTell}/>} {/* showTellParent={false} */}
            </div>}


         </main>

         {showLoading && <Loading />}
         
      </div>
   );
}

export default PostSingle;