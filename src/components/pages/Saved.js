// imports: main
import { useEffect, useState, useReducer } from "react";
import { reducerPost, reducerTell } from "../../App";
// imports: custom hooks
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
// imports: components
import Header from "../headers_footers/Header";
import Loading from "./Loading";
import PostList from "./PostList";
import TellsList from "./TellsList";



const Saved = () => {
   const { saved_posts_url, saved_tells_url, access_token} = useVariables();
   const {owner} = useGetOwner();
   const [pt, setPt] = useState("posts")
   const [posts, dispatchPost] = useReducer(reducerPost, []);
   const [tells, dispatchTell] = useReducer(reducerTell, []);

   const [showLoading, setShowLoading] = useState(true)



   // SECTION 1:
   // GRAB/FETCH: posts & tells
   useEffect(() => {

      if (owner){

         // logic: fetch saved posts
         fetch(saved_posts_url, {
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
         })
         .then(res => res.json())
         .then(data => {
            dispatchPost({ type: "add-post", payload: {posts: data}});
            setShowLoading(false);
         })
         .catch(err => {
            console.log('userprofile error: ', err.message)
         })

         // logic: fetch saved tells
         fetch(saved_tells_url, {
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
         })
         .then(res => res.json())
         .then(data => {
            dispatchTell({ type: "add-tell", payload: {tells: data}});
            setShowLoading(false);
         })
         .catch(err => {
            console.log('userprofile error: ', err.message)
         })
      }
      

   }, [owner, saved_posts_url, saved_tells_url, access_token])


   
   console.log(owner)
   return (
      <div className="saved-react">

         <Header page="Saved" left={"go-back"} right={""} />
         <div className="saved-options">

            <div className="options-container">
               <div className="options-wrapper">
                  
                  <div className="profile-posts pointer" onClick={() => setPt("posts")}>
                     {pt === "posts" && <h4 className="no-margin">Posts</h4>}
                     {pt !== "posts" && <h4 className="grey-dark no-margin">Posts</h4>}
                  </div>
                  <div className="tell pointer"  onClick={() => setPt("tells")}>
                     {pt === "tells" && <h4 className="no-margin">Tells</h4>}
                     {pt !== "tells" && <h4 className="grey-dark no-margin">Tells</h4>}
                  </div>

               </div>
            </div>

            <div className="saved-list">
                  { pt === "posts" && posts && <PostList posts={posts} dispatchPost={dispatchPost} />}
                  { pt === "tells" && tells && <TellsList tells={tells} dispatchTell={dispatchTell} />}

                  {showLoading && <Loading />}
            </div>

         </div>

      </div>
   );
}

export default Saved;