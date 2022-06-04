import { Link } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const CommentsList = ({post, setPost, type, owner}) => {
   const {verified_icon, heart_black_icon, heart_red_icon, send_small_icon, save_icon, options_icon} = useIcons();
   const {host_url, tells_url, posts_url, access_token} = useVariables();


   // logic: Like Post
   const toggleLike = (id) => {
      if (type === "posts"){
         let newPost = post;
   
         newPost.liked = !newPost.liked;   // sets liked: to true or false. it's where the magic happens
         if (newPost.liked){
            newPost.likers.push(owner.id);
         } else {
            newPost.likers.pop();
         }
         setPost({...newPost}) 
   
         // Send Like to Backend
         fetch(posts_url+id+'/like/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`
         }
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data)
            })
            .catch(err => {
               console.log(err.message);
            })
      }

   }

   return (
      <div className="">
         <div className="comment-header-container">
               
            <div className="content-2 no-borders width-p-10">
               <div className="content-layer-1">
                  <div className="cl-left flex">
                     <div className="img-holder">
                        <img src={ host_url + post.owner.profile.img} alt="profile-picture" className="img-holder-image" />
                     </div>
                     <div className="content-owner">
                        <Link to={`/users/profile/${post.owner.id}`}><h3>{post.owner.profile.username}
                        {post.owner.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}
                        </h3></Link>
                     </div>
                  </div>
                  <div className="tcon">
                     {owner && !post.liked && <img src={heart_black_icon} className="theartb" alt="like" onClick={() => toggleLike(post.id)} />}
                     {owner && post.liked && <img src={heart_red_icon} className="theartr" alt="dislike" onClick={() => toggleLike(post.id)} />}
                     <small><strong className="lcount">{post.likers.length}</strong></small>
                  </div>
               </div>
               <div className="content-layer-2">
                  <p className="no-margin pad-top-10 pre-wrap">{post.body}</p>
               </div>
            </div>

         </div>

         <div className="seperator"></div>

         {post.comments.length > 0 && <div className="comments-list-container">
            <div className="comment-wrapper">
               {/* {% for comment in post.commentonpost_set.all %} */}
               {post.comments.map((commenter) => (
                  <div className="a_comment" key={commenter.id}>
                     <div className="img-holder">
                        <img src={host_url+commenter.owner.profile.img} alt="profile-picture" className="img-holder-image" />
                     </div>
                     <p><Link to={`/users/profile/${commenter.owner.id}`}><strong>{commenter.owner.profile.username}
                        {commenter.owner.profile.verified && <img src={verified_icon}className="width-12 verified-pos1" alt="verification"/>}
                     </strong> </Link>{commenter.comment}</p>
                  </div>
               ))}
               {/* {% endfor %} */}
            </div>
         </div>}

      </div>
   
   );
}
export default CommentsList;