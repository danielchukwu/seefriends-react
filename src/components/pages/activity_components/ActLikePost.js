import { Link } from 'react-router-dom'

const ActLikePost = ({activity, host_url, verified_icon}) => {
   // console.log(activity)
   return (
      <div className="activity">
         <Link to={`/users/profile/${activity.profile.user}`}>
            <div className="activity-2">
               <div className="img-holder">
                  <img src={host_url + activity.profile.img} alt="profile" className="img-holder-image" />
               </div>
               <p><strong>
                  {activity.profile.username}
                  {activity.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                  </strong> liked your post. <small className="grey font-10">{activity.date}</small></p>
            </div>
         </Link>
         <Link to={"/posts/"+activity.post}>
            <div className="activity-right-info">
               <div className="img-holder">
                  <img src={host_url +'/images/'+ activity.postimg} alt="" className="liked-image" />
               </div>
            </div>
         </Link>
      </div>
   );
}

export default ActLikePost;