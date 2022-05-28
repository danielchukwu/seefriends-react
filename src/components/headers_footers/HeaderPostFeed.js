// imports: main
import { Link } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";
// imports: hooks


const HeaderPostFeed = () => {
   const {sf_logo, discover_icon, msg_icon} = useIcons()

   return ( 
      <header>
         <div className="header-wrapper">
            <div className="header-1">
               <Link to={"/"}>
                  <div className="logo">
                     <img src={sf_logo} alt="seefriends logo" />
                  </div>
               </Link>
            </div>
            <div className="header">
               <div className="inbox">
                  <Link to={"#"}><img src={discover_icon} alt="" /></Link>
                  <Link to={"#"}><img src={msg_icon} alt="user" /></Link>

                  {/* {% if chats_count > 0 %} */}
                  <div className="red-circle red-circle-mp">{3}</div>
                  {/* {% endif %} */}
               </div>
            </div>
         </div>
      </header>
   );
}

export default HeaderPostFeed;