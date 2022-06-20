import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useIcons from "../../customhooks/useIcons";
import useVariables from "../../customhooks/useVariables";

const Search = () => {
   const {go_back_icon, verified_icon, cancel_icon} = useIcons();
   const [searched, setSearched] = useState();  // Before search starts. this holds the saved searched
   const [searchs, setSearchs] = useState(); // When search starts. this holds searchs
   const {host_url, search_url, access_token} = useVariables();
   const inputRef = useRef();
   const navigate = useNavigate();


   // logic: fetch searched
   useEffect(() => {
      
      fetch(search_url, {
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
         setSearched(data);
         setSearchs([]);
         // console.log(data)
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })

   
   }, [search_url, access_token, navigate])


   // logic: remove search and use searchs on search
   const handleSearch = (e) => {
      let body = e.target.value;
      if (inputRef){
         body = inputRef.current.value;
      }
      if (body.length > 0){

         const uploadData = new FormData();
         uploadData.append('body', body);
         
         fetch(search_url, {
            method: "POST",
            headers: {Authorization: `Bearer ${access_token}`},
            body: uploadData
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               setSearched([])
               setSearchs(data)
            })
            .catch(err => console.log(err))
         
      } else {

         fetch(search_url, {
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
            setSearched(data);
            setSearchs([]);
            // console.log(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })
      }
   }

   // logic: handle add or delete search profile
   const handleSearchProfile = (id, type) => {
      
      if (type === "add"){

         fetch(search_url + id + "/add/", {
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
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })

      } 
      else if (type === "delete"){

         fetch(search_url + id + "/delete/", {
            method: "DELETE",
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
            setSearched(data);
            // console.log(data)
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })

      }
   }
   
   return (
      <div className="search-react">
         <div className="header-react">
            <header className="mobile-page-950">
               <div className="header-wrapper width-p-10 height-p-10 border-none">
                  <div className="header">
                        <div className="search" onClick={() => navigate(-1)}>
                           <img src={go_back_icon} alt="user" />
                        </div>
                  </div>
                  <form className="search" onSubmit={e => e.preventDefault()}>
                     <input ref={inputRef} type="text" name="search" id="search" placeholder="Search" autoComplete="off" onChange={handleSearch}  />
                  </form>
               </div>
            </header>
         </div>

         <main className="mobile-page-550">
            <div className="search-container">
               {/* {% if not profiles %} */}
               <div className="search-title width-p-20 pad-bot-10">
                  <h3 className="no-margin">Keepers</h3>
               </div>
               
               {/* Saved Searches */}
               {searched && 
               searched.map( search => (
                  <div key={search.id}>

                     <div className="search-wrapper">
                        <div className="activity fff-main-user">
                           <Link to={"/users/profile/"+search.user.id}>
                              <div className="activity-2">
                                 <div className="img-holder-2">
                                    <img src={host_url + search.user.profile.img}alt="profile-dp" className="img-holder-image" />
                                 </div>
                                 <div className="search-info">
                                    <h3 className="no-margin width-p-10"><strong>{search.user.profile.username}

                                    {search.user.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}

                                    </strong></h3>
                                    <small className="no-margin grey">{search.user.profile.name}</small>
                                 </div>
                              </div>
                           </Link>

                           <div onClick={() => handleSearchProfile(search.id, "delete")}>
                              <img src={cancel_icon} alt="cancel" className="width-10 pad-bot-5px"/>
                           </div>
                        </div>
                     </div>

                  </div>
               ))}

               {/* Searching Searches */}
               {searchs && 
               searchs.map( user => (
                  <div key={user.id}>

                     <div className="search-wrapper">
                        <div className="activity fff-main-user">
                           <Link to={"/users/profile/"+user.id} onClick={() => handleSearchProfile(user.id, "add")}>
                              <div className="activity-2">
                                 <div className="img-holder-2">
                                    <img src={host_url + user.profile.img}alt="profile-dp" className="img-holder-image" />
                                 </div>
                                 <div className="search-info">
                                    <h3 className="no-margin width-p-10"><strong>{user.profile.username}

                                    {user.profile.verified && <img src={verified_icon} className="small-img-feed verified-pos2" alt="verification" />}

                                    </strong></h3>
                                    <small className="no-margin grey">{user.profile.name}</small>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     </div>

                  </div>
               ))}
               
               
            </div>

         </main>
         
      </div>
   );
}

export default Search;