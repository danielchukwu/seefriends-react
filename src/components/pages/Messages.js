import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";
import MessageList from "./MessageList";

const Messages = () => {
   const {verified_icon, user_icon, sf_logo, options_icon} = useIcons();
   const {access_token, messages_url, requests_url, host_url} = useVariables();
   const {owner} = useGetOwner();

   const [pageHandler, setPageHandler] = useState("messages");
   
   const [messages, setMessages] = useState();
   const [requests, setRequests] = useState();
   const navigate = useNavigate();

   useEffect(() => {
      
      // Fetch: messages
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
      
      
      // Fetch: requests
      fetch(requests_url, {
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
         setRequests(data);
         console.log(data);
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
               
               {/* Messages */}
               <div className={`chat-c  ${pageHandler === "messages" ? "pick" : ""}`}><h4 className="no-margin black" onClick={() => setPageHandler("messages")}>Messages</h4>
                  {messages && get_unreadMessagesCount(messages) > 0 && <span>{get_unreadMessagesCount(messages)}</span>}
               </div>

               {/* Requests  */}
               <div className={`chat-c  ${pageHandler === "requests" ? "pick" : ""}`} ><h4 className="no-margin black" onClick={() => setPageHandler("requests")}>Requests</h4>
                  <span>{2}</span>
               </div>
            </div>
         </section>

         {messages && pageHandler === "messages" && <MessageList messages={messages} owner={owner} />}
         {requests && pageHandler === "requests" && <MessageList messages={requests} owner={owner} />}


         <Footer />
         
      </div>
   );
}

export default Messages;