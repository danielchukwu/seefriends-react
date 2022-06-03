import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import HeaderGBT from "../headers_footers/HeaderGBT";
import useGetOwner from "../../customhooks/useGetOwner";
import CommentsList from "./CommentsList";

const Comment = () => {
   const {owner} = useGetOwner();
   const navigate = useNavigate();
   const {type, id} = useParams();
   const {verified_icon, heart_black_icon, heart_red_icon, send_small_icon, save_icon, options_icon} = useIcons();
   const {host_url, tells_url, posts_url, access_token} = useVariables();
   const [post, setPost] = useState(null);


   useEffect(() => {
      if (type === "posts"){
         console.log("Implement Posts Comments")

         // Fetch Post if: type === post
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
            setPost(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
      
      // Fetch Tells if: type === tell
      } else if (type === "tells") {
         fetch(tells_url+id+"/", {
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
            setPost(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
      }

   }, [type])

   console.log(post)
   
   return (
      <div className="comment-react">

         <HeaderGBT title={"Comments"} />
         
         {post && <CommentsList post={post} setPost={setPost} type={type} owner={owner}/>}

         {owner && 
         <div className="footer">
            <form id="form">

               <div className="comment-btn-container width-p-5">
                  <span className="img-holder flex pad-bot-10">
                     {"me" && <img src={host_url + owner.profile.img} alt="profile-picture" className="img-holder-image" />}
                  </span>
                  
                  {/* <div ref={inputRef} onKeyDown={isReady} onChange={isReady} className="textarea" contentEditable={true} required></div> */}
                  <div className="textarea" contentEditable={true} required></div>

                  <span className="comment-post-btn">post</span>
               </div>
            </form>
         </div>
         }
         
      </div>
   );
}

export default Comment;