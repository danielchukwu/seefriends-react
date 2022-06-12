// imports: main
import { Link, useNavigate } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useLongPress from "../../customhooks/useLongPress";
// imports: hooks


const Header = ({page, left, right}) => {
   const {sf_logo, go_back_icon, discover_icon, msg_icon} = useIcons();
   const {owner} = useGetOwner();
   const navigate = useNavigate();

   // Long Press Logic
   const onLongPress = () => {
      navigate('/search')
   };
   const onClick = () => {
      navigate('/discover');
   };
   const longPressEvent = useLongPress(onLongPress, onClick, {shouldPreventDefault: true, delay: 500});

   return ( 
      <div className="header-react">

         <header className="mobile-page-950">
            <div className="header-wrapper">
               {/* Right */}
               <div className="header-1">

                  {left === "logo" &&
                  <Link to={"/"}>
                     <div className="logo">
                        <img src={sf_logo} alt="seefriends logo" />
                     </div>
                  </Link>}

                  {left === "go-back" &&
                  <div className="pf-logo-container">
                     <Link to="" onClick={() => navigate(-1)}>
                        <img src={go_back_icon} alt="" width="25" className="pf-back"/>
                     </Link>
                     <h3 className="no-margin font-25">{page}</h3>
                  </div>}

                  {left === "title" &&
                  <div className="pf-logo-container">
                     <h3 className="no-margin font-25">{page}</h3>
                  </div>}


               </div>


               {/* Left */}
               <div className="header">

                  {right === "search-chats" && 
                  <div className="inbox">
                     {page === "Discover" && <Link to={"/search"}><img src={discover_icon} alt="" /></Link>}
                     {page !== "Discover" && <Link to={"/discover"}  {...longPressEvent}><img src={discover_icon} alt="" /></Link>}
                     <Link to={"/messages"}><img src={msg_icon} alt="user" /></Link>

                     { owner && owner.profile.msgcount > 0 && <div className="red-circle red-circle-mp">{owner.profile.msgcount}</div>}
                  </div>}

                  {right === "search" 
                  && <div className="inbox">
                     <Link to={"/discover"} {...longPressEvent}><img src={discover_icon} alt="" /></Link>
                  </div>}

                  {right === "chats" 
                  && <div className="inbox">
                     <Link to={"/messages"}><img src={msg_icon} alt="user" /></Link>
                     { owner && owner.profile.msgcount > 0 && <div className="red-circle red-circle-mp">{owner.profile.msgcount}</div>}
                  </div>}

               </div>
            </div>
         </header>
      </div>
   );
}

export default Header;