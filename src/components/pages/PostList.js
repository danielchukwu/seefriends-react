// import: main
import { Link, useNavigate } from 'react-router-dom'

// import: custom hooks
import useVariables from '../../customhooks/useVariables'
import useIcons from '../../customhooks/useIcons'
import useGetOwner from '../../customhooks/useGetOwner'





const PostList = ({ posts, setPosts, dispatchPost}) => {
   const {owner} = useGetOwner();
   const {host_url, access_token, posts_url} = useVariables()
   const {verified_icon, send_small_icon, save_icon, saved_icon, options_icon, heart_white_icon32, heart_red_icon32, heart_red_icon256: big_heart} = useIcons();

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

   // logic: Like Post
   const toggleLike = (id) => {
      dispatchPost({type: "like-post", payload:{id: id, posts: posts, owner: owner, posts_url: posts_url, access_token: access_token}})
   }

   // Doubleclick Liking
   const double_click_Like = (post, e) => {
      let big_heart = e.target.parentNode.childNodes[0];
      big_heart.classList = big_heart.classList.length > 1 ? "big-heart" : "big-heart none"
      setTimeout(() => {
         big_heart.classList = "big-heart none"
      }, 500)

      if (!post.liked){
         toggleLike(post.id);
      }
   }
   
   console.log(posts)
   return ( 
      
      posts.map((post) => (
         
         <section className="postlist background-white mobile-page-center border-rad-20" key={post.id}>
         
         <div className="content-wrapper">
            <div className="content-box"  data-pid={posts.id}>

               <div className="content-layer-1 fc-top">
                  <div className="cl-left flex">
                     <Link to={`/users/profile/${post.owner.id}`}>
                        <div className="img-holder">
                           <img src={host_url+post.owner.profile.img} alt="" className="img-holder-image" />
                        </div>
                     </Link>
                     <div className="content-owner">
                        <Link to={`/users/profile/${post.owner.id}`}><h3>{post.owner.username}
                        {post.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos3" alt="verification" />}
                        </h3></Link>
                     </div>
                  </div>
                  <div className="cl-right">
                     <Link to="{% url 'other-profile' content.post.owner.id %}"><img src={options_icon} alt="" /></Link>
                  </div>
               </div>

               <div className="content-1">
                  <div className="big-heart-parent" onDoubleClick={(e) => double_click_Like(post, e)}>
                     <img src={big_heart} alt="" className="big-heart none" />
                     <img src={post.img} alt="post" className="post-img" />
                  </div>

                  {/* {% if request.user not in content.post.likers.all %} */}
                  <div className="heart-p position-rel">
                     {owner && !post.liked && <img src={heart_white_icon32} alt="" className="heartw" onClick={() => toggleLike(post.id)} />}
                     {owner && post.liked && <img src={heart_red_icon32} alt="" className="heartr" onClick={() => toggleLike(post.id)} /> }
                  </div>
                  {/* {% endif %} */}

               </div>

               <div className="content-2-updated">
                  <div className="content-layer-0 pad-top-5">
                     <div className="cl1-left">
                        <Link to="#"><img src={send_small_icon} alt="" title="respond to post" /></Link>
                        <p >5</p>
                        <Link to="#"><strong className="font-lobster" title="tell on">T</strong></Link>
                        <p>7</p>
                        
                        {owner && !post.savers.includes(owner.id) && <img src={save_icon} title="save post" alt="" />}
                        {owner && post.savers.includes(owner.id) && <img src={saved_icon} title="save post" alt="" />}
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
      ))
   );
   
}

export default PostList;