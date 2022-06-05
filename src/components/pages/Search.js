const Search = () => {
   return (
      <div className="search-react">

         <header>
            <div class="header-wrapper width-p-10 height-p-10 border-none">
               <div class="header">
                  <a href="{% url 'discover' %}">
                     <div class="search">
                        <img src="{% static 'images/icons/back icons/back-1.png' %}" alt="user" />
                     </div>
                  </a>
               </div>
               <form action="" method="GET" class="search">
                  <input type="text" name="search" value="" id="search" placeholder="Search" autocomplete="off" />
               </form>
            </div>
         </header>

         <main>
            <div className="search-container">
               {/* {% if not profiles %} */}
               <div className="search-title width-p-20 pad-bot-10">
                  <h2 className="no-margin">Recent</h2>
               </div>
               
               {/* {% for search in searchs %} */}
               <a href="{% url 'picked-search' search.user.profile.user.id %}">
                  <div className="search-wrapper">
                     <div className="activity fff-main-user">
                        <div className="activity-2">
                           <div className="img-holder-2">
                              <img src="{{search.user.profile.img.url}}" alt="profile-picture" className="img-holder-image" />
                           </div>
                           <div className="search-info">
                              <h3 className="no-margin width-p-10"><strong>{"dan"}
                                 {/* {% if search.user.profile.verified %} */}
                                    <img src="{% static 'images/icons/verified/verified-blue2.png' %}" className="width-15" alt="verification" />
                                 {/* {% endif %} */}
                              </strong></h3>
                              <small className="no-margin grey">{"nate"}</small>
                           </div>
                        </div>
                        <a href="{% url 'delete-search' search.id %}">
                           <img src="{% static 'images/icons/cancel/close.png' %}" alt="" className="width-10 pad-bot-5px" />
                        </a>
                     </div>
                  </div>
               </a>
               {/* {% endfor %} */}
               
               {/* {% for profile in profiles %} */}
               <a href="{% url 'picked-search' profile.user.id %}">
                  <div className="search-wrapper">
                     <div className="activity fff-main-user">
                        <div className="activity-2">
                           <div className="img-holder-2">
                              <img src={""} alt="profile-picture" className="img-holder-image" />
                           </div>
                           <div className="search-info">
                              <h3 className="no-margin width-p-10"><strong>{"daniellchukwu_"}
                                 {/* {% if profile.verified %} */}
                                    <img src="{% static 'images/icons/verified/verified-blue2.png' %}" className="width-15" alt="verification" />
                                 {/* {% endif %} */}
                              </strong></h3>
                              <small className="no-margin grey">{"daniel"}</small>
                           </div>
                        </div>
                     </div>
                  </div>
               </a>
               {/* {% endfor %} */}

            </div>

         </main>
         
      </div>
   );
}

export default Search;