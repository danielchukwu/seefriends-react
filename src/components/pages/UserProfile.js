// imports: main
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// imports: custom hooks
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
// imports: components
import Footer from "../headers_footers/Footer";
import HeaderPostFeed from "../headers_footers/HeaderPostFeed";
import PostList from "./PostList"
import TellsList from "./TellsList";



const UserProfile = () => {
   const {access_token, users_host_url, host_url} = useVariables()
   const {verified_icon, msg_icon} = useIcons()
   const navigate = useNavigate()

   const { id } = useParams()
   const owner = useGetOwner()
   const [user, setUser] = useState()
   const [posts, setPosts] = useState()
   const [tells, setTells] = useState()
   let [page, setPage] = useState(null)  // main-user, other-user
   let [pt, setPt] = useState("posts") // user content to fetch: posts or tells
   
   // SECTION 1: Grab User
   useEffect(() => {
      if (id){
         fetch(users_host_url+id+'/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`
         }
         })
         .then(res => {
            return res.json()
         })
         .then(data => {
            if(id == owner.id){setPage("main-user")}
            else {setPage("other-user")}
            
            setUser(data)
         })
         .catch(err => {
            console.log(err.message)
         })
      } else {
         setPage("main-user")
         setUser(owner)
      }
      
   }, [access_token, users_host_url, owner, id])


   // SECTION 2
   // Grab Post if pt === "posts"
   useEffect(() => {
      
      if (user){
         fetch(users_host_url + user.id + "/posts/", {
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
         })
         .then(res => res.json())
         .then(data => {
            setPosts(data)
         })
         .catch(err => {
            console.log('userprofile error: ', err.message)
         })
      }
      
   }, [access_token, users_host_url, page, user])

   // Grab Tell if pt === "tells"
   useEffect(() => {
      
      if (user){
         fetch(users_host_url + user.id + "/tells/", {
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
         })
         .then(res => {
            return res.json()
         })
         .then(data => {
            setTells(data)
         })
         .catch(err => {
            console.log('userprofile error: ', err.message)
         })
      }
      
   }, [access_token, users_host_url, page, user])

   // SECTION 3:
   // logic: switch pt
   const handleSwitchPt = (value) => {
      setPt(value);
   }


   
   // console.log('user', user)
   return (
      <div className="userprofile-react">
         <HeaderPostFeed />
         
         <main>
            
            {user && (
            <section className="profile-header">
               <div className="profile-layer-1">
                  <div className="profile-picture">
                     <img src={host_url+user.profile.img} alt="profile-picture" />
                  </div>
               </div>
               <div className="profile-layer-2">
                  <div className="username">
                     <h2>@{user.profile.username}
                        {user.profile.verified && <img src={verified_icon} className="width-13" alt="verification" />}
                     </h2>
                  </div>
                  <small>{user.profile.bio}</small>
               </div>
               <div className="user-fcontainer">

                  {page === "main-user" && (
                     <div className="user-box">
                        <Link to="{% url 'update-profile' %}">
                           <div className="edit-profile-btn">
                              <p className="no-margin">Edit Profile</p>
                           </div>
                        </Link>
                     </div>
                  )}

                  {page === "other-user" && !user.profile.followers.includes(owner.id) && (
                     <div className="follow-box">
                        <Link to="{% url 'follow' user.id %}">
                           <div className="follow-btn">
                              <p className="no-margin">follow</p>
                           </div>
                        </Link>
                     </div>
                  )}

                  {page === "other-user" && user.profile.followers.includes(owner.id) && (
                     <div className="following-box">
                        <Link to="{% url 'unfollow' user.id %}">
                           <div className="following-btn">
                              <p className="no-margin">following</p>
                           </div>
                        </Link>
                        <Link to="{% url 'message' user.id %}">
                           <img src={msg_icon} className="small-img" alt="" />
                        </Link>
                     </div>
                  )}

               </div>

               {/* followers, following, friends */}
               <div className="profile-layer-3">
                  <div className="followers-count">
                     <Link to="">
                        <p>{user.profile.followers.length}</p>
                        <small>followers</small>
                     </Link>
                  </div>
                  <div className="following-count">
                     <Link to="">
                        <p>{user.profile.following.length}</p>
                        <small>following</small>
                     </Link>
                  </div>
                  <div className="following-count">
                     <Link to="">
                        <p>{user.profile.friends.length}</p>
                        <small>friends</small>
                     </Link>
                  </div>
               </div>
               {/*  */}

               <div className="filter-options width-p-20">
                  {/* {% if page == 'user-post' %} */}

                     <div className="profile-posts" onClick={() => handleSwitchPt('posts')}>
                        {pt === "posts" && <h4>Posts</h4>}
                        {pt !== "posts" && <h4 className="grey-dark">Posts</h4>}
                     </div>
                     <div className="tell" onClick={() => handleSwitchPt('tells')}>
                        {pt === "tells" && <h4>Tells</h4>}
                        {pt !== "tells" && <h4 className="grey-dark">Tells</h4>}
                     </div>
                     
                     
                     { page === "main-user"  && (
                        <div className="profile-all">
                           <Link to={"/users/profile/saved"}>
                              <h4 className="grey-dark">Saved</h4>
                           </Link>
                        </div>
                     )}
               </div>

               <div>
                  { pt === "posts" && posts && <PostList posts={posts} />}
                  { pt === "tells" && tells && <TellsList tells={tells} />}

               </div>
               
            </section>
            )}
            
         </main>

         <Footer />
      </div>
   );
}

export default UserProfile;