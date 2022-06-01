import { Link } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const FFFList = ({users, page, profileOwner}) => {
   const { host_url } = useVariables();
   const { verified_icon } = useIcons();
   const owner = useGetOwner()
   
   return (
      <section>
         {profileOwner && owner && (
            <div className="activity fff-main-user">
               <Link to={`/users/profile/${profileOwner.id}/`}>
                  <div className="activity-2">
                     <div className="img-holder">
                        <img src={host_url + profileOwner.profile.img} alt="profile-picture" className="img-holder-image" />
                     </div>
                     <h3 className="no-margin width-p-10"><strong>{profileOwner.profile.username}
                        {profileOwner.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
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
            
         )}

         <hr className="hr-line"></hr>

         {users.map(user => (
               
            owner &&
            <div className="activity" key={user.id}>
               <div className="activity-2">
                  <div className="img-holder">
                     <img src={host_url + user.profile.img} alt="profile-picture" className="img-holder-image" />
                  </div>
                  <Link to={`/users/profile/${user.id}/`}>
                     <p><strong>{user.profile.username}
                     {user.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
                     </strong></p>
                  </Link>
               </div>
      
               {/* Follow or Unfollow */}

                  {owner.profile.following.includes(user.id) && (

                     <div className="activity-right-info">
                        <Link to="{% url 'unfollow' follower.me.id %}?q={{request.GET.q}}">
                           <div className="following-btn-fff-sub">
                              <p className="no-margin">following</p>
                           </div>
                        </Link>
                     </div>
                  )}

                  {!owner.profile.following.includes(user.id) && (

                     <div className="activity-right-info">
                        <Link to="{% url 'follow' follower.me.id %}?q={{request.GET.q}}">
                           <div className="follow-btn-fff-sub">
                              <p className="no-margin">follow</p>
                           </div>
                        </Link>
                     </div>
                  )}
               {/*  */}

            </div>
            

         ))}

      </section>
   );
}
export default FFFList;