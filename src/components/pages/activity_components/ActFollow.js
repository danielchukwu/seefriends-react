// imports: main
import { Link } from "react-router-dom";

const ActFollow = ({activity, verified_icon}) => {

   return (
      <div className="activity">
         <div className="activity-2">
            <div className="img-holder">
               <Link to={`/users/profile/${activity.profile.user}`}>
                  <img src={ activity.profile.img} alt="profile" className="img-holder-image" />
               </Link>
            </div>
            <p>
               <Link to={`/users/profile/"${activity.profile.user}`}>
                  <strong>
                     {activity.profile.username}
                     {activity.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                  </strong>
               </Link> started following you <small className="grey font-10">{activity.date}</small>
            </p>
         </div>
      </div>
   );
}

export default ActFollow;