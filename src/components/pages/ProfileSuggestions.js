import { useState } from "react";
import { useEffect } from "react";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";
import Header from "../headers_footers/Header";

const ProfileSuggestions = () => {
   const {profiles_url, host_url, access_token} = useVariables();
   const {verified_icon} = useIcons();
   const {owner} = useGetOwner();

   const [profiles, setProfiles] = useState();

   // Fetch - verified profiles
   useEffect(() => {
      fetch(profiles_url, {
         method: "GET",
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
      .then(res => {
         return res.json();
      })
      .then(data => {
         console.log(data)
         setProfiles(data)
         // logic: when owner loads up lets do some page and fff count holder logics
      })
      .catch(err => {
         console.log(err.message);
      })
   }, [])
   
   return (
      <div className="profile-suggestions-react background-white">
         
         {/* Header */}
         <Header left={"logo"} right={"search-chats"} />
         
         {/* Body */}
         {profiles && 
         <div className="suggestion-body">

            {profiles.map(profile => (
               <div className="suggestion-box">

                  <div className="profile-layer-1">
                     <div className="profile-picture">
                        <img src={host_url+profile.img} alt="profile-picture" />
                     </div>
                  </div>

                  <div className="sug-username mobile-page-550">
                        <div className="username">
                           <h2>@{profile.username}
                              {profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                           </h2>
                        </div>
                        <small>{profile.bio.slice(0,40)}</small>
                  </div>

                  <div className="follow-box">
                     <div className="follow-btn">
                        <p className="no-margin">follow</p>
                     </div>
                  </div>

                  <div className="sug-posts">
                     {profile.posts.map(post => (
                        <div className="post-box">
                           <img src={host_url+post.img} alt="profile-picture" />
                        </div>
                     ))}
                  </div>

               </div>
            ))}
         
         </div>
         }
         {/* Footer */}
         <Footer />
         
      </div>

   );
}

export default ProfileSuggestions;