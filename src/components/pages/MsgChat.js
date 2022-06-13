import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const MsgChat = () => {
   // "This component takes two id's in route: 1st for me, 2nd for the other user"
   const navigate = useNavigate();
   const {verified_icon, options_icon, send_icon32, go_back_icon, check_blue16_icon, check_grey16_icon} = useIcons();
   const {main_host_url, access_token, messages_url, host_url, users_host_url} = useVariables();
   const {owner} = useGetOwner();
   const [otherUser, setOtherUser] = useState();

   const { id1, id2 } = useParams();
   
   const [chats, setChats] = useState();
   // const [seen, setSeen] = useState(false); // use: this will work with our websocket to update the users seen status

   const inputRef = useRef();
   const messageEndRef = useRef()
   const [submitReady, setSubmitReady] =useState(false);

   // logic: Fetch the other user and chats with that user
   useEffect(() => {

      // Fetch: otherUser
      if (id2){
         fetch(users_host_url+id2+'/', {
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
      fetch(messages_url + id2 + "/", {
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
            // console.log(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })

   }, [messages_url, access_token])

   // scroll to bottom logic
   const scrollToBottom = () => {
      // messageEndRef.current?.scrollIntoView({behavior: "smooth"})
      window.scrollTo(0, document.body.clientHeight);

   }
   useEffect(() => {
      scrollToBottom()
   }, [chats])
   
   // logic: handleAddChat
   const handleAddChat = (id, body, seen) => {
      //logic: adding message => my message to chats
      if (chats){
         const newChat = {body: body, created: Date.now(), id: Date.now(), is_read: seen, owner: id, time: get_time()}
      // console.log(newChat)
      
         setChats([...chats, newChat])
      }
   }

   // Websocket Creation
   let url = `ws://${main_host_url}/ws/message/${id1}/${id2}/`
   const messageSocket = new WebSocket(url)
   // console.log(messageSocket)

   let get_time = function () {
      let current = new Date()
      let hour = null
      let minutes = null
      if (current.getHours() < 10){
         hour = `0${current.getHours()}`
      }
      else (
         hour = current.getHours()
      )
      if (current.getMinutes() < 10){
         minutes= `0${current.getMinutes()}`
      }
      else (
         minutes= current.getMinutes()
      )
      
      return `${hour}:${minutes}`
   }

   // logic: sending message
   messageSocket.onmessage = function (e) {
      let data = JSON.parse(e.data)
      // console.log('Data:', data)
      scrollToBottom()

      if (data.type === "chat" && data.body !== ""){
         handleAddChat(data.sender_id, data.body, data.seen);
      } else if (data.body === "" && chats){

         // "Mark all unread as read when the other user opens his chat with you up"
         const newChats = [...chats]
         const unseen_chats = newChats.filter(chat => {
            if (chat.is_read === false){
               return chat
            }
         })
         unseen_chats.forEach(chat => {
            chat.is_read = true;
         })

         setChats([...newChats])
         // console.log(unseen_chats)
      }
   }

   // Other User just opened his chat with you: send chat body = "" to me
   useEffect(() => {
      messageSocket.onopen = () => {
         messageSocket.send(JSON.stringify({
            'body': "",
            'sender_id': id1,
         }))
      }

      inputRef.current.focus()

   }, [])

   // form: submit your chat
   const handleSubmit = (e) => {
      e.preventDefault();
      
      let body = inputRef.current.innerHTML;

      // filter out: contenteditable innerHTML <div> tags and <br/> tags
      while(body.includes('<div>') || body.includes('<br>') ||  body.includes('</div>')){
         body = body.replace("<div><br>", '\n');
         body = body.replace("&nbsp;", '');
         body = body.replace("&amp;", '&');
         body = body.replace("<br>", '\n');
         body = body.replace("<div>", '\n');
         body = body.replace("</div>", '');
      }
      while (body.length-1 === body.lastIndexOf('\n')){
         body = body.slice(0, -1);
      }

      if (body.length >= 1){
         messageSocket.send(JSON.stringify({
            'body': body,
            'sender_id': owner.id
         }))
      }

      inputRef.current.innerHTML = "";
      inputRef.current.focus();
   }

   // form: ready for submission
   const isReady =(e) => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize !== 0){
         if (e.key === 'Enter'){
            handleSubmit(e);
         }
      }
   }

   // Chat Box: styling
   const myBoxStyles =(index) => {
      // Right-hand side
      if (index === 0) return "my-msg-first" //
      if (chats[index-1].owner !== owner.id){
         if (chats[index].type !== ""){ // logic: But if current text is not of just text but text on "post" or "tell" don't add margin to the top
            return ""
         }
         return "my-msg-first";
      } else {
         return "my-msg-notfirst";
      }
   }
   const otherBoxStyles =(index) => {
      // Left-hand side
      if (index === 0) return "user-msg-first" //
      if (chats[index-1].owner === owner.id){
         if (chats[index].type !== ""){ // logic: But if current text is not of just text but text on "post" or "tell" don't add margin to the top
            return ""
         }
         return "user-msg-first";
      } else {
         return "user-msg-notfirst";
      }
   }

   // Chat Box: determining when to show check after a bunch of user texts
   const showReadReciept = (index) => {
      if (index === chats.length -1) return true

      if ((chats[index+1].owner === chats[index].owner) && chats[index].is_read === true && chats[index+1].is_read === false) return true  // 1st condition: same owner of current text and next text, 2nd condition: current text is read but next is not read => return true: show reciept in that case
      else if (chats[index+1].owner === chats[index].owner) return false
      else return true
   }

   // Exit Chat Room
   const exitChatRoom = () => {
      
      // Fetch: messages
      fetch(messages_url + id2 + "/remove/", {
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
            // console.log(data)
            navigate(-1)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
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
      <div className="msg-chat-react">

      <div className="header-react-msg">
         <header className="mobile-page-750">
            <div className="message-header" data-user="{{user.id}}">
               <div className="message-left pointer">
                  <div className="back" onClick={() => exitChatRoom()}>
                     <img src={go_back_icon} alt="" />
                  </div>
                  {otherUser && <div className="activity-2">
                     <Link to={`/users/profile/${otherUser.id}`}>
                        <div className="img-holder-m">
                           <img src={host_url + otherUser.profile.img} alt="profile-picture" className="img-holder-image-m" />
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
               {/* <a href="#" className="options-link">
                  <div className="message-right">
                     <img src={options_icon} alt="" width="20" />
                  </div>
               </a> */}
            </div>
         </header>
      </div>

         {chats && owner && 
         <main id="main" className="msg-chat-container">
            

            {/* Chat Boxes */}

            { chats.map((chat, index) => (
               <div key={chat.id}>

                  {/* Show Month and Day */}
                  {showMonthandDay(index) && 
                  <div className="timestamp-holder">
                     <span className="timestamp">
                        <small>{showMonthandDay(index)}</small>
                     </span>
                  </div>}

                  {/* Show My Messages */}
                  {chat.owner === owner.id && 
                  <div className="msg-block-me-container" onLoadStart={scrollToBottom()}>
                     
                     { chat.type === "post" && 
                        <div className="shared-post-container margin-l-auto">
                           <Link to={"/posts/"+chat.msg_on_post.id}>
                              <img src={host_url + chat.msg_on_post.img} alt="" className="shared-img"/>
                           </Link>
                        </div>
                     }

                     {chat.type === "tell" && 
                        <div className="shared-tell-container margin-l-auto">
                           <Link to={"/tells/" + chat.msg_on_tell.id}>
                              <div className="shared-header">
                                 <div className="username-verified flex">
                                    <h4 className="no-margin">{chat.msg_on_tell.owner.profile.username}</h4>
                                    {/* {chat.msg_on_tell.owner.profile.verified && <img src={verified_icon} className="width-13 verified-pos1" alt="verification" />} */}
                                 </div>
                                 <strong className="font-lobster">T</strong>
                              </div>
                              <p className="no-margin">{chat.msg_on_tell.body}</p>
                           </Link>
                        </div>
                     }

                     {chat.body.length > 0 && 
                     <div className="msg-block-me">
                        <div className={`msg-box-me `+ myBoxStyles(index)}>
                           <p className="no-margin">
                              <span>{chat.body}</span>
                              <small className="msg-time grey">{chat.time}</small>
                           </p>
                        </div>
                     </div>}
                     {showReadReciept(index) && 
                     <div className="read-reciept-me">
                        {chat.is_read && <img src={check_blue16_icon} alt="" className="width-12" />}
                        {!chat.is_read && <img src={check_grey16_icon} alt="" className="width-12" />}
                     </div>}
                  </div>
                  }

                  {/* Show Other User Messages */}
                  {chat.owner !== owner.id && 
                  <div className="msg-block" onLoadStart={scrollToBottom()}>
                     { chat.type === "post" && 
                        <div className="shared-post-container">
                           <Link to={"/posts/"+chat.msg_on_post.id}>
                              <img src={host_url + chat.msg_on_post.img} alt="" className="shared-img"/>
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

         <div className="bottom" ref={messageEndRef} />

         <div className="footer border-top-e9">
            <form className="message-form mobile-page-750" id="form" onSubmit={(e) => handleSubmit(e)}>
               <div ref={inputRef} onKeyDown={isReady} className="textarea-chat" contentEditable={true} required></div>
               <button className="chat-button">
                  <img src={send_icon32} className="send-msg-button" alt="" />
               </button>
            </form>
         </div>
         
      </div>
   );
}

export default MsgChat;