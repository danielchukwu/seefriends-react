import { useEffect } from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons"
import useVariables from "../../customhooks/useVariables";

const ShareOn = ({ mPost, setMPost, type, toggle }) => {
   const {verified_icon} = useIcons()
   const {host_url, users_host_url, tells_url, search_url, access_token} = useVariables();
   const inputRef = useRef();
   const [submitReady, setSubmitReady] =useState(false);
   const {owner } = useGetOwner();

   const [shareList, setShareList] = useState([]); // this state will handle the adding of several user id's to share the post or tell to


   const [following, setFollowing] = useState([]);  // Before search starts. this holds the saved searchs
   const [searchs, setSearchs] = useState(null); // When search starts. this holds users

   const searchRef = useRef(); // holds the search input for the search input
   const navigate = useNavigate();

   // logic: display default potential post/tell sharing to users
   useEffect(() => {
      
      // logic: fetch followings
      if (owner){
         fetch(users_host_url+owner.id+'/following/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`
         }
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log("following: ", data);
               setFollowing(data)
            })
            .catch(err => {
               console.log(err.message);
            })
      }
   }, [owner])

   // logic: submit tell
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit')

      let body = inputRef.current.innerHTML;
      console.log(body)

      while (body.length-1 === body.lastIndexOf('\n')){
         body = body.slice(0, -1);
      }

      // FormData: will act as a form for us with Content-Type: "multipart/form-data"

      if (body.length >= 1){
         if (type === "post"){
            toggle(mPost.id, "tell-on-post", body);
            handleClose();
         }else if (type === "tell"){
            toggle(mPost.id, "tell-on-tell", body);
            handleClose();
         }
      }
   }

   // logic: remove floater with styling for exit animation before actually stopping it
   function handleClose() {
      const parent_node = inputRef.current.parentNode.parentNode.parentNode.parentNode;

      parent_node.childNodes[0].classList = "exit-tell-on exit-tell-on-close";
      parent_node.childNodes[2].classList = "tell-on-box tell-on-box-close";

      setTimeout(() => {
         parent_node.childNodes[0].classList = "exit-tell-on";
         parent_node.childNodes[2].classList = "tell-on-box";

         setMPost(null);
      }, 200)
   }

   // logic: check if text input is not empty to know if post is ready
   const isReady =(e) => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize >= 1){
         setSubmitReady(true)
         if (e.key === 'Enter'){
            handleSubmit(e);
         }
      } else {
         setSubmitReady(false)
         if (e.key === 'Enter'){
            return;
         }
      }
   }

   // logic: search for user
   const handleSearch = (e) => {
      let body = e.target.value;
      if (searchRef){
         body = searchRef.current.value;
      }
      if (body.length > 0){

         const uploadData = new FormData();
         uploadData.append('body', body);
         
         fetch(search_url, {
            method: "POST",
            headers: {Authorization: `Bearer ${access_token}`},
            body: uploadData
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               setSearchs(data)
            })
            .catch(err => console.log(err))
         
      } else (
         setSearchs(null)
      )
   }

   // logic: handle adding of user to recieve the share
   const handleAddUser = (id) => {
      // console.log(shareList)
      if (shareList.includes(id)){
         let newList = shareList;
         newList = newList.filter(uid => uid !== id)
         setShareList([...newList])
      } else {
         setShareList([...shareList, id])
      }
      // console.log(shareList)
   }

   // console.log(mPost)
   return (
      <div className="tell-on-container">
         <div className="exit-tell-on" onClick={() => handleClose()}></div> {/* exit-tell-on-close */}
         <div className="msg-on-box"> {/* tell-on-box-close */}

            <form onSubmit={handleSubmit}>
               <div className="search-users">
                  <input ref={searchRef} type="text" name="search" id="search" placeholder="Search" autoComplete="off" onChange={handleSearch}  />

                  {/* Users To Send To */}
                  {/* No Search */}
                  {following && !searchs &&
                  <div className="user-results">
                     
                     { following.map(user => (
                     <div className="activity">
                        <div className="activity-2">
                           <div className="img-holder">
                              <Link to={`/users/profile/${user.id}`}>
                                 <img src={host_url + user.profile.img} alt="profile" className="img-holder-image" />
                              </Link>
                           </div>
                           <p>
                              <Link to={`/users/profile/${user.id}`}>
                                 <strong>
                                    {user.profile.username}
                                    {user.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                                 </strong>
                              </Link> 
                           </p>
                        </div>
                        <div className="activity-right-info">
                           {!shareList.includes(user.id) && <div className="msg-on-add pointer" onClick={() => handleAddUser(user.id)}>
                              <p className="no-margin">Add</p>
                           </div>}
                           {shareList.includes(user.id) && <div className="msg-on-added pointer" onClick={() => handleAddUser(user.id)}>
                              <p className="no-margin">Added</p>
                           </div>}
                        </div>
                     </div>

                     ))}
                  </div>}
                  {/* Search Present */}
                  {searchs && 
                  <div className="user-results">
                     
                     { searchs.map(user => (
                     <div className="activity">
                        <div className="activity-2">
                           <div className="img-holder">
                              <Link to={`/users/profile/${user.id}`}>
                                 <img src={host_url + user.profile.img} alt="profile" className="img-holder-image" />
                              </Link>
                           </div>
                           <p>
                              <Link to={`/users/profile/${user.id}`}>
                                 <strong>
                                    {user.profile.username}
                                    {user.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                                 </strong>
                              </Link> 
                           </p>
                        </div>
                        <div className="activity-right-info">
                           <div className="follow-btn-fff-sub pointer">
                              <p className="no-margin">Add</p>
                           </div>
                        </div>
                     </div>

                     ))}
                  </div>}

               </div>

               <div className="post-or-tell-msg">
                  {mPost.img && 
                  <div className="msg-post-img">
                     <img src={mPost.img} alt="" />
                  </div>}
                  <div className="msg-caption">
                     <h4 className='pot-user'>{mPost.owner.profile.username}
                        {mPost.owner.profile.verified && <img src={verified_icon}className="width-13 verified-pos1" alt="verification" />}
                     </h4>
                     <p className='pot-body'>{mPost.body}</p>
                  </div>
               </div>
               <div className="main-tell-box">
                  <div ref={inputRef} className="textarea-tell-on" contentEditable={true} required onKeyDown={isReady}></div>
                  {/* <div className="textarea-tell-on" contentEditable={true} required onKeyDown={handleEnterSub}></div> */}
               </div>
               <div className="tell-on-button">
                  {submitReady && <button className="button-blue">Release</button>}
                  {!submitReady && <button className="grey-dark" disabled>Release</button>}
                  
               </div>
            </form>

            <div className="share-to-conatiner">
               
            </div>
         </div>
      </div>
   );
}

export default ShareOn;