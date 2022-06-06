import { Link } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const MessageList = ({messages, owner}) => {
   const {verified_icon} = useIcons();
   const {host_url} = useVariables();

   return (

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
      
   );
}
export default MessageList;