// import: main
import { Link } from 'react-router-dom'

// import: images
import drake from '../../images/dr-1.jpg'

// import: custom hooks
import useVariables from '../../customhooks/useVariables'
import useIcons from '../../customhooks/useIcons'
import useGetOwner from '../../customhooks/useGetOwner'





const PostList = ({ posts }) => {
   const owner = useGetOwner();
   const {host_url} = useVariables()
   const {verified_icon, send_small_icon, save_icon, options_icon, heart_white_icon32, heart_red_icon32} = useIcons();
   
   const checkPostOwnerVerified = (post) => {
      return post.owner.profile.verified;
   }

   const checkLiked = (postdata) => {
      const telllikes = postdata.likers;
      if (telllikes.length === 0) {return false;}      
      return telllikes.includes(owner.id);
   }

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
   const getCommentsCount = (post) => {
      return post.commenters.length
   }
   
   // console.log(posts)
   return ( 

      posts.map((post) => (
         <section className="postlist background-white mobile-page-center border-rad-20" key={post.id}>
         
         <div className="content-wrapper">
            <div className="content-box"  data-pid={posts.id}>

               <div className="content-layer-1 fc-top">
                  <div className="cl-left flex">
                     <div className="img-holder">
                        <img src={host_url+post.owner.profile.img} alt="" className="img-holder-image" />
                     </div>
                     <div className="content-owner">
                        <Link to="#"><h3>{post.owner.username}
                        {checkPostOwnerVerified(post) && <img src={verified_icon} className="small-img-feed" alt="verification" />}
                        </h3></Link>
                     </div>
                  </div>
                  <div className="cl-right">
                     <Link to="{% url 'other-profile' content.post.owner.id %}"><img src={options_icon} alt="" /></Link>
                  </div>
               </div>

               <div className="content-1">
                  <div className="big-heart-parent">
                     <img src={drake} alt="" className="big-heart none" />
                     <img src={host_url+post.img} alt="post" className="post-img" />
                  </div>

                  {/* {% if request.user not in content.post.likers.all %} */}
                  <div className="heart-p position-rel">
                     {owner && !checkLiked(post) && <img src={heart_white_icon32} alt="" className="heartw" data-pid={post.id} />}
                     {owner && checkLiked(post) && <img src={heart_red_icon32} alt="" className="heartr" data-pid={post.id} />}
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
                        
                        <img src={save_icon} title="save post" alt="" />
                        <p>6</p>
                     </div>
                     <div className="cl1-right pl-new">
                        <strong className="like_count" id="">{post.likers.length}</strong>
                     </div>
                  </div>

                  <div className="content-layer-2">
                     <p className="no-margin pre-wrap"><strong><Link to="{% url 'other-profile' content.post.owner.id %}">{post.owner.profile.username} </Link></strong>{post.body}</p>
                  </div>

                  {/* {% for comment in content.post.commentonpost_set.all|slice:1 %} */}
                  {getCommentsCount(post) > 0 && (
                     <div className="content-layer-3">
                        <p className="no-margin pad-top-5">
                           <Link to="{% url 'other-profile' comment.owner.id %}">
                              <strong>
                                 { getFirstCommentInfo(post, 'username') } <img src={verified_icon} className="width-10" alt="verification" />
                              </strong>
                           </Link>
                           { getFirstCommentInfo(post, 'comment') }
                        </p>
                     </div>
                  ) }
                  {/* {% endfor %} */}

                  <div className="cl-4 flex pad-bot-20">
                     <Link to="{% url 'post-comments-page' content.post.id %}">
                        {getCommentsCount(post) === 0 && <small className="grey no-margin pad-top-5 pad-bot-5">no comments</small>}

                        {getCommentsCount(post) === 1 && <small className="grey no-margin pad-top-5 pad-bot-5">there's no other comment</small>}

                        {getCommentsCount(post) > 1 && <small className="grey no-margin pad-top-5 pad-bot-5">see {getCommentsCount(post) - 1} other comments</small>}
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