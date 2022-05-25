import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";
import HeaderPostFeed from "../headers_footers/HeaderPostFeed";

const UserProfile = () => {
   const { id } = useParams()
   const owner = useGetOwner()
   const [user, setUser] = useState()
   const {access_token, users_host_url, host_url} = useVariables()
   let [page, setPage] = useState("main-user")  // main-user, other-user
   
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
            setPage("other-user")
            setUser(data)
         })
      } else {
         console.log("OWNER THEN!")
         setUser(owner)
         setPage("main-user")
      }
      
   }, [access_token, users_host_url, owner])
   
   console.log(user)
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
                     <h2>@{"user.profile.username"}
                        {/* <img src="{% static 'images/icons/verified/verified-blue2.png' %}" className="small-img" alt="verification"> */}
                     </h2>
                  </div>
                  {/* {% if user.profile.bio %} */}
                  <small>{"user.profile.bio"}</small>
                  {/* {% endif %} */}
               </div>
               <div className="user-fcontainer">

                  {/* {% if request.user == user %} */}
                  <div className="user-box">
                     <Link to="{% url 'update-profile' %}">
                        <div className="edit-profile-btn">
                           <p className="no-margin">Edit Profile</p>
                        </div>
                     </Link>
                  </div>
                  {/* {% elif request.user not in user.profile.followers.all %} */}
                  <div className="follow-box">
                     <Link to="{% url 'follow' user.id %}">
                        <div className="follow-btn">
                           <p className="no-margin">follow</p>
                        </div>
                     </Link>
                  </div>
                  {/* {% elif request.user in user.profile.followers.all %} */}
                  <div className="following-box">
                     <Link to="{% url 'unfollow' user.id %}">
                        <div className="following-btn">
                           <p className="no-margin">following</p>
                        </div>
                     </Link>
                     <Link to="{% url 'message' user.id %}"><img src="{% static 'images/icons/user-icons/send.png' %}" className="small-img" alt="" /></Link>
                  </div>
                  {/* {% endif %} */}


               </div>

               {/* followers, following, friends */}
               <div className="profile-layer-3">
                  <div className="followers-count">
                     <Link to="">
                        <p>{"user.profile.get_total_followers"}</p>
                        <small>followers</small>
                     </Link>
                  </div>
                  <div className="following-count">
                     <Link to="">
                        <p>{"user.profile.get_total_following"}</p>
                        <small>following</small>
                     </Link>
                  </div>
                  <div className="following-count">
                     <Link to="">
                        <p>{"user.profile.get_total_friends"}</p>
                        <small>friends</small>
                     </Link>
                  </div>
               </div>
               {/*  */}

               <div className="filter-options width-p-20">
                  {/* {% if page == 'user-post' %} */}

                     <div className="profile-posts">
                        <Link to="{% url 'other-profile' user.id %}">
                           <h4>Posts</h4>
                        </Link>
                     </div>
                     <div className="tell">
                        <Link to="{% url 'other-profile-tells' user.id %}">
                           <h4 className="grey-dark">Tells</h4>
                        </Link>
                     </div>
                     
                     {/* {% if user == request.user %} */}
                     <div className="profile-all">
                        <Link to="{% url 'saved-post-page' %}">
                           <h4 className="grey-dark">Saved</h4>
                        </Link>
                     </div>
                     {/* {% endif %} */}
                  
                  {/* {% else %} */}
                  
                     <div className="profile-posts">
                        <Link to="{% url 'other-profile' user.id %}">
                           <h4 className="grey-dark">Posts</h4>
                        </Link>
                     </div>
                     <div className="tell">
                        <Link to="{% url 'other-profile-tells' user.id %}">
                           <h4>Tells</h4>
                        </Link>
                     </div>
                     
                     {/* {% if user == request.user %} */}
                     <div className="profile-all">
                        <Link to="{% url 'saved-post-page' %}">
                           <h4 className="grey-dark">Saved</h4>
                        </Link>
                     </div>
                     {/* {% endif %} */}

                  {/* {% endif %} */}
               </div>
            </section>
            )}
            
         </main>

         <Footer />
      </div>
   );
}

export default UserProfile;