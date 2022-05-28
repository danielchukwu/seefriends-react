const HeaderAddPost = () => {
   return (
      <header>
         <div className="header-wrapper width-p-20 height-p-10">
            <div className="header-1">
               <div className="pf-logo-container">
                  <a onclick="history.back()"><img src="images/icons/back icons/back-1.png" alt="" width="25" className="pf-back"/></a>
                  <h3 className="no-margin font-25">New Post</h3>
               </div>
            </div>
            <div className="header-2">
               <div className="">
                  <Link to="#"><img src="images/icons/done/check-markb-32.png" alt="user" id="done" width="25"/></Link>
               </div>
            </div>
         </div>
      </header>
   );
}

export default HeaderAddPost;