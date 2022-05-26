// import: main
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
// import: hooks
import useIcons from "../../customhooks/useIcons";

const Footer = () => {
   const {feed_icon, tells_icon, upload_icon, activity_icon, account_icon} = useIcons()
   
   return ( 
      <footer>
         <div className="footer-wrapper">
            <Link to={"/"}>
               <div className="f-feed" title="feed">
                  <img src={feed_icon} alt="feed" className="small-img" />
               </div>
            </Link>

            <Link to={"/tellsfeed"}>
               <div className="f-tells" title="tells">
                  <img src={tells_icon} alt="tells" className="small-img" />
               </div>
            </Link>
            
            <Link to={"#"}>
               <div className="post-button f-post" title="post">
                  <img src={upload_icon} alt="post" className="small-img" />
               </div>
            </Link>

            <Link to={"/users/activity"}>
               <div className="f-activity" title="activity">
                  <img src={activity_icon} alt="activity" className="small-img" />
                  {/* {% if request.user.profile.activity_count > 0 %} */}
                  <div className="red-circle red-circle-ac">{5}</div>
                  {/* {% endif %} */}
               </div>
            </Link>

            <Link to={"/users/profile"}>
               <div className="f-profile" title="profile">
                  <img src={account_icon} alt="profile" className="small-img" />
               </div>
            </Link>
         </div>
      </footer>
   );
}

export default Footer;