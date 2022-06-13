// imports: main
import { useState } from 'react';
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// imports: custom hooks
import useIcons from '../../customhooks/useIcons';
import useVariables from '../../customhooks/useVariables';
import useGetOwner from '../../customhooks/useGetOwner';
import TellOn from '../pop_ups/TellOn';
import ShareOn from '../pop_ups/ShareOn';
// imports: images

const TellsList = ({ tells, dispatchTell, removeParentLike=true }) => {
   const {owner} = useGetOwner();
   const {verified_icon, heart_black_icon, heart_red_icon, send_small_icon, save_icon, saved_icon, options_icon} = useIcons();
   const {host_url, tells_url, messages_url, access_token} = useVariables();
   const [tPost, setTPost] = useState();
   const [mPost, setMPost] = useState();



   // logic: Post Events: Like, save, tell-on, msg
   const toggle = (id, toggleType, body, shareList) => {
      console.log(body)
      switch(toggleType){
         case "like":
            console.log(body)
            if (body === "like-parent-tell" || body === "like-parent-post"){ // if body: like parent tell
               dispatchTell({type: "like-tell", payload:{id: id, tells: tells, owner: owner, tells_url: tells_url, access_token: access_token, body: body}});
            } 
            else { // body: like tell
               dispatchTell({type: "like-tell", payload:{id: id, tells: tells, owner: owner, tells_url: tells_url, access_token: access_token}});
            }
            break;
         case "save":
            dispatchTell({type: "save-tell", payload:{id: id, tells: tells, owner: owner, tells_url: tells_url, access_token: access_token}});
            break;
         case "tell-on-tell":
            dispatchTell({type: "tell-on-tell", payload:{id: id, tells: tells, owner: owner, tells_url: tells_url, access_token: access_token, body: body}});
            break;
         case "share-tell":
            // console.log("share tell now.........")
            dispatchTell({type: "share-tell", payload:{id: id, tells: tells, owner: owner, tells_url: messages_url, access_token: access_token, body: body, shareList: shareList}});
            break;
         default:
            console.log("You didn't pass in => the type of toggle you want (e.g like, save, tell, msg)")
      }

   }

   // logic: first comment
   const getfirstComment = (tell, which) => {
      // if (tell.comments.length === 0) return;
      const comment = tell.comments[0];
      
      if (which === 'username') {
         return comment.owner.profile.username;
      } else if (which === 'comment') {
         return comment.comment;
      } else if (which === 'verified') {
         return comment.owner.profile.verified;
      }
   }

   // Show see Threads Link on click
   const showThreadLink = (e) => {
      const seeThreads = e.target.parentNode.childNodes[0]
      if (seeThreads.classList.contains("none")){
         seeThreads.classList = ["see-threads-box"]
      } else {
         seeThreads.classList = ["see-threads-box none"]
      }
      // seeThreads.classList =
      console.log(seeThreads.classList)
   }

   console.log(tells)
   return (

      <section className="tellslist tell-wrapper">

         {tells.map(tell => (
            <div  key={tell.id}>
               {/* TELL */}
               {tell.type === "" &&
               <div className="content-wrapper-comment width-p-20 pad-top-10 pad-bot-10">
                  <div className="content-box">
                     <div className="content-2 no-borders">
                        <div className="content-layer-1">
                           <div className="cl-left flex">
                              <div className="img-holder">
                                 <img src={host_url + tell.owner.profile.img} alt="profile" className="img-holder-image" />
                              </div>
                              <div className="content-owner">
                                 <Link to={`/users/profile/${tell.owner.id}`}>
                                    <h3 className="no-margin">{tell.owner.profile.username}
                                       {tell.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                                    </h3>
                                 </Link>
                              </div>
                           </div>
                           {/* {% if request.user not in tell.likers.all %} */}
                           <div className="tcon" data-tid={tell.id}>
                              
                              {owner && !tell.liked && <img src={heart_black_icon} className="theartb" alt="like" onClick={() => toggle(tell.id, "like")} />}
                              {owner && tell.liked && <img src={heart_red_icon} className="theartr" alt="dislike" onClick={() => toggle(tell.id, "like")} />}
                              <small><strong className="lcount">{tell.likers.length}</strong></small>
                           </div>
                        </div>
                        <div className="content-layer-2 pad-top-5">
                           <p className="no-margin pre-wrap">{tell.body}</p>
                        </div>

                        {/* First Comment Section */}
                        {tell.comments.length > 0 && (
                        <div className="content-layer-3">
                           <p className="no-margin pad-top-5">
                              <Link to={`/users/profile/${tell.comments[0].owner.id}`}>
                                 <strong>
                                    {getfirstComment(tell, "username")}{getfirstComment(tell, "verified") && <img src={verified_icon}className="width-12 verified-pos1" alt="verification" />}
                                 </strong>
                              </Link> {getfirstComment(tell, "comment")}
                           </p>
                        </div>
                        )}
                        {/*  */}

                        {/* CommentCount and Date Section */}
                        <div className="content-layer-4-updated flex">
                           <Link to={`/tells/${tell.id}/comments`}>
                              {tell.comments.length === 0 && <small className="grey no-margin pad-top-5 pad-bot-5">no comments</small>}

                              {tell.comments.length === 1 && <small className="grey no-margin pad-top-5 pad-bot-5">there's no other comment</small>}

                              {tell.comments.length > 1 && <small className="grey no-margin pad-top-5 pad-bot-5">see {tell.comments.length - 1} other comments</small>}
                           </Link>
                           <small className="grey no-margin">{tell.date}</small>
                        </div>
                        {/*  */}
                     </div>
                  </div>
                  <div className="content-layer-0">
                     <div className="cl1-left">
                        <img src={send_small_icon} alt="" title="respond to post" onClick={() => setMPost(tell)}/>
                        <p >{tell.sharers_count}</p>

                        
                        <strong className="font-lobster" title="tell on" onClick={() => setTPost(tell)}>T</strong>
                        <p>{tell.tellers_count}</p>


                        
                        {owner && !tell.savers.includes(owner.id) && <img src={save_icon} title="save tell" alt="" onClick={() => toggle(tell.id, "save")}/>}
                        {owner && tell.savers.includes(owner.id) && <img src={saved_icon} title="save tell" alt="" onClick={() => toggle(tell.id, "save")} />}
                        <p>{tell.savers.length}</p>
                     </div>
                     <div className="cl1-right">
                        <div className="see-threads-box none">
                           <Link to={"/tells/"+tell.id}>
                              <p className="no-margin">see Threads</p>
                           </Link>
                        </div>
                        <img src={options_icon} alt="" onClick={e => showThreadLink(e)}/>
                     </div>
                  </div>
               </div>}

               {/* TELL ON TELL */}
               {tell.type === "tell" && 
               <div className="content-wrapper-comment width-p-20 pad-top-10 pad-bot-10" onLoad={console.log("Called: "+ tell.tell_on_tell)}>

               <div className="told-on-container">
                  <div className="ton flex">
                     <div className="tell-on-owner flex">
                        <div className="img-holder">
                           <img src={host_url + tell.tell_on_tell.owner.profile.img} alt="profile-picture" className="img-holder-image" />
                        </div>
                        <div className="content-owner pad-left-9">
                           <Link to={`/users/profile/${tell.tell_on_tell.owner.id}`}>
                              <h3 className="no-margin">{tell.tell_on_tell.owner.profile.username}
                                 {tell.tell_on_tell.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                              </h3>
                           </Link>
                        </div>
                     </div>
                     {/* Fix Needed */}
                     { removeParentLike === false &&
                     <div className="tcon" data-tid={tell.tell_on_tell.id}>
                        {owner && !tell.tell_on_tell.liked && <img src={heart_black_icon} className="theartb" alt="like" onClick={() => toggle(tell.id, "like", "like-parent-tell")} />}
                        
                        {owner && tell.tell_on_tell.liked && <img src={heart_red_icon} className="theartr" alt="dislike" onClick={() => toggle(tell.id, "like", "like-parent-tell")} />}
                        <small><strong className="lcount">{tell.tell_on_tell.likers.length}</strong></small>
                     </div>
                     }
                  </div>
                  <div className="tb-container  height-p-10">
                     <span className="vertical-rule"></span>
                     <Link to={"/tells/"+tell.tell_on_tell.id}>
                        <div className="tb">
                           <p className="no-margin">{tell.tell_on_tell.body}</p>
                        </div>
                     </Link>
                  </div>
               </div>
               
               <div className="teller-container">
                  <div className="content-box">
                     <div className="content-2 no-borders">
                        <div className="content-layer-1">
                           <div className="cl-left flex">
                              <div className="img-holder">
                                 <img src={host_url + tell.owner.profile.img} alt="profile" className="img-holder-image" />
                              </div>
                              <div className="content-owner">
                                 <Link to={`/users/profile/${tell.owner.id}`}>
                                    <h3 className="no-margin">{tell.owner.profile.username}
                                       {tell.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                                    </h3>
                                 </Link>
                              </div>
                           </div>
                           {/* {% if request.user not in tell.likers.all %} */}
                           <div className="tcon" data-tid={tell.id}>
                              
                              {owner && !tell.liked && <img src={heart_black_icon} className="theartb" alt="like" onClick={() => toggle(tell.id, "like")} />}
                              {owner && tell.liked && <img src={heart_red_icon} className="theartr" alt="dislike" onClick={() => toggle(tell.id, "like")} />}
                              <small><strong className="lcount">{tell.likers.length}</strong></small>
                           </div>
                        </div>
                        <div className="content-layer-2 pad-top-5">
                           <p className="no-margin pre-wrap">{tell.body}</p>
                        </div>

                        {/* First Comment Section */}
                        {tell.comments.length > 0 && (
                        <div className="content-layer-3">
                           <p className="no-margin pad-top-5">
                              <Link to={`/users/profile/${tell.comments[0].owner.id}`}>
                                 <strong>
                                    {getfirstComment(tell, "username")}{getfirstComment(tell, "verified") && <img src={verified_icon}className="width-12 verified-pos1" alt="verification" />}
                                 </strong>
                              </Link> {getfirstComment(tell, "comment")}
                           </p>
                        </div>
                        )}
                        {/*  */}

                        {/* CommentCount and Date Section */}
                        <div className="content-layer-4-updated flex">
                           <Link to={`/tells/${tell.id}/comments`}>
                              {tell.comments.length === 0 && <small className="grey no-margin pad-top-5 pad-bot-5">no comments</small>}

                              {tell.comments.length === 1 && <small className="grey no-margin pad-top-5 pad-bot-5">there's no other comment</small>}

                              {tell.comments.length > 1 && <small className="grey no-margin pad-top-5 pad-bot-5">see {tell.comments.length - 1} other comments</small>}
                           </Link>
                           <small className="grey no-margin">{tell.date}</small>
                        </div>
                        {/*  */}
                     </div>
                  </div>
                  <div className="content-layer-0">
                     <div className="cl1-left">
                        <img src={send_small_icon} alt="" title="respond to post" onClick={() => setMPost(tell)} />
                        <p >{tell.sharers_count}</p>

                        
                        <strong className="font-lobster" title="tell on" onClick={() => setTPost(tell)}>T</strong>
                        <p>{tell.tellers_count}</p>


                        
                        {owner && !tell.savers.includes(owner.id) && <img src={save_icon} title="save tell" alt="" onClick={() => toggle(tell.id, "save")}/>}
                        {owner && tell.savers.includes(owner.id) && <img src={saved_icon} title="save tell" alt="" onClick={() => toggle(tell.id, "save")} />}
                        <p>{tell.savers.length}</p>
                     </div>
                     <div className="cl1-right">
                        <div className="see-threads-box none">
                           <Link to={"/tells/"+tell.id}>
                              <p className="no-margin">see Threads</p>
                           </Link>
                        </div>
                        <img src={options_icon} alt="" onClick={e => showThreadLink(e)}/>
                     </div>
                  </div>
               </div>

               </div>}

               {/* TELL ON POST */}
               {tell.type === "post" && 
               <div className="content-wrapper-comment width-p-20 pad-top-10 pad-bot-10">
                  <div className="told-on-container">
                     <div className="ton flex">
                        <div className="tell-on-owner flex">
                           <div className="img-holder">
                              <img src={host_url + tell.tell_on_post.owner.profile.img} alt="profile-picture" className="img-holder-image" />
                           </div>
                           <div className="content-owner pad-left-9">
                              <Link to={`/users/profile/${tell.tell_on_post.owner.id}`}>
                                 <h3 className="no-margin">{tell.tell_on_post.owner.profile.username}
                                 {tell.tell_on_post.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                                 </h3>
                              </Link>
                           </div>
                        </div>
                        {/* Fix Needed */}
                        { removeParentLike === false &&
                        <div className="tcon" data-tid={tell.tell_on_post.id}>
                           {owner && !tell.tell_on_post.liked && <img src={heart_black_icon} className="theartb" alt="like" onClick={() => toggle(tell.id, "like", "like-parent-post")} />}

                           {owner && tell.tell_on_post.liked && <img src={heart_red_icon} className="theartr" alt="dislike" onClick={() => toggle(tell.id, "like", "like-parent-post")} />}
                           <small><strong className="lcount">{tell.tell_on_post.likers.length}</strong></small>
                        </div>}
                     </div>
                     <div className="tb-container  height-p-10">
                        <span className="vertical-rule"></span>
                        <Link to={"/posts/"+tell.tell_on_post.id}>
                           <div className="tb pad-right-20">
                              <div className="big-heart-parent">
                                 <img src="images/icons/heart/heart-red.png" alt="" className="big-heart none" />
                                 <img src={tell.tell_on_post.img} alt="post" className="post-img border-rad-20" />
                              </div>
                              <p className="no-margin">{tell.tell_on_post.body}</p>

                              {/* <div className="cl1-left pad-top-5">
                              
                                 <img src={send_small_icon} alt="" title="respond to post" onClick={() => setMPost(tell)} />
                                 <p >{tell.sharers_count}</p>

                                 <strong className="font-lobster" title="tell on" onClick={() => setTPost(tell.tell_on_post)}>T</strong>
                                 <p>{tell.tell_on_post.tellers_count}</p>
                                 
                                 {owner && !tell.tell_on_post.savers.includes(owner.id) && <img src={save_icon} title="save tell" alt="" onClick={() => toggle(tell.tell_on_post.id, "save")}/>}
                                 {owner && tell.tell_on_post.savers.includes(owner.id) && <img src={saved_icon} title="save tell" alt="" onClick={() => toggle(tell.tell_on_post.id, "save")} />}
                                 <p>{tell.tell_on_post.savers.length}</p>
                              
                              </div> */}

                           </div>
                        </Link>
                     </div>
                  </div>

                  <div className="teller-container">
                     <div className="content-box">
                        <div className="content-2 no-borders">
                           <div className="content-layer-1">
                              <div className="cl-left flex">
                                 <div className="img-holder">
                                    <img src={host_url + tell.owner.profile.img} alt="profile" className="img-holder-image" />
                                 </div>
                                 <div className="content-owner">
                                    <Link to={`/users/profile/${tell.owner.id}`}>
                                       <h3 className="no-margin">{tell.owner.profile.username}
                                          {tell.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                                       </h3>
                                    </Link>
                                 </div>
                              </div>
                              {/* {% if request.user not in tell.likers.all %} */}
                              <div className="tcon" data-tid={tell.id}>
                                 
                                 {owner && !tell.liked && <img src={heart_black_icon} className="theartb" alt="like" onClick={() => toggle(tell.id, "like")} />}
                                 {owner && tell.liked && <img src={heart_red_icon} className="theartr" alt="dislike" onClick={() => toggle(tell.id, "like")} />}
                                 <small><strong className="lcount">{tell.likers.length}</strong></small>
                              </div>
                           </div>
                           <div className="content-layer-2 pad-top-5">
                              <p className="no-margin pre-wrap">{tell.body}</p>
                           </div>

                           {/* First Comment Section */}
                           {tell.comments.length > 0 && (
                           <div className="content-layer-3">
                              <p className="no-margin pad-top-5">
                                 <Link to={`/users/profile/${tell.comments[0].owner.id}`}>
                                    <strong>
                                       {getfirstComment(tell, "username")}{getfirstComment(tell, "verified") && <img src={verified_icon}className="width-12 verified-pos1" alt="verification" />}
                                    </strong>
                                 </Link> {getfirstComment(tell, "comment")}
                              </p>
                           </div>
                           )}
                           {/*  */}

                           {/* CommentCount and Date Section */}
                           <div className="content-layer-4-updated flex">
                              <Link to={`/tells/${tell.id}/comments`}>
                                 {tell.comments.length === 0 && <small className="grey no-margin pad-top-5 pad-bot-5">no comments</small>}

                                 {tell.comments.length === 1 && <small className="grey no-margin pad-top-5 pad-bot-5">there's no other comment</small>}

                                 {tell.comments.length > 1 && <small className="grey no-margin pad-top-5 pad-bot-5">see {tell.comments.length - 1} other comments</small>}
                              </Link>
                              <small className="grey no-margin">{tell.date}</small>
                           </div>
                           {/*  */}
                        </div>
                     </div>
                     <div className="content-layer-0">
                        <div className="cl1-left">
                           <img src={send_small_icon} alt="" title="respond to post" onClick={() => setMPost(tell)}/>
                           <p >{tell.sharers_count}</p>

                           
                           <strong className="font-lobster" title="tell on" onClick={() => setTPost(tell)}>T</strong>
                           <p>{tell.tellers_count}</p>


                           
                           {owner && !tell.savers.includes(owner.id) && <img src={save_icon} title="save tell" alt="" onClick={() => toggle(tell.id, "save")}/>}
                           {owner && tell.savers.includes(owner.id) && <img src={saved_icon} title="save tell" alt="" onClick={() => toggle(tell.id, "save")} />}
                           <p>{tell.savers.length}</p>
                        </div>
                        <div className="cl1-right">
                           <div className="see-threads-box none">
                              <Link to={"/tells/"+tell.id}>
                                 <p className="no-margin">see Threads</p>
                              </Link>
                           </div>
                           <img src={options_icon} alt="" onClick={e => showThreadLink(e)}/>
                        </div>
                     </div>
                  </div>
               </div>}

            </div>

         ))}

         {/* Tell on Tell */}
         {tPost && <TellOn tPost={tPost} setTPost={setTPost} type="tell" toggle={toggle} />}
         {/* Msg on Tell */}
         {mPost && <ShareOn mPost={mPost} setMPost={setMPost} type="tell" toggle={toggle} />}

      </section>
      
   );
}

export default TellsList;