// import: main
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
// import: hooks
import useIcons from "../../customhooks/useIcons";
import useLongPress from "../../customhooks/useLongPress";
import useVariables from "../../customhooks/useVariables";

const Footer = () => {
   const navigate = useNavigate()
   const {feed_icon, tells_icon, upload_icon, activity_icon, account_icon} = useIcons()
   const {token_key} = useVariables()
   const [floaterUpEnabled, setFloaterUpEnabled] = useState(false)
   const [floaterProfileEnabled, setFloaterProfileEnabled] = useState(false)
   const {owner} = useGetOwner()
   
   const handleUploadFloater = () => {
      // console.log("You Clicked me!")
      setFloaterUpEnabled(!floaterUpEnabled)
   }
   const handleProfileFloater = () => {
      setFloaterProfileEnabled(!floaterProfileEnabled)
   }

   // Long Press Logic
   const onLongPress = () => {
      handleProfileFloater()
   };
   const onClick = () => {
      navigate('/users/profile');
   };
   const longPressEvent = useLongPress(onLongPress, onClick, {shouldPreventDefault: true, delay: 500});

   // logic: Logout
   const handleLogout = () => {
      localStorage.removeItem(token_key)
      navigate('/login')
   }
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
            
            <Link to={"#"} onClick={() => handleUploadFloater()}>
               <div className="post-button f-post" title="post">
                  <img src={upload_icon} alt="post" className="small-img" />
               </div>
            </Link>

            <Link to={"/users/activity"}>
               <div className="f-activity" title="activity">
                  <img src={activity_icon} alt="activity" className="small-img" />
                  {owner && owner.profile.activity_count > 0 && <div className="red-circle red-circle-ac">{owner.profile.activity_count}</div>}
               </div>
            </Link>

            <Link to={"/users/profile"} {...longPressEvent}>
               <div className="f-profile" title="profile">
                  <img src={account_icon} alt="profile" className="small-img" />
               </div>
            </Link>
         </div>

         {/* Pop up */}

         {floaterUpEnabled && (

            <div className="floater-container">
               <div className="floater-exit" onClick={() => handleUploadFloater()}></div>

               <div className="floater-box">
                  <div className="floater-bottom-options">
                     <hr className="hr-mini-bar" />
                     <div className="options">
                        <Link to={"/addpost"}><h3>Post</h3></Link>
                        <Link to={"/addtell"}><h3>Tell</h3></Link>
                     </div>
                  </div>
               </div>
            </div>

         )}

         {floaterProfileEnabled && (

            <div className="floater-container">
               <div className="floater-exit" onClick={() => handleProfileFloater()}></div>

               <div className="floater-box">
                  <div className="floater-bottom-options">
                     <hr className="hr-mini-bar" />
                     <div className="options">
                        <Link to={"/"}><h3>Edit profile</h3></Link>
                        <Link to={"/"}><h3>Settings</h3></Link>
                        <h3 onClick={() => handleLogout()}>Logout</h3>
                     </div>
                  </div>
               </div>
            </div>

         )}

      </footer>

   );
}

export default Footer;