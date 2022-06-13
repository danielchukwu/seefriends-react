import { useState } from "react";
import { useEffect } from "react";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";
import Header from "../headers_footers/Header";

const ProfileSuggestions = () => {
   const {host_url} = useVariables();
   const {verified_icon} = useIcons();
   const {owner} = useGetOwner();

   const [profile, setProfile] = useState();

   // Fetch - verified profiles
   useEffect(() => {

   }, [])
   
   return (
      <div className="profile-suggestions-react background-white">
         
         {/* Header */}
         <Header left={"logo"} right={"search-chats"} />
         
         {/* Body */}
         <div className="suggestion-body">

            {owner && 
            <div className="suggestion-box">

               <div className="profile-layer-1">
                  <div className="profile-picture">
                     <img src={host_url+owner.profile.img} alt="profile-picture" />
                  </div>
               </div>

               <div className="sug-username mobile-page-550">
                     <div className="username">
                        <h2>@{owner.profile.username}
                           {owner.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                        </h2>
                     </div>
                     <small>{owner.profile.bio}</small>
               </div>

               <div className="follow-box">
                  <div className="follow-btn">
                     <p className="no-margin">follow</p>
                  </div>
               </div>

               <div className="sug-posts">
                  <div className="post-box">
                     <img src={host_url+owner.profile.img} alt="profile-picture" />
                  </div>
                  <div className="post-box">
                     <img src={host_url+owner.profile.img} alt="profile-picture" />
                  </div>
                  <div className="post-box">
                     <img src={host_url+owner.profile.img} alt="profile-picture" />
                  </div>
               </div>

            </div>}
         
         </div>
         {/* Footer */}
         <Footer />
         
      </div>

   );
}

export default ProfileSuggestions;