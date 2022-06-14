// import: main
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import: custom hooks
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
// import: components
import HeaderAddTell from "../headers_footers/HeaderAdd";



const AddTell = () => {
   const {owner} = useGetOwner();
   const inputRef = useRef();
   const navigate = useNavigate();

   const {host_url, tells_url, access_token} = useVariables();
   const [profilePic, setProfilePic] = useState(null);     // user profile picture     
   const [submitReady, setSubmitReady] =useState(false);

   // logic: set user picture
   useEffect(() => {
      if (owner){
         setProfilePic(host_url + owner.profile.img)
      }
      inputRef.current.focus()
      
   }, [host_url, owner])
   
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

      if (body.length >= 1){

         fetch(tells_url, {
            method: "POST",
            headers: {Authorization: `Bearer ${access_token}`},
            body: uploadData
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               // console.log(data)
               navigate('/tellsfeed')
            })
            .catch(err => console.log(err))
      }
   }

   // form: ready for submission
   const isReady =() => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize >= 1){
         setSubmitReady(true)
      } else {
         setSubmitReady(false)
      }
   }
   
   return (
      <div className="addtell-react">

         <HeaderAddTell handleSubmit={handleSubmit} submitReady={submitReady} page="addTell" />
         
         <main>
            <section className="form-wrapper">
               <form action="" method="POST" id="form">

                  <div className="tf-cover width-p-10 height-p-20">
                     <span className="img-holder-2 flex">
                        {profilePic && <img src={profilePic} alt="profile-dp" className="img-holder-image" />}
                     </span>
                     
                     <div ref={inputRef} onKeyDown={isReady} onChange={isReady} className="textarea" contentEditable={true} required></div>

                  </div>
         
               </form>
            </section>
         </main>

         
      </div>
   );
}

export default AddTell;