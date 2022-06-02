// imports: main
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// imports: custom hooks
import useIcons from '../../customhooks/useIcons';
import useVariables from '../../customhooks/useVariables';
import useGetOwner from '../../customhooks/useGetOwner';
// imports: images

const TellsList = ({ tells }) => {
   const {owner} = useGetOwner();
   const {verified_icon, heart_black_icon, heart_red_icon, send_small_icon, save_icon, options_icon} = useIcons();
   const {host_url} = useVariables();


   const checkTellOwnerVerified = (tell) => {
      return tell.owner.profile.verified;
   }
   
   const checkLiked = (telldata) => {
      const telllikes = telldata.likers;
      if (telllikes.length === 0) {return false;}      
      return telllikes.includes(owner.id);
   }

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

   const getCommentsCount = (tell) => {
      // console.log(tell.comments.length)
      return tell.comments.length
   }

   
   console.log(tells)
   return (

      <section className="tellslist tell-wrapper">

         {tells.map(tell => (
            <div className="content-wrapper-comment width-p-20 pad-top-10 pad-bot-10" key={tell.id} >
               <div className="content-box">
                  <div className="content-2 no-borders">
                     <div className="content-layer-1">
                        <div className="cl-left flex">
                           <div className="img-holder">
                              <img src={host_url + tell.owner.profile.img} alt="profile" className="img-holder-image" />
                           </div>
                           <div className="content-owner">
                              <Link to={"#"}>
                                 <h3 className="no-margin">{tell.owner.profile.username}
                                    {checkTellOwnerVerified(tell) && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                                 </h3>
                              </Link>
                           </div>
                        </div>
                        {/* {% if request.user not in tell.likers.all %} */}
                        <div className="tcon" data-tid={tell.id}>
                           
                           {owner && !checkLiked(tell) && <img src={heart_black_icon} className="theartb" alt="like" />}
                           {owner && checkLiked(tell) && <img src={heart_red_icon} className="theartr" alt="dislike" />}
                           <small><strong className="lcount">{tell.likers.length}</strong></small>
                        </div>
                     </div>
                     <div className="content-layer-2 pad-top-5">
                        {/* <pre className="no-margin tellbody"><span>{tell.body}</span></pre> */}
                        <p className="no-margin pre-wrap">{tell.body}</p>
                     </div>

                     {/* First Comment Section */}
                     {getCommentsCount(tell) > 0 && (
                     <div className="content-layer-3">
                        <p className="no-margin pad-top-5"><Link to={"#"}><strong>{getfirstComment(tell, "username")}{getfirstComment(tell, "verified") && <img src={verified_icon}className="width-12 verified-pos1" alt="verification" />}
                              
                           </strong></Link> {getfirstComment(tell, "comment")}
                        </p>
                     </div>
                     )}
                     {/*  */}

                     {/* CommentCount and Date Section */}
                     <div className="content-layer-4-updated flex">
                           <Link to={"#"}>
                              {getCommentsCount(tell) === 0 && <small className="grey no-margin pad-top-5 pad-bot-5">no comments</small>}

                              {getCommentsCount(tell) === 1 && <small className="grey no-margin pad-top-5 pad-bot-5">there's no other comment</small>}

                              {getCommentsCount(tell) > 1 && <small className="grey no-margin pad-top-5 pad-bot-5">see {getCommentsCount(tell) - 1} other comments</small>}
                           </Link>
                           <small className="grey no-margin">{"may 4"}</small>
                     </div>
                     {/*  */}
                  </div>
               </div>
               <div className="content-layer-0">
                  <div className="cl1-left">
                     <Link to="#"><img src={send_small_icon} alt="" title="respond to post" /></Link>
                     <p >5</p>
                     <Link to="#"><strong className="font-lobster" title="">T</strong></Link>
                     <p>7</p>
                     <img src={save_icon} alt="" />
                     <p>6</p>
                  </div>
                  <div className="cl1-right">
                     <img src={options_icon} alt="" />
                  </div>
               </div>
            </div>
         ))}

      </section>
      
   );
}

export default TellsList;