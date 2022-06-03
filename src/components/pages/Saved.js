// imports: main
import { useEffect, useState } from "react";
// imports: custom hooks
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
// imports: components
import HeaderSaved from "../headers_footers/HeaderGBT";
import PostList from "./PostList";
import TellsList from "./TellsList";



const Saved = () => {
   const { saved_posts_url, saved_tells_url, access_token} = useVariables();
   const {owner} = useGetOwner();
   const [pt, setPt] = useState("posts")
   const [posts, setPosts] = useState();
   const [tells, setTells] = useState();


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
            setPosts(data)
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
            setTells(data)
         })
         .catch(err => {
            console.log('userprofile error: ', err.message)
         })
      }
      

   }, [owner, saved_posts_url, saved_tells_url, access_token])


   
   
   return (
      <div className="saved-react">

         <HeaderSaved title={"Saved"} />
         <div className="saved-options">

            <div className="options-wrapper">
               
               <div className="profile-posts pointer" onClick={() => setPt("posts")}>
                  {pt === "posts" && <h4>Posts</h4>}
                  {pt !== "posts" && <h4 className="grey-dark">Posts</h4>}
               </div>
               <div className="tell pointer"  onClick={() => setPt("tells")}>
                  {pt === "tells" && <h4>Tells</h4>}
                  {pt !== "tells" && <h4 className="grey-dark">Tells</h4>}
               </div>

            </div>

            <div>
                  { pt === "posts" && posts && <PostList posts={posts} setPosts={setPosts} />}
                  { pt === "tells" && tells && <TellsList tells={tells} setTells={setTells} />}
            </div>

         </div>

      </div>
   );
}

export default Saved;