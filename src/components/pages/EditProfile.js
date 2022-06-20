import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
import Header from "../headers_footers/Header";

const EditProfile = () => {
   const { owner } = useGetOwner();
   const [previewImg, setPreviewImg] = useState(null);     // image preview
   const [postImg, setPostImg] = useState(null);           // postImage
   const {host_url, update_url, access_token} = useVariables();

   const navigate = useNavigate();
   const [showErrors, setShowErrors] = useState();

   const [name, setName] = useState();
   const [username, setUsername] = useState();
   const [email, setEmail] = useState();
   const [bio, setBio] = useState();

   const handleLoadFile = (event) => {
      // console.log(event);
      let reader = new FileReader();
      reader.onload = function(){
         setPreviewImg(reader.result)
      };
      setPostImg(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
   }

   useEffect(() => {
      if (owner) {
         setName(owner.profile.name)
         setUsername(owner.profile.username)
         setEmail(owner.profile.email)
         setBio(owner.profile.bio)
      }
   },[owner])

   const handleSubmit = (e) => {
      e.preventDefault();

      // console.log(name)
      // console.log(username)
      // console.log(email)
      // console.log(bio)
      // console.log(postImg)
      
      // FormData: will act as a form for us with Content-Type: "multipart/form-data"
      const uploadData = new FormData();
      uploadData.append('name', name);
      uploadData.append('username', username);
      uploadData.append('email', email);
      uploadData.append('bio', bio);
      if (postImg){
         uploadData.append('img', postImg, postImg.name);
      }

      fetch(update_url, {
         method: "POST",
         headers: {Authorization: `Bearer ${access_token}`},
         body: uploadData
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            console.log(data)
            if (data.details === "successful!"){
               navigate('/users/profile')
            } else {
               handleErrors(data);
            }
         })
         .catch(err => console.log(err))
   }

   // logic: Error Handler for Editing Profile
   const handleErrors = (data) => {
      const errors = data.errors

      if (errors.includes('username') && errors.includes('email')){
         setShowErrors('Username and Email already exists!')

      } else if (errors.includes('username')) {
         setShowErrors('Username already exists!')

      } else if (errors.includes('email')){
         setShowErrors('Email already exists!')
      } else if (errors.includes('not a username')){
         setShowErrors('Username contains invalid characters!')
      }
   }
   
   
   return (
      <div className="editprofile-react background-white">
         <Header page={"Edit Profile"} left={"go-back"} />

         {showErrors && 
         <div className="error-box-app">
            <p className="no-margin">{showErrors}</p>
            <p className="no-margin" onClick={() => setShowErrors(null)}>&#x2716;</p>
         </div>}

         {owner && 
         <main>
            <div className="edit-profile-wrapper width-p-20 height-p-20">

               <form onSubmit={(e) => handleSubmit(e)}>
                  
                  <label htmlFor="id_img">
                     <div className="change-profile-pic">
                        {!previewImg && <img src={host_url + owner.profile.img} className="output"/>}
                        {previewImg && <img src={previewImg} className="output"/>}
                        
                     </div>
                     <p id="change-pp-btn">Change Profile Picture</p>
                  </label>
                  <input id="id_img" name="img" type="file" onChange={(e) => handleLoadFile(e)} className="none" />

                  <div className="edit-profile">
                     <label htmlFor="name">Name</label>
                     <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required/>
                     <label htmlFor="username">Username</label>
                     <input type="text" name="username" id="username"value={username} onChange={e => setUsername(e.target.value)} required/>
                     <label htmlFor="email">Email</label>
                     <input type="text" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                     <label htmlFor="bio">Bio</label>
                     <textarea type="text" name="bio" id="bio" value={bio} onChange={e => setBio(e.target.value)}></textarea>

                     <input type="submit" value="Save" />
                  </div>
               </form>
               
            </div>
         </main>}

      </div>
   );
}

export default EditProfile;