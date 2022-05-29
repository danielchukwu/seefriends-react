import { useEffect, useRef, useState } from "react";
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
import HeaderAddPost from "../headers_footers/HeaderAddPost";

const AddPost = () => {
   const owner = useGetOwner()
   const inputRef = useRef()
   const formRef = useRef()
   const {host_url, posts_url, access_token} = useVariables()
   const [userPic, setUserPic] = useState(null)
   const [postimg, setPostImg] = useState(null)    // postImage
   const [submitReady, setSubmitReady] =useState(false)
   
   // logic: set user picture
   useEffect(() => {
      if (owner){
         setUserPic(host_url + owner.profile.img)
      }
      inputRef.current.focus()
      
   }, [host_url, owner])


   // logic: load selected picture url into our postimg state
   let handleLoadFile = function(event) {
      let reader = new FileReader();
      reader.onload = function(){
         setPostImg(reader.result)
      };
      // console.log(event.target.files[0])
      reader.readAsDataURL(event.target.files[0]);
   };

   // form: submission
   const handleSubmit = () => {
      const form = formRef.current;
      const img = postimg;
      const body = inputRef.current.innerHTML;
      console.log(form)
      if (img && body.length >= 5){
         console.log('Form is ready')

         fetch(posts_url, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`},
            body: JSON.stringify({img, body})
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data)
            })
      } else {
         console.log('Form is not ready')
      }
      // form.submit()
   }

   // form: ready for submission
   const isReady =() => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize >= 5 && postimg){
         setSubmitReady(true)
      } else {
         setSubmitReady(false)
      }
   }

   // form: is ready checker on image chage
   useEffect(()=> {
      isReady();
   }, [postimg])

   return (
      <div className="addpost">

      <HeaderAddPost handleSubmit={handleSubmit} submitReady={submitReady}/>

      <main>
         <section className="form-wrapper background-white">
            <form ref={formRef} action="" method="POST" id="form">

               <div className="post-layer-1">
                  <label htmlFor="post-file">
                     <div id="post-file-btn" className="post-file-wrapper">
                        {!postimg && <h2 id="tapheretopost" className="no-margin white">tap here to post</h2>}
                        {!postimg && <img id="output" src={""} />}
                        {postimg && <img id="output" src={postimg} />}
                     </div>
                  </label>
                  <input id="post-file" type="file" onChange={(e) => handleLoadFile(e)} style={{display: "none"}} required />
               </div>
               
               <div className="tf-cover width-p-10 height-p-10">
                  <span className="img-holder-2 flex">
                     {userPic && <img src={userPic} alt="profile-picture" className="img-holder-image" />}
                  </span>
                  
                  <div ref={inputRef} onKeyDown={isReady} onChange={isReady} className="textarea" contentEditable={true} placeholder="i love you😉" required></div>
               </div>
      
            </form>
         </section>
      </main>

      </div>
   );
}

export default AddPost;