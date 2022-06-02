// imports: main
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// imports: custom hooks
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
// import Follow from "../../customfunctions/Follow";
// imports: components
import Footer from "../headers_footers/Footer";
import HeaderPostFeed from "../headers_footers/HeaderPostFeed";
import PostList from "./PostList";
import TellsList from "./TellsList";



const UserProfile = () => {
   const {access_token, users_host_url, host_url} = useVariables()
   const {verified_icon, msg_icon} = useIcons()
   // const navigate = useNavigate()
   
   const { id } = useParams()
   const {owner, setOwner} = useGetOwner()
   const [user, setUser] = useState()
   const [posts, setPosts] = useState()
   const [tells, setTells] = useState()
   let [page, setPage] = useState("main-user")  // main-user, other-user
   let [pt, setPt] = useState("posts")   // user content to fetch: posts or tells

   // fff: count holders
   const [followerCount, setFollowerCount] = useState(); // follower count
   const [friendsCount, setFriendsCount] = useState();   // friends countfriends incrementation when we follow user faster
   
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
            return res.json();
         })
         .then(data => {
            if(id == owner.id){setPage("main-user")}
            else {setPage("other-user")}
            setUser(data);
            
            // logic: when owner loads up lets do some page and fff count holder logics
         })
         .catch(err => {
            console.log(err.message);
         })
      } else {
         setPage("main-user")
         setUser(owner)
      }
      
   }, [access_token, users_host_url, owner, id])

   // set user-profile type: is it main-user profile or other-user profile
   useEffect(() => {
      if (owner && user){
         // logic: set page logic
         if (id){
            if(id == owner.id) setPage("main-user");
            else setPage("other-user");
         }
   
         // logic: set followers and friends count in state and setIsFollowingYou if user is following you
         setFollowerCount(user.profile.followers.length);
         setFriendsCount(user.profile.friends.length);
      }
   }, [owner, user])


   // SECTION 2: Posts & Tells
   // 1. fetch user posts (if pt === "posts")
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

   // 2. fetch user tells (if pt === "tells")
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


   // SECTION 3: Switch User Profile Content -> post or tells
   const handleSwitchPt = (value) => {
      setPt(value);
   }


   // SCTION 4:
   // toggleFollow
   const toggleFollow = (id) => {
      const newUser = user;
      const newOwner = owner;

      if (owner.profile.following.includes(id)){
         // unfollow
         newOwner.profile.following = newOwner.profile.following.filter(eachid => eachid !== id);
         setOwner(newOwner);
         setFollowerCount(followerCount-1);
         if (user.profile.following.includes(owner.id)) setFriendsCount(friendsCount-1)
         
         fetch(users_host_url+id+'/unfollow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
                  })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data);
            })
            
      } else {
         // follow
         newOwner.profile.following.push(id);
         setOwner(newOwner)
         setFollowerCount(followerCount+1)
         if (user.profile.following.includes(owner.id)) setFriendsCount(friendsCount+1)
         
         fetch(users_host_url+id+'/follow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`}
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data);
            })

      }
      // console.log("user:", user)
   }



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
                        {user.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                     </h2>
                  </div>
                  <small>{user.profile.bio}</small>
               </div>
               <div className="user-fcontainer">

                  {page === "main-user" && (
                     <div className="user-box">
                        <Link to={""}>
                           <div className="edit-profile-btn">
                              <p className="no-margin">Edit Profile</p>
                           </div>
                        </Link>
                     </div>
                  )}

                  {/* {page === "other-user" && isFollowing( */}
                  {(page === "other-user" && !owner.profile.following.includes(user.id)) && (
                     <div className="follow-box">
                        <div className="follow-btn" onClick={() => toggleFollow(user.id)}>
                           <p className="no-margin">follow</p>
                        </div>
                     </div>
                  )}

                  {(page === "other-user" && owner.profile.following.includes(user.id)) && (
                     <div className="following-box">
                        <div className="following-btn" onClick={() => toggleFollow(user.id)}>
                           <p className="no-margin">following</p>
                        </div>
                        <Link to="{% url 'message' user.id %}">
                           <img src={msg_icon} className="small-img margin-l-10" alt="" />
                        </Link>
                     </div>
                  )}

               </div>

               {/* followers, following, friends */}
               <div className="profile-layer-3">
                  <div className="followers-count">
                     <Link to={`/users/profile/${user.id}/fff/Followers`}>
                        {followerCount && <p>{followerCount}</p>}
                        <small>followers</small>
                     </Link>
                  </div>
                  <div className="following-count">
                     <Link to={`/users/profile/${user.id}/fff/Following`}>
                        {followerCount && friendsCount && <p>{user.profile.following.length}</p>}
                        <small>following</small>
                     </Link>
                  </div>
                  <div className="following-count">
                     <Link to={`/users/profile/${user.id}/fff/Friends`}>
                        {friendsCount && <p>{friendsCount}</p>}
                        <small>friends</small>
                     </Link>
                  </div>
               </div>
               {/*  */}

               <div className="filter-options width-p-20">
                  
                  <div className="options-wrapper">

                     <div className="profile-posts pointer" onClick={() => handleSwitchPt('posts')}>
                        {pt === "posts" && <h4>Posts</h4>}
                        {pt !== "posts" && <h4 className="grey-dark">Posts</h4>}
                     </div>
                     <div className="tell pointer" onClick={() => handleSwitchPt('tells')}>
                        {pt === "tells" && <h4>Tells</h4>}
                        {pt !== "tells" && <h4 className="grey-dark">Tells</h4>}
                     </div>
                     
                     
                     { page === "main-user"  && (
                        <div className="profile-all pointer">
                           <Link to={"/users/profile/saved"}>
                              <h4 className="grey-dark">Saved</h4>
                           </Link>
                        </div>
                     )}

                  </div>

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