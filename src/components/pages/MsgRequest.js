import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const MsgRequest = () => {
   // This Page is the request chat version not the list as that is handled by Message.js and MessageList.js
   const navigate = useNavigate();
   const {go_back_icon, verified_icon} = useIcons();
   const {access_token, messages_url, users_host_url, requests_url} = useVariables();
   const {owner, setOwner} = useGetOwner();
   const [otherUser, setOtherUser] = useState();

   const { id } = useParams();
   
   const [chats, setChats] = useState();
   // const [seen, setSeen] = useState(false); // use: this will work with our websocket to update the users seen status
   // const messageEndRef = useRef()

   // logic: Fetch the other user and texts from user
   useEffect(() => {

      // Fetch: otherUser
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
               setOtherUser(data);
               // console.log(data)
               // logic: when owner loads up lets do some page and fff count holder logics
            })
            .catch(err => {
               console.log(err.message);
            })
      }
      
      // Fetch: messages
      fetch(messages_url + id + "/", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
         }
      })
         .then(res => res.json())
         .then(data => {
            if (data.detail){
               throw Error("unknown user")
            }
            setChats(data);
            // scrollToBottom();
            // console.log(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })

   }, [messages_url, access_token, id, navigate, users_host_url])


   const toggleFollow = (id) => {
      // const newUser = otherUser;
      const newOwner = owner;
      // console.log(newOwner)

      if (owner.profile.following.includes(id)){
         // unfollow
         newOwner.profile.following = newOwner.profile.following.filter(eachid => eachid !== id);
         setOwner({...newOwner});
         
         fetch(users_host_url+id+'/unfollow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`}
                  })
            .then(res => {
               return res.json();
            })
            .then(data => {
               // console.log(data);
            })
            
      } else {
         // follow
         newOwner.profile.following.push(id);
         setOwner({...newOwner});
         
         fetch(users_host_url+id+'/follow/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`}
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               // console.log(data);
            })

      }
      // console.log("user:", user)
   }

   // scroll to bottom logic
   const scrollToBottom = () => {
      // messageEndRef.current?.scrollIntoView({behavior: "smooth"})
      window.scrollTo(0, document.body.clientHeight);

   }
   useEffect(() => {
      scrollToBottom();
   }, [chats])

   
   const otherBoxStyles =(index) => {
      // Left-hand side
      if (index === 0) return "user-msg-first" //
      if (chats[index-1].owner === owner.id){
         return "user-msg-first";
      } else {
         return "user-msg-notfirst";
      }
   }
   

   // logic: Accept or Reject request handler
   const handleRequest = (type) => {
      if (type === "accept"){

         // Fetch: requests
         fetch(requests_url + id + "/accept/", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${access_token}`
            }
         })
         .then(res => res.json())
         .then(data => {
            if (data.detail){
               throw Error("unknown user")
            }
            // console.log(data);
            navigate('/messages')
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
      } 
      else if (type === "reject"){

         // Fetch: requests
         fetch(requests_url + id + "/reject/", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${access_token}`
            }
         })
         .then(res => res.json())
         .then(data => {
            if (data.detail){
               throw Error("unknown user")
            }
            // console.log(data);
            navigate('/messages')
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
         }
      
      }

   // logic: show new month and day of chat
   const showMonthandDay = (index) => {
      // const months = {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"}
      if (index === 0){
         return "welcome"
      }
      // Last Text
      let last_date = new Date(chats[index-1].created);
      last_date = last_date.toDateString().split(" ");
      let last_year = last_date[3];
      let last_month = last_date[1];
      let last_day = last_date[2];
      // Current Text
      let date = new Date(chats[index].created);
      date = date.toDateString().split(" ")
      let year = date[3];
      let month = date[1];
      let day = date[2];

      // console.log(date)
      if (last_year === year && last_month === month && last_day !== day){
         return `${month} ${day}`
      } else return false
   }


   return (
      <div className="message-request-react">

         <div className="header-react-msg">
         <header className="mobile-page-750">
            <div className="message-header">
               <div className="message-left">
                  <div className="back" onClick={() => navigate(-1)}>
                     <img src={go_back_icon} alt="back-btn" />
                  </div>
                  {otherUser && <div className="activity-2">
                     <Link to={`/users/profile/${otherUser.id}`}>
                        <div className="img-holder-m">
                           <img src={otherUser.profile.img} alt="profile-dp" className="img-holder-image-m" />
                        </div>
                     
                     </Link>

                     <Link to={`/users/profile/${otherUser.id}`}>
                        <div>
                        
                           <h2 className="no-margin width-p-10 position-rel msg-name"><strong>{otherUser.profile.username}</strong>
                              {otherUser.profile.verified && <img src={verified_icon} className="width-15 verified-pos1" alt="verification" />}
                           </h2>
                           {/* <p className="no-margin width-p-10 last_seen">{otherUser.profile.last_seen}</p> */}
                        </div>
                     </Link>
                  </div>}
               </div>
            </div>
         </header>
         </div>

         { otherUser && owner &&
         <main className="msgreq-chat-container">
            <section className="profile-header request-profile">
               <div className="profile-layer-1">
                  <div className="profile-picture">
                     <img src={otherUser.profile.img} alt="profile-dp" />
                  </div>
               </div>
               <div className="profile-layer-2">
                  <div className="username">
                     <h2>@{otherUser.profile.username}
                        {otherUser.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />}
                     </h2>
                  </div>
                  <small>{otherUser.profile.bio}</small>
               </div>

               <div className="user-fcontainer">

                  {/* {page === "other-user" && isFollowing( */}
                  {!owner.profile.following.includes(otherUser.id) && (
                     <div className="follow-box">
                        <div className="follow-btn pointer" onClick={() => toggleFollow(otherUser.id)}>
                           <p className="no-margin">follow</p>
                        </div>
                     </div>
                  )}

                  {owner.profile.following.includes(otherUser.id) && (
                     <div className="following-box">
                        <div className="following-btn pointer" onClick={() => toggleFollow(otherUser.id)}>
                           <p className="no-margin">following</p>
                        </div>
                        {/* <Link to={`/messages/${owner.id}/${otherUser.id}`}>
                           <img src={msg_icon} className="small-img margin-l-10" alt="" />
                        </Link> */}
                     </div>
                  )}

               </div>
               
            </section>
            

            { chats && chats.map((chat, index) => (
               <div key={chat.id}>

                  {/* Show Month and Day */}
                  {showMonthandDay(index) && 
                  <div className="timestamp-holder">
                     <span className="timestamp">
                        <small>{showMonthandDay(index)}</small>
                     </span>
                  </div>}

                  <div className="msg-block" onLoadStart={scrollToBottom()}>
                     { chat.type === "post" && 
                        <div className="shared-post-container">
                           <Link to={"/posts/"+chat.msg_on_post.id}>
                              <img src={chat.msg_on_post.img} alt="msg" className="shared-img"/>
                           </Link>
                        </div>
                     }

                     {chat.type === "tell" && 
                     <Link to={"/tells/" + chat.msg_on_tell.id}>
                        <div className="shared-tell-container">
                           <div className="shared-header">
                              <div className="username-verified flex">
                                 <h4 className="no-margin">{chat.msg_on_tell.owner.profile.username}</h4>
                                 {/* {chat.msg_on_tell.owner.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />} */}
                              </div>
                              <strong className="font-lobster">T</strong>
                           </div>
                           <p className="no-margin">{chat.msg_on_tell.body}</p>
                        </div>
                     </Link>
                     }

                     {chat.owner !== owner.id && 
                     <div className="msg-block">
                        <div className={`msg-box ` + otherBoxStyles(index)}>
                           <p className="no-margin">
                              <span>{chat.body}</span>
                              <small className="msg-time grey">{chat.time}</small>
                           </p>
                        </div>
                     </div>
                     }
                  </div>
               </div>
            ))}
            

         </main>}

         <footer>
            <section className="accept-or-reject">
               <p>What would you like to do with this request?</p>
               <div className="request-options">
                  <span className="accept-r pointer" onClick={() => handleRequest("accept")}>Accept</span>
                  <span className="reject-r pointer" onClick={() => handleRequest("reject")}>Reject</span>
               </div>
            </section>
         </footer>
         

         {/* {chats && <div className="bottom" ref={messageEndRef}/>} */}
      </div>
   );
}
   


export default MsgRequest;