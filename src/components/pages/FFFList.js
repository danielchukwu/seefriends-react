import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const FFFList = ({users, setUsers, page, profileOwner, owner}) => {
   const {access_token, users_host_url, host_url} = useVariables()
   const { verified_icon } = useIcons();

   // toggleFollow
   const toggleFollow = (id) => {
      const newUsers = [...users];
      const user = newUsers.find(user => user.id === id);
      if (owner.profile.following.includes(user.id)){
         // unfollow
         owner.profile.following = owner.profile.following.filter(eachid => eachid !== id);
         setUsers(newUsers)

         fetch(users_host_url+id+'/unfollow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data);
            })
      
      } else {
         // follow
         owner.profile.following.push(id);
         setUsers(newUsers)

         fetch(users_host_url+id+'/follow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`}
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data);
            })

      }
      // console.log("user:", user)
   }
   
   
   return (
      <section>
         {profileOwner && owner && (
            <div className="fff-owner-container">
               <div className="activity fff-main-user mobile-page-512">
                  <Link to={`/users/profile/${profileOwner.id}/`}>
                     <div className="activity-2">
                        <div className="img-holder">
                           <img src={host_url + profileOwner.profile.img} alt="profile-picture" className="img-holder-image" />
                        </div>
                        <h3 className="no-margin width-p-10"><strong>{profileOwner.profile.username}
                           {profileOwner.profile.verified && <img src={verified_icon} className="width-15 verified-pos2" alt="verification" />}
                        </strong></h3>
                     </div>
                  </Link>
                  
                  <div className="activity-right-info">
                     {page.toLowerCase() !== "friends" && <div className="following-btn-fff">
                        <p className="no-margin">{page.toLowerCase()}...</p>
                     </div>}
                     {page.toLowerCase() === "friends" && <div className="following-btn-fff friends-btn">
                        <p className="no-margin">{page.toLowerCase()}...</p>
                     </div>}
                  </div>
               </div>
            </div>
            
         )}

         <div className="fff-body">
            {users.map(user => (
                  
               owner &&
               <div className="activity" key={user.id}>
                  <div className="activity-2">
                     <div className="img-holder">
                        <img src={host_url + user.profile.img} alt="profile-picture" className="img-holder-image" />
                     </div>
                     <Link to={`/users/profile/${user.id}/`}>
                        <p><strong>{user.profile.username}
                        {user.profile.verified && <img src={verified_icon} className="width-13 verified-pos2" alt="verification" />}
                        </strong></p>
                     </Link>
                  </div>
         
                  {/* Follow or Unfollow */}

                     {owner.profile.following.includes(user.id) && owner.id !== user.id && (

                        <div className="activity-right-info">
                           <div className="following-btn-fff-sub pointer" onClick={() => toggleFollow(user.id)}>
                              <p className="no-margin">following</p>
                           </div>
                        </div>
                     )}

                     {!owner.profile.following.includes(user.id) && owner.id !== user.id && (

                        <div className="activity-right-info">
                           <div className="follow-btn-fff-sub pointer" onClick={() => toggleFollow(user.id)}>
                              <p className="no-margin">follow</p>
                           </div>
                        </div>
                     )}

                     {owner.id === user.id && (

                        <div className="activity-right-info">
                           <div className="following-btn-fff-sub pointer" onClick={() => toggleFollow(user.id)}>
                              <p className="no-margin">You😎✌</p>
                           </div>
                        </div>
                     )}
                     
                  {/*  */}

               </div>
               

            ))}
         </div>

      </section>
   );
}
export default FFFList;