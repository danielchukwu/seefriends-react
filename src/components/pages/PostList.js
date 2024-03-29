// import: main
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import: custom hooks
import useVariables from '../../customhooks/useVariables'
import useIcons from '../../customhooks/useIcons'
import useGetOwner from '../../customhooks/useGetOwner'
import TellOn from '../pop_ups/TellOn'
import ShareOn from '../pop_ups/ShareOn';





const PostList = ({ posts, dispatchPost}) => {
   const {owner} = useGetOwner();
   const {access_token, posts_url, messages_url} = useVariables();
   const {verified_icon, send_small_icon, save_icon, saved_icon, options_icon, heart_white_icon32, heart_red_icon32, heart_red_icon256: big_heart} = useIcons();

   // logic: The post to be told on: tpost -> tellPost
   const [tPost, setTPost] = useState();
   // logic: The post to be told on: tpost -> tellPost
   const [mPost, setMPost] = useState();


   // logic: Post Events: Like, save, tell-on, msg
   const toggle = (id, toggleType, body, shareList) => {
      switch (toggleType){
         case "like":
            dispatchPost({type: "like-post", payload:{id: id, posts: posts, owner: owner, posts_url: posts_url, access_token: access_token}});
            break;
         case "save":
            dispatchPost({type: "save-post", payload:{id: id, posts: posts, owner: owner, posts_url: posts_url, access_token: access_token}});
            break;
         case "tell-on-post":
            // console.log("tell-on-post")
            dispatchPost({type: "tell-on-post", payload:{id: id, posts: posts, owner: owner, posts_url: posts_url, access_token: access_token, body: body}});
            break;
         case "share-post":
            // console.log("share post now.........")
            dispatchPost({type: "share-post", payload:{id: id, posts: posts, owner: owner, posts_url: messages_url, access_token: access_token, body: body, shareList: shareList}});
            break;
         default:
            // console.log("You didn't pass in => the type of toggle you want (e.g like, save, tell, msg)")
            break;
      }
   }

   // logic: first comment
   const getFirstCommentInfo = (post, which) => {
      const comment = post.comments[0]
      if (comment && which === 'username') {
         return comment.owner.profile.username
      } else if (comment && which === 'comment') {
         return comment.comment
      } else {
         return null
      }
   }

   // Doubleclick Liking
   const double_click_Like = (post, e) => {
      let big_heart = e.target.parentNode.childNodes[0];
      big_heart.classList = big_heart.classList.length > 1 ? "big-heart" : "big-heart none"
      setTimeout(() => {
         big_heart.classList = "big-heart none"
      }, 500)

      if (!post.liked){
         toggle(post.id, "like");
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
      // console.log(seeThreads.classList)
   }

   // console.log(posts)
   return ( 
      <div>
         {posts.map((post) => (
            
            <section className="postlist background-white mobile-page-center border-rad-20" key={post.id}>

            <div className="content-wrapper">
               <div className="content-box"  data-pid={posts.id}>
   
                  <div className="content-layer-1 fc-top">
                     <div className="cl-left flex">
                        <Link to={`/users/profile/${post.owner.id}`}>
                           <div className="img-holder">
                              <img src={post.owner.profile.img} alt="" className="img-holder-image" />
                           </div>
                        </Link>
                        <div className="content-owner">
                           <Link to={`/users/profile/${post.owner.id}`}><h3>{post.owner.username}
                           {post.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos3" alt="verification" />}
                           </h3></Link>
                        </div>
                     </div>
                     <div className="cl-right">
                        <div className="see-threads-box none">
                           <Link to={"/posts/"+post.id}>
                              <p className="no-margin">see Threads</p>
                           </Link>
                        </div>
                        <img src={options_icon} alt="" className="pointer" onClick={e => showThreadLink(e)}/>
                     </div>
                  </div>
   
                  <div className="content-1">
                     <div className="big-heart-parent" onDoubleClick={(e) => double_click_Like(post, e)}>
                        <img src={big_heart} alt="" className="big-heart none" />
                        <img src={post.img} alt="post" className="post-img" />
                     </div>
   
                     {/* {% if request.user not in content.post.likers.all %} */}
                     <div className="heart-p position-rel">
                        {owner && !post.liked && <img src={heart_white_icon32} alt="" className="heartw" onClick={() => toggle(post.id, "like")} />}
                        {owner && post.liked && <img src={heart_red_icon32} alt="" className="heartr" onClick={() => toggle(post.id, "like")} /> }
                     </div>
                     {/* {% endif %} */}
   
                  </div>
   
                  <div className="content-2-updated">
                     <div className="content-layer-0 pad-top-5">
                        <div className="cl1-left">
                           
                           {/* Msg */}
                           <img src={send_small_icon} className="pointer" alt="" title="respond to post" onClick={() => setMPost(post)}/>
                           <p >{post.sharers_count}</p>
   
                           {/* Tell on */}
                           <strong className="font-lobster pointer" title="tell on" onClick={() => setTPost(post)}>T</strong>
                           <p>{post.tellers_count}</p>
                           
                           {/* Saved  */}
                           {owner && !post.savers.includes(owner.id) && <img src={save_icon} className="pointer" title="save post" alt="" onClick={() => toggle(post.id, "save")} />}
                           
                           {owner && post.savers.includes(owner.id) && <img src={saved_icon} className="pointer" title="save post" alt="" onClick={() => toggle(post.id, "save")} />}
                           <p>{post.savers.length}</p>

                        </div>
                        <div className="cl1-right pl-new">
                           <strong className="like_count" id="">{post.likers.length}</strong>
                        </div>
                     </div>
   
                     <div className="content-layer-2">
                        <p className="no-margin pre-wrap"><strong><Link to={`/users/profile/${post.owner.id}`}>{post.owner.profile.username} </Link></strong>{post.body}</p>
                     </div>
   
                     {/* {% for comment in content.post.commentonpost_set.all|slice:1 %} */}
                     {post.commenters.length > 0 && (
                        <div className="content-layer-3">
                           <p className="no-margin pad-top-5">
                              <Link to={`/users/profile/${post.comments[0].owner.id}`}>
                                 <strong>
                                    { getFirstCommentInfo(post, 'username') }<img src={verified_icon} className="width-12 verified-pos1" alt="verification" />
                                 </strong>
                              </Link>
                              { getFirstCommentInfo(post, 'comment') }
                           </p>
                        </div>
                     ) }
                     {/* {% endfor %} */}
   
                     <div className="cl-4 flex pad-bot-20">
                        <Link to={`/posts/${post.id}/comments`}>
                           {post.comments.length === 0 && <small className="grey no-margin pad-top-5 pad-bot-5">no comments</small>}
   
                           {post.comments.length === 1 && <small className="grey no-margin pad-top-5 pad-bot-5">there's no other comment</small>}
   
                           {post.comments.length > 1 && <small className="grey no-margin pad-top-5 pad-bot-5">see {post.comments.length - 1} other comments</small>}
                        </Link>
                        <small className="grey">{post.date}</small>
                     </div>
                     
                  </div>
               </div>
            </div>

            </section>
         ))}

         {/* Tell On - Floater */}
         {tPost && <TellOn tPost={tPost} setTPost={setTPost} type={"post"} toggle={toggle} />}
         {/* Share - Floater */}
         {mPost && <ShareOn mPost={mPost} setMPost={setMPost} type={"post"} toggle={toggle} />}

      </div>
   );
   
}

export default PostList;