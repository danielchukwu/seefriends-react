import { Link } from "react-router-dom";

const ActCommentTell = ({activity, host_url, verified_icon}) => {
   return (
      <div className="activity">
         <div className="activity-2">
            <div className="img-holder">
               <Link to="">
                  <img src={host_url+activity.profile.img} alt="profile" className="img-holder-image" />
               </Link>
            </div>
            <div>
               <p className="no-margin"><Link to="{% url 'other-profile' activity.user.id %}?q={{request.path}}"><strong>{activity.profile.username}
                  {activity.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
               </strong></Link>commented <small className="grey font-10">{activity.date}</small></p>
               <p className="no-margin"><small>{activity.comment.slice(0, 40)}{activity.comment.length > 40 ? "..." : ""}</small></p>
            </div>
         </div>
         <Link to="">
            <div className="activity-right-info font-lobster">
               <strong>T</strong>
            </div>
         </Link>
      </div>
   );
}

export default ActCommentTell;