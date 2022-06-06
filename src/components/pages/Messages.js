import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";

const Messages = () => {
   const {verified_icon, user_icon, sf_logo, options_icon} = useIcons();
   const {access_token, messages_url, host_url} = useVariables();
   const {owner} = useGetOwner();

   const [messages, setMessages] = useState();
   const navigate = useNavigate();

   useEffect(() => {
      
      fetch(messages_url, {
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
         setMessages(data);
         console.log(data)
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })

   
   }, [messages_url, access_token])

   const get_unreadMessagesCount = (messages) => {
      return messages.filter(message => message.unread_messages > 0).length
   }

   return (
      <div className="messages-react">

         <header>
            <div className="header-wrapper width-p-20 height-p-20">
               <div className="header-1">
                  <Link to="/">
                     <div className="logo">
                        <img src={sf_logo} alt="seefriends logo" />
                     </div>
                  </Link>
                  
               </div>
               <div className="msg-mr">
                  {/* <Link to={"/"}>
                     <span className="msg-rcontainer">
                        <img src={user_icon} alt="" className="msg-r" />
                        <div className="msg-rcount">{5}</div>
                     </span>
                  </Link> */}
                  <Link to={"/"} className="options-link">
                     <img src={options_icon} alt="" className="width-20" />
                  </Link>
               </div>
            </div>
         </header>

         <section className="inbox-menu">
            <div className="inbox-options">
               <Link to={"/"}>
                  <div className="chat-c pick"><h4 className="no-margin black">Messages</h4>
                     {messages && get_unreadMessagesCount(messages) > 0 && <span>{get_unreadMessagesCount(messages)}</span>}
                  </div>
               </Link>
               <Link to={"/"}>
                  <div className="chat-c"><h4 className="no-margin black">Requests</h4>
                     <span>{2}</span>
                  </div>
               </Link>
               {/* <Link to="{% url 'friends' %}">
                  <div className="friends-c"><h4 className="no-margin">Calls</h4></div>
               </Link> */}
            </div>
         </section>

         {messages && (
            <section className="message-wrapper mobile-page-center width-p-10">

               {/* unread messages */}
               {messages.map( message => (
               <div key={message.id}>

                  { message.unread_messages > 0 &&
                  <Link to={"/"}>
                  <div className="chat">
                     <div className="img-holder-c">
                        <img src={host_url + message.owner.profile.img} alt="profile-picture" className="img-holder-image" />
                     </div>
                     <div className="chat-content">
                        <div className="c-top">
                           <h3 className="no-margin">{message.owner.profile.name}
                              {message.owner.profile.verified && <img src={verified_icon} className="width-15 verified-pos1" alt="verification" />}
                           </h3>
                           <p className="grey-dark no-margin black">{message.time}</p> {/* message: msg.3 */}
                        </div>
                        <div className="c-bottom">
                           <p className="no-margin black" style={{overflow: "hidden"}}>{message.last_body.body.slice(0, 32)}{message.last_body.body.length > 32 ? "..." : ""}</p>
                           {/* {% endif %} */}
                           <span className="chat-circle">{message.unread_messages}</span>
                        </div>
                     </div>
                  </div>
                  </Link>}

                  
                  {/* read messages */}
                  { message.unread_messages === 0 &&
                  <Link to={"/"}>
                  <div className="chat">
                     <div className="img-holder-c">
                        <img src={host_url + message.owner.profile.img} alt="profile-picture" className="img-holder-image" />
                     </div>
                     <div className="chat-content">
                        <div className="c-top">
                           <h3 className="no-margin">{message.owner.profile.name}
                              {message.owner.profile.verified && <img src={verified_icon} className="width-15 verified-pos1" alt="verification" />}
                           </h3>
                           <p className="grey-dark no-margin black">{message.time}</p> {/* message: msg.3 */}
                        </div>
                        <div className="c-bottom">
                           <p className="no-margin grey-dark" style={{overflow: "hidden"}}>{message.last_body.body}</p>

                           {/* if you sent the message and it has been read */}
                           {message.last_body.is_read && message.last_body.owner === owner.id && <span className="seen-flex">
                              <div className="c1 msg-blue"></div>
                              <div className="c1 msg-blue"></div>
                           </span>}

                           {/* if you sent the message and it has not been read */}
                           {!message.last_body.is_read && message.last_body.owner === owner.id && <span className="seen-flex">
                              <div className="c1"></div>
                              <div className="c1"></div>
                           </span>}

                        </div>
                     </div>
                  </div>
                  </Link>}
               </div>
               ))}

               {/* {% endif %} */}


            </section>
         )}


         <Footer />
         
      </div>
   );
}

export default Messages;