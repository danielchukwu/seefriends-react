// import: main
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import: custom hooks
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";

// import: components
import HeaderAddPost from "../headers_footers/HeaderAdd";

const AddPost = () => {
   const {owner, setOwner} = useGetOwner();
   const inputRef = useRef();
   const navigate = useNavigate();
   const {host_url, posts_url, access_token} = useVariables();
   const [profilePic, setProfilePic] = useState(null);     // user profile picture     
   const [previewImg, setPreviewImg] = useState(null);     // image preview
   const [postImg, setPostImg] = useState(null);           // postImage
   const [submitReady, setSubmitReady] =useState(false);
   
   // logic: set user picture
   useEffect(() => {
      if (owner){
         setProfilePic(host_url + owner.profile.img)
      }
      inputRef.current.focus()
      
   }, [host_url, owner])


   // logic: load selected picture for preview and set Image in our postImg state
   let handleLoadFile = function(event) {
      let reader = new FileReader();
      reader.onload = function(){
         setPreviewImg(reader.result)
      };
      setPostImg(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
   };

   // form: upload our post if ready
   const handleSubmit = () => {
      let body = inputRef.current.innerHTML;

      // filter out: contenteditable innerHTML <div> tags and <br/> tags
      while(body.includes('<div>') || body.includes('<br>') ||  body.includes('</div>')){
         body = body.replace("<div><br>", '\n');
         body = body.replace("&nbsp;", '');
         body = body.replace("&amp;", '&');
         body = body.replace("<br>", '\n');
         body = body.replace("<div>", '\n');
         body = body.replace("</div>", '');
      }
      while (body.length-1 === body.lastIndexOf('\n')){
         body = body.slice(0, -1);
      }
      
      // FormData: will act as a form for us with Content-Type: "multipart/form-data"
      const uploadData = new FormData();
      uploadData.append('body', body);
      uploadData.append('img', postImg, postImg.name);

      if (postImg && body.length >= 5){

         fetch(posts_url, {
            method: "POST",
            headers: {Authorization: `Bearer ${access_token}`},
            body: uploadData
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data)
               navigate('/')
            })
            .catch(err => console.log(err))
      }
      // form.submit()
   }

   // form: ready for submission
   const isReady =() => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize >= 5 && previewImg){
         setSubmitReady(true)
      } else {
         setSubmitReady(false)
      }
   }

   // form: is ready checker on image chage
   useEffect(()=> {
      isReady();
   }, [previewImg])

   return (
      <div className="addpost-react">

      <HeaderAddPost handleSubmit={handleSubmit} submitReady={submitReady} page="addPost" />

      <main>
         <section className="form-wrapper background-white">
            <form action="" method="POST" id="form">

               <div className="post-layer-1">
                  <label htmlFor="post-file">
                     <div id="post-file-btn" className="post-file-wrapper">
                        {!previewImg && <h2 id="tapheretopost" className="no-margin white">tap here to post</h2>}
                        {!previewImg && <img id="output" src={""} />}
                        {previewImg && <img id="output" src={previewImg} />}
                     </div>
                  </label>
                  <input id="post-file" type="file" onChange={(e) => handleLoadFile(e)} style={{display: "none"}} required />
               </div>
               
               <div className="tf-cover width-p-10 height-p-10">
                  <span className="img-holder-2 flex">
                     {profilePic && <img src={profilePic} alt="profile-picture" className="img-holder-image" />}
                  </span>
                  
                  <div ref={inputRef} onKeyDown={isReady} onChange={isReady} className="textarea" contentEditable={true} required></div>
               </div>
      
            </form>
         </section>
      </main>

      </div>
   );
}

export default AddPost;