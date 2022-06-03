import { Link } from "react-router-dom";

const ActFriends = ({activity, host_url, verified_icon}) => {
   return (
      <div className="activity">
         <Link to={`/users/profile/${activity.profile.user}`}>
         <div className="activity-2">
            <div className="img-holder">
               <img src={host_url + activity.profile.img} alt="profile" className="img-holder-image" />
            </div>
            <p><strong>
               <Link to={`/users/profile/${activity.profile.user}`}>{activity.profile.username}</Link>
               {activity.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
            </strong>is now your friend <small className="grey font-10">{activity.date}</small></p>
         </div>
         </Link>
         <Link to="">
            <div className="activity-right-info font-lobster">
               <strong>F</strong>
            </div>
         </Link>
      </div>
   );
}

export default ActFriends;