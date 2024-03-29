import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import useGetOwner from "../../customhooks/useGetOwner";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";
import Loading from "./Loading";
import MessagesList from "./MessagesList";

const Messages = () => {
   const {sf_logo} = useIcons();
   const {access_token, messages_url, requests_url} = useVariables();
   const {owner} = useGetOwner();

   const [pageHandler, setPageHandler] = useState("messages");  // messages or requests
   
   const [messages, setMessages] = useState(null);
   const [requests, setRequests] = useState();
   const navigate = useNavigate();

   // fetching: messages and requests
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
         // console.log(data)
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
         // console.log(data);
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })
      

   
   }, [messages_url, access_token, navigate, requests_url])

   // logic: Getting messages and requests count
   const get_unreadMessagesCount = (messages) => {
      return messages.filter(message => message.unread_messages > 0).length
   }
   const get_unreadRequestsCount = (requests) => {
      return requests.filter(request => request.unread_messages > 0).length
   }

   return (
      <div className="messages-react margin-b-70">

         <div className="header-react">
            <header className="mobile-page-950">
               <div className="header-wrapper width-p-20 height-p-20">
                  <div className="header-1">
                     <Link to="/">
                        <div className="logo">
                           <img src={sf_logo} alt="seefriends logo" />
                        </div>
                     </Link>
                     
                  </div>
                  <div className="msg-mr">
                     {/* Msg Options - feature to be added later */}
                     {/* <Link to={"/"} className="options-link">
                        <img src={options_icon} alt="" className="width-20" />
                     </Link> */}
                  </div>
               </div>
            </header>
         </div>

         <section className="inbox-menu">
            <div className="inbox-options">
               
               {/* Messages */}
               <div className={`chat-c pointer ${pageHandler === "messages" ? "pick" : ""}`}><h4 className="no-margin black" onClick={() => setPageHandler("messages")}>Messages</h4>
                  {messages && get_unreadMessagesCount(messages) > 0 && <span>{get_unreadMessagesCount(messages)}</span>}
               </div>

               {/* Requests  */}
               <div className={`chat-c pointer ${pageHandler === "requests" ? "pick" : ""}`} ><h4 className="no-margin black" onClick={() => setPageHandler("requests")}>Requests</h4>
                  {requests && get_unreadRequestsCount(requests) > 0 && <span>{get_unreadRequestsCount(requests)}</span>}
               </div>
            </div>
         </section>
         
         <section className="chat-list-wrapper">
            {messages && owner && pageHandler === "messages" && <MessagesList messages={messages} owner={owner} pageHandler = "messages" />}
            {requests && owner && pageHandler === "requests" && <MessagesList messages={requests} owner={owner} pageHandler = "requests" />}
         </section>

         {!messages && <Loading />}

         <Footer />
         
      </div>
   );
}

export default Messages;