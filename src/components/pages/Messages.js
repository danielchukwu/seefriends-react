import { Link } from "react-router-dom"
import useIcons from "../../customhooks/useIcons";
import Footer from "../headers_footers/Footer";

const Messages = () => {
   const {verified_icon, user_icon, sf_logo, options_icon} = useIcons();

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
                  <div className="chat-c"><h4 className="no-margin black">Chats</h4>
                     <span>{2}</span>
                  </div>
               </Link>
               <Link to={"/"}>
                  <div className="chat-c pick"><h4 className="no-margin black">Requests</h4>
                     <span>{2}</span>
                  </div>
               </Link>
               {/* <Link to="{% url 'friends' %}">
                  <div className="friends-c"><h4 className="no-margin">Calls</h4></div>
               </Link> */}
            </div>
         </section>

         {/* <section class="chat-wrapper mobile-page-center width-p-10">

            {% for chat in chats %}

            {% if chat.body_set.all.0.is_read == False %}
            <a href="{% url 'message' chat.owner.id %}">
            <div class="chat">
               <div class="img-holder-c">
                  <img src="{{chat.owner.profile.img.url}}" alt="profile-picture" class="img-holder-image">
               </div>
               <div class="chat-content">
                  <div class="c-top">
                     <h3 class="no-margin">{{chat.owner.profile.name|title}}
                        {% if chat.owner.profile.verified %}
                        <img src="{% static 'images/icons/verified/verified-blue2.png' %}" class="width-15" alt="verification">
                        {% endif %}
                     </h3>
                     <p class="grey-dark no-margin black">{{chat.last_body.created|date:"H:i"}}</p> <!-- message: msg.3 -->
                  </div>
                  <div class="c-bottom">
                     {% if chat.last_body.get_body_count > 35 %}
                     <p class="no-margin grey-dark black" style="overflow: hidden;">{{chat.last_body.body|slice:35}}...</p>
                     {% else %}
                     <p class="no-margin grey-dark black" style="overflow: hidden;">{{chat.last_body.body|slice:35}}</p>
                     {% endif %}
                     <span class="chat-circle">{{chat.unread_messages}}</span>
                  </div>
               </div>
            </div>
            </a>

            {% else %}
            
            <a href="{% url 'message' chat.owner.id %}">
            <div class="chat">
               <div class="img-holder-c">
                  <img src="{{chat.owner.profile.img.url}}" alt="profile-picture" class="img-holder-image">
               </div>
               <div class="chat-content">
                  <div class="c-top">
                     <h3 class="no-margin">{{chat.owner.profile.name|title}}
                        {% if chat.owner.profile.verified %}
                        <img src="{% static 'images/icons/verified/verified-blue2.png' %}" class="width-15" alt="verification">
                        {% endif %}
                     </h3>
                     <p class="grey-dark no-margin">{{chat.last_body.created|date:"H:i"}}</p> <!-- message: msg.3 -->
                  </div>
                  <div class="c-bottom">
                     {% if chat.last_body.get_body_count > 35 %}
                     <p class="no-margin grey-dark" style="overflow: hidden;">{{chat.last_body.body|slice:35}}...</p>
                     {% else %}
                     <p class="no-margin grey-dark" style="overflow: hidden;">{{chat.last_body.body}}</p>
                     {% endif %}
                     <!--  -->
                     {% if chat.last_body.owner == request.user %}

                     {% if chat.last_body.is_read %}
                     <span class="seen-flex">
                        <div class="c1 msg-blue"></div>
                        <div class="c1 msg-blue"></div>
                     </span>
                     {% else %}
                     <span class="seen-flex">
                        <div class="c1"></div>
                        <div class="c1"></div>
                     </span>
                     {% endif %}

                     {% endif %}
                  </div>
               </div>
            </div>
            </a>

            {% endif %}

            {% endfor %}

         </section> */}


         <Footer />
         
      </div>
   );
}

export default Messages;