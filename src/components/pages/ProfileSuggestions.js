import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import Loading from "./Loading";

const ProfileSuggestions = ({justRegistered = true}) => {
   const {profiles_url, host_url, access_token, users_host_url} = useVariables();
   const {verified_icon, sf_logo} = useIcons();
   const {owner, setOwner} = useGetOwner();

   const [profiles, setProfiles] = useState(false);
   const navigate = useNavigate()

   // logic: Fetch - profiles(verified one's)
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
         setProfiles(data)
         // logic: when owner loads up lets do some page and fff count holder logics
      })
      .catch(err => {
         console.log(err.message);
      })
   }, [access_token, profiles_url])

   // logic: Redirect if user if they try to come to this route even after they've registered
   // useEffect(() => {
   //    if (owner){
   //       if (owner.profile.following.length > 0){
   //          navigate(-1)
   //       }
   //    }
   // }, [owner, navigate])

   // toggleFollow
   const toggleFollow = (id) => {
      const newOwner = owner;

      if (owner.profile.following.includes(id)){
         // unfollow
         newOwner.profile.following = newOwner.profile.following.filter(eachid => eachid !== id);
         setOwner({...newOwner});
         
         fetch(users_host_url+id+'/unfollow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
                  })
            .then(res => {
               return res.json();
            })
            .then(data => {
               // console.log(data);
            })
            
      } else {
         // follow
         newOwner.profile.following.push(id);
         setOwner({...newOwner})
         
         fetch(users_host_url+id+'/follow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`}
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               // console.log(data);
            })

      }
      
      // console.log("user:", user)
   }
   
   // console.log(profiles)
   return (
      <div className="profile-suggestions-react background-white">
         
         {justRegistered && 
         <div className="welcome-to-sf">
            <div className="welcome-sf-logo">
               <img src={sf_logo} alt="seefriends logo" />
               {/* <p className="no-margin logo">welcome {owner.profile.username}...</p> */}
            </div>
         </div>}
         
         {/* Body */}
         {profiles && 
         <div className="suggestion-body">

            {profiles.map(profile => (
               <div key={profile.id}>
               <div className="suggestion-box">

                  <div className="profile-layer-1">
                     <div className="profile-picture">
                        <img src={host_url+profile.img} alt="profile-dp" />
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

                  { !owner.profile.following.includes(profile.user) &&
                  <div className="follow-box">
                     <div className="follow-btn pointer" onClick={() => toggleFollow(profile.user)}>
                        <p className="no-margin">follow</p>
                     </div>
                  </div>}

                  { owner.profile.following.includes(profile.user) && 
                  <div className="following-box">
                     <div className="following-btn pointer" onClick={() => toggleFollow(profile.user)}>
                        <p className="no-margin">following</p>
                     </div>
                  </div>}

                  <div className="sug-posts">
                     {profile.posts.map(post => (
                        <div className="post-box" key={post.id}>
                           <img src={host_url+post.img} alt="profile-dp" />
                        </div>
                     ))}
                  </div>

               </div>
               </div>
            ))}
         
         </div>
         }

         {profiles === false && <Loading />}

         {justRegistered && 
         <div className="welcome-to-sf-next">
            <Link to={"/"}>
               <div className="button-next">NEXT</div>
            </Link>
         </div>}
         
      </div>

   );
}

export default ProfileSuggestions;