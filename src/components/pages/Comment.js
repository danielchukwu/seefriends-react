import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import useVariables from "../../customhooks/useVariables";
import Header from "../headers_footers/Header";
import useGetOwner from "../../customhooks/useGetOwner";
import CommentsList from "./CommentsList";

const Comment = () => {
   const {owner} = useGetOwner();
   const navigate = useNavigate();
   const {type, id} = useParams();
   const {tells_url, posts_url, access_token} = useVariables();
   const [post, setPost] = useState(null);
   const inputRef = useRef();
   
   const [submitReady, setSubmitReady] =useState(false);

// Fetch: type: Posts or Tells
   useEffect(() => {
      if (type === "posts"){

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
   }, [type, access_token, id, navigate, posts_url, tells_url])

   // form: upload our post if ready
   const handleSubmit = (e) => {
      e.preventDefault();
      
      let body = inputRef.current.innerHTML;
      // console.log(body)
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
                  // override temporary comment data with main comment data
                  let newPost = post;
                  newPost.comments.shift();
                  newPost.comments.unshift(data);
                  setPost({...newPost})
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
               // override temporary comment data with main comment data
               .then(data => {
                  let newPost = post;
                  newPost.comments.shift();
                  newPost.comments.unshift(data);
                  setPost({...newPost})
               })
               .catch(err => console.log(err))
         }
      }

      let newPost = post;
      newPost.comments.unshift({comment: inputRef.current.innerHTML, created: Date.now(), id: Date.now(), owner: owner, tell: id, updated: Date.now()});
      setPost({...newPost})

      inputRef.current.innerHTML = "";
      inputRef.current.focus();
   }

   // form: ready for submission
   const isReady =(e) => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize !== 0){
         setSubmitReady(true)
         if (e.key === 'Enter'){
            handleSubmit(e);
         }
      } else {
         setSubmitReady(false)
      }
   }

   // logic: focus on input
   setTimeout(()=> {
      inputRef.current.focus()
   }, 200)

   
   return (
      <div className="comment-react">

         <Header  page="Comments" left={"go-back"} right={"search-chats"} />
         
         {post && <CommentsList post={post} setPost={setPost} type={type} owner={owner}/>}

         {owner && 
         <div className="footer">
            <form id="form" onSubmit={handleSubmit}>

               <div className="comment-btn-container width-p-5 mobile-page-750">
                  <span className="img-holder flex pad-bot-10">
                     {"me" && <img src={owner.profile.img} alt="profile-dp" className="img-holder-image" />}
                  </span>
                  
                  <div ref={inputRef} onKeyDown={isReady} className="textarea" contentEditable={true} required></div>

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