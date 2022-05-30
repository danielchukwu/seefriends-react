import { Link } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const FFFList = ({users, page}) => {
   const { host_url } = useVariables()
   const { verified_icon } = useIcons()
   
   console.log("we here....................")
   
   return (
      users.map(user => {

         <div className="activity">
            <div className="activity-2">
               <div className="img-holder">
                  <img src={host_url + user.profile.img} alt="profile-picture" className="img-holder-image" />
               </div>
               <Link to={""}>
                  <p><strong>{user.profile.username}
                  {user.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
                  </strong></p>
               </Link>
            </div>
   
            {/* Follow or Unfollow */}
               {/* <div className="activity-right-info">
                  <Link to="{% url 'unfollow' follower.me.id %}?q={{request.GET.q}}">
                     <div className="following-btn-fff-sub">
                        <p className="no-margin">following</p>
                     </div>
                  </Link>
               </div> */}

               <div className="activity-right-info">
                  <Link to="{% url 'follow' follower.me.id %}?q={{request.GET.q}}">
                     <div className="follow-btn-fff-sub">
                        <p className="no-margin">follow</p>
                     </div>
                  </Link>
               </div>
            {/*  */}

         </div>
      })
   );
}
export default FFFList;