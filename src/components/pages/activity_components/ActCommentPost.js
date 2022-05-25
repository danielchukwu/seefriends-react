// imports: main
import { Link } from 'react-router-dom'

const ActCommentPost = ({activity, host_url, verified_icon}) => {
   return (
      <div className="activity">
         <Link to="">
         <div className="activity-2">
            <div className="img-holder">
               <img src={host_url + activity.profile.img} alt="profile" className="img-holder-image" />
            </div>
            <div>
               <p className="no-margin"><strong>{activity.profile.username}
                  {/* {% if activity.user.profile.verified %} */}
                     {activity.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
                  {/* {% endif %} */}
               </strong>commented <small className="grey font-10">{activity.date}</small></p>
               <p className="no-margin"><small>{activity.comment.slice(0, 40)}{activity.comment.length > 30 ? "..." : ""}</small></p>
            </div>
         </div>
         </Link>
         <Link to="{% url 'single-post' activity.post.id %}?q={{request.path}}">
            <div className="activity-right-info">
               <div className="img-holder">
                  <img src={host_url+ "/images/" +activity.postimg} alt="" className="liked-image" />
               </div>
            </div>
         </Link>
      </div>
   );
}

export default ActCommentPost;