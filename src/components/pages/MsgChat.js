import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const MsgChat = () => {
   const navigate = useNavigate();
   const {verified_icon, options_icon, send_icon32, go_back_icon, check_blue16_icon, check_grey16_icon} = useIcons();
   const {access_token, messages_url, host_url, users_host_url} = useVariables();
   const {owner} = useGetOwner();
   const [otherUser, setOtherUser] = useState();

   const { id } = useParams();
   
   const [chats, setChats] = useState();

   const inputRef = useRef();
   const [submitReady, setSubmitReady] =useState(false);


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
               console.log(data)
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
            console.log(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })

   }, [messages_url, access_token])



   // form: upload our post if ready
   const handleSubmit = (e) => {
      e.preventDefault();
      
      let body = inputRef.current.innerHTML;
      console.log("handleSubmit called")
   }

   // form: ready for submission
   const isReady =(e) => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize !== 0){
         setSubmitReady(true)
         if (e.key === 'Enter'){
            handleSubmit(e);
         }
      } else {
         setSubmitReady(false)
      }
   }

   // Chat Box: styling
   const myBoxStyles =(index) => {
      // Right-hand side
      if (index === 0) return "my-msg-first" //
      if (chats[index-1].owner !== owner.id){
         return "my-msg-first";
      } else {
         return "my-msg-notfirst";
      }
   }
   const otherBoxStyles =(index) => {
      // Left-hand side
      if (index === 0) return "user-msg-first" //
      if (chats[index-1].owner === owner.id){
         return "user-msg-first";
      } else {
         return "user-msg-notfirst";
      }
   }

   // Chat Box: determining when to show check after a bunch of user texts
   const showReadReciept = (index) => {
      if (index === chats.length -1) return true

      if (chats[index+1].owner === chats[index].owner) return false
      else return true
   }

   return (
      <div className="msg-chat-react">

      <header>
         <div className="message-header" data-user="{{user.id}}">
            <div className="message-left">
               <div className="back" onClick={() => navigate(-1)}>
                  <img src={go_back_icon} alt="" />
               </div>
               {otherUser && <div className="activity-2">
                  <div className="img-holder-m">
                     <img src={host_url + otherUser.profile.img} alt="profile-picture" className="img-holder-image-m" />
                  </div>
                  <div>
                  
                     <h2 className="no-margin width-p-10 position-rel msg-name"><a href="{% url 'other-profile' message.owner.id %}"><strong>{otherUser.profile.username}</strong></a>
                        {otherUser.profile.verified && <img src={verified_icon} className="width-15 verified-pos1" alt="verification" />}
                     </h2>
                     <p className="no-margin width-p-10 last_seen">{otherUser.profile.last_seen}</p>
                  </div>
               </div>}
            </div>
            <a href="#" className="options-link">
               <div className="message-right">
                  <img src={options_icon} alt="" width="20" />
               </div>
            </a>
         </div>
      </header>
         

         {chats && owner && 
         <main id="main" className="margin-b-70">
            <div className="timestamp-holder">
               <span className="timestamp">
                  <strong>Welcome</strong>
               </span>
            </div>

            {/* Chat Boxes */}

            { chats.map((chat, index) => (
               <div key={chat.id}>

                  {chat.owner === owner.id && 
                  <div>
                     <div className="msg-block-me">
                        <div className={`msg-box-me `+ myBoxStyles(index)}>
                           <p className="no-margin">
                              <span>{chat.body}</span> 
                              <small className="msg-time grey">{chat.time}</small>
                           </p>
                        </div>
                     </div>
                     {showReadReciept(index) && 
                     <div className="read-reciept-me">
                        {chat.is_read && <img src={check_blue16_icon} alt="" className="width-12" />}
                        {!chat.is_read && <img src={check_grey16_icon} alt="" className="width-12" />}
                     </div>}
                  </div>
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
            ))
            
            }
            


         </main>}


         <div className="footer border-top-e9">
            <form className="message-form" id="form" action="#" method="POST">
               <div ref={inputRef} onKeyDown={isReady} className="textarea-chat" contentEditable={true} required></div>
               <div className="chat-button">
                  <img src={send_icon32} className="send-msg-button" alt="" />
               </div>
            </form>
         </div>
         
      </div>
   );
}

export default MsgChat;