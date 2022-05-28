import { useEffect, useState } from "react";
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
import HeaderPostFeed from "../headers_footers/HeaderPostFeed";

const AddPost = () => {
   const owner = useGetOwner()
   const {host_url} = useVariables()
   const [userPic, setUserPic] = useState(null)
   const [img, setImg] = useState(null)
   
   useEffect(() => {
      if (owner){
         setUserPic(host_url + owner.profile.img)
      }
   }, [host_url, owner])



   let loadFile = function(event) {
      let reader = new FileReader();
      reader.onload = function(){
         setImg(reader.result)
      };
      console.log(event.target.files[0])
      reader.readAsDataURL(event.target.files[0]);
   };

   return (
      <div className="addpost">

         <HeaderPostFeed />

      <main>
         <section className="form-wrapper background-white">
            <form action="" method="POST" id="form">

               <div className="post-layer-1">
                  <label htmlFor="post-file">
                     <div id="post-file-btn" className="post-file-wrapper">
                        {!img && <h2 id="tapheretopost" className="no-margin white">tap here to post</h2>}
                        {!img && <img id="output" src={""}/>}
                        {img && <img id="output" src={img}/>}
                     </div>
                  </label>
                  <input id="post-file" type="file" onChange={(e) => loadFile(e)} style={{display: "none"}} required />
               </div>
               
               <div className="tf-cover width-p-10 height-p-10">
                  <span className="img-holder-2 flex">
                     {userPic && <img src={userPic} alt="profile-picture" className="img-holder-image" />}
                  </span>
                  
                  <textarea name="caption" id="text-area" placeholder="i love you😉" required></textarea>
               </div>
      
            </form>
         </section>
      </main>

      </div>
   );
}

export default AddPost;