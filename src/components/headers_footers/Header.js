// imports: main
import { Link } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
// imports: hooks


const Header = () => {
   const {sf_logo, discover_icon, msg_icon} = useIcons()
   const {owner} = useGetOwner()

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
                  <Link to={"/discover"}><img src={discover_icon} alt="" /></Link>
                  <Link to={"#"}><img src={msg_icon} alt="user" /></Link>

                  { owner && owner.profile.msgcount > 0 && <div className="red-circle red-circle-mp">{owner.profile.msgcount}</div>}
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;