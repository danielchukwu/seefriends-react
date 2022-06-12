import { Link, useNavigate } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";

const HeaderAddPost = ({ handleSubmit, submitReady, page }) => {
   const {go_back_icon, done_black_icon32, done_blue_icon32} = useIcons()
   const navigate = useNavigate()

   

   return (
      <div className="header-react">

      <header className="mobile-page-950">
         <div className="header-wrapper width-p-20 height-p-10">
            <div className="header-1">
               <div className="pf-logo-container">
                  <Link to="" onClick={() => navigate(-1)}>
                     <img src={go_back_icon} alt="" width="25" className="pf-back"/>
                  </Link>
                  {page == 'addPost' && <h3 className="no-margin font-25">New Post</h3>}
                  {page == 'addTell' && <h3 className="no-margin font-25">New Tell</h3>}
               </div>
            </div>
            <div className="header-2">
               <div className="">
                  {!submitReady && <img src={done_black_icon32} alt="user" id="done" width="25"/>}
                  {submitReady && <img src={done_blue_icon32}  onClick={() => handleSubmit()} alt="user" id="done" width="25"/>}
               </div>
            </div>
         </div>
      </header>
      
      </div>
   );
}

export default HeaderAddPost;