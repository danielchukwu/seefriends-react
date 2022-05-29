import { Link, useNavigate } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";

const HeaderSaved = () => {
   const {go_back_icon} = useIcons()
   const navigate = useNavigate()

   

   return (
      <header>
         <div className="header-wrapper width-p-20 height-p-10">
            <div className="header-1">
               <div className="pf-logo-container">
                  <Link to="" onClick={() => navigate(-1)}>
                     <img src={go_back_icon} alt="" width="25" className="pf-back"/>
                  </Link>
                  <h3 className="no-margin font-25">Saved</h3>
               </div>
            </div>
         </div>
      </header>
   );
}

export default HeaderSaved;