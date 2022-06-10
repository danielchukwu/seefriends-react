import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
import Header from "../headers_footers/Header";

const EditProfile = () => {
   const { owner } = useGetOwner();
   const {host_url } = useVariables();

   return (
      <div className="editprofile-react">
         <Header page={"Edit Profile"} left={"go-back"} />

         {owner && 
         <main>
            <div className="edit-profile-wrapper width-p-20 height-p-20">

               <form>
                  
                  <label htmlFor="id_img">
                     <div className="change-profile-pic">
                        <img src={host_url + owner.profile.img} id="output" className="output"/>
                     </div>
                     {/* <p id="change-pp-btn">Change Profile Picture</p> */}
                  </label>
                  <input id="id_img" name="img" type="file" onchange="loadFile(event)" className="none" />

                  <div className="edit-profile">
                     <label htmlFor="name">Name</label>
                     <input type="text" name="name" id="name" value={owner.profile.name} />
                     <label htmlFor="username">Username</label>
                     <input type="text" name="username" id="username"value={owner.profile.username} />
                     <label htmlFor="email">Email</label>
                     <input type="text" name="email" id="email" value={owner.profile.email} />
                     <label htmlFor="bio">Bio</label>
                     <textarea type="text" name="bio" id="bio" value={owner.profile.bio}></textarea>

                     <input type="submit" value="Save" />
                  </div>
               </form>
               
            </div>
         </main>}

      </div>
   );
}

export default EditProfile;