import { Link } from "react-router-dom";

const ActLikeTell = ({activity, verified_icon}) => {
   return (
      <div className="activity">
         <Link to={`/users/profile/${activity.profile.user}`}>
         <div className="activity-2">
            <div className="img-holder">
               <img src={activity.profile.img} alt="profile" className="img-holder-image" />
            </div>
            <p><strong>
               {activity.profile.username}
               {activity.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
            </strong> liked your tell <small className="grey font-10">{activity.date}</small></p>
         </div>
         </Link>
         <Link to={"/tells/"+activity.tell}>
            <div className="activity-right-info font-lobster">
               <strong>T</strong>
            </div>
         </Link>
      </div>
   );
}

export default ActLikeTell;