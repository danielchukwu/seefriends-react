import { Link } from "react-router-dom";

const ActLikeTell = ({activity, host_url, verified_icon}) => {
   return (
      <div className="activity">
         <Link to="">
         <div className="activity-2">
            <div className="img-holder">
               <img src={host_url + activity.profile.img} alt="profile" className="img-holder-image" />
            </div>
            <p><strong>{activity.profile.username} 
               {activity.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
            </strong>liked your tell. <small className="grey font-10">{activity.date}</small></p>
         </div>
         </Link>
         <Link to="">
            <div className="activity-right-info font-lobster">
               <strong>T</strong>
            </div>
         </Link>
      </div>
   );
}

export default ActLikeTell;