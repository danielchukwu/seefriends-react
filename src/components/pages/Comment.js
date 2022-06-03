import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
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
   const inputRef = useRef();
   
   const [submitReady, setSubmitReady] =useState(false);

// Fetch: type: Posts or Tells
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

   // form: upload our post if ready
   const handleSubmit = (e) => {
      e.preventDefault();
      
      let body = inputRef.current.innerHTML;

      // filter out: contenteditable innerHTML <div> tags and <br/> tags
      while(body.includes('<div>') || body.includes('<br>') ||  body.includes('</div>')){
         body = body.replace("<div><br>", ' '); // no new line for commenting instead space
         body = body.replace("&nbsp;", '');
         body = body.replace("&amp;", '&');
         body = body.replace("<br>", ' '); // no new line for commenting instead space
         body = body.replace("<div>", ' '); // no new line for commenting instead space
         body = body.replace("</div>", '');
      }
      while (body.length-1 === body.lastIndexOf('\n')){
         body = body.slice(0, -1);
      }

      // FormData: will act as a form for us with Content-Type: "multipart/form-data"
      const uploadData = new FormData();
      uploadData.append('body', body);

      if (body.length >= 1){

         if (type === "posts"){
            fetch(posts_url+id+"/comment/", {
               method: "POST",
               headers: {Authorization: `Bearer ${access_token}`},
               body: uploadData
            })
               .then(res => {
                  return res.json();
               })
               .then(data => {
                  const newPost = post;
                  newPost.comments.unshift(data);
                  setPost({...newPost})
                  console.log(data)
               })
               .catch(err => console.log(err))
         } else if (type === "tells"){
            fetch(tells_url+id+"/comment/", {
               method: "POST",
               headers: {Authorization: `Bearer ${access_token}`},
               body: uploadData
            })
               .then(res => {
                  return res.json();
               })
               .then(data => {
                  console.log(data)
               })
               .catch(err => console.log(err))
         }
      }

      // const newPost = post;
      // setPost({...newPost})

      inputRef.current.innerHTML = "";
      inputRef.current.focus();
   }

   // form: ready for submission
   const isReady =() => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize !== 0){
         setSubmitReady(true)
      } else {
         setSubmitReady(false)
      }
   }


   console.log(post)
   
   return (
      <div className="comment-react">

         <HeaderGBT title={"Comments"} />
         
         {post && <CommentsList post={post} setPost={setPost} type={type} owner={owner}/>}

         {owner && 
         <div className="footer">
            <form id="form" onSubmit={handleSubmit}>

               <div className="comment-btn-container width-p-5">
                  <span className="img-holder flex pad-bot-10">
                     {"me" && <img src={host_url + owner.profile.img} alt="profile-picture" className="img-holder-image" />}
                  </span>
                  
                  <div ref={inputRef} onKeyDown={isReady} onChange={isReady} className="textarea" contentEditable={true} required></div>

                  {submitReady && <button className="comment-post-btn">post</button>}
                  {!submitReady && <button className="comment-post-btn disabled" disabled>post</button>}
               </div>
            </form>
         </div>
         }
         
      </div>
   );
}

export default Comment;