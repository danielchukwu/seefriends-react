// imports: main
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useUser from "../../customhooks/useUser";
import useVariables from "../../customhooks/useVariables";
// imports: custom hooks

// imports: components
import Header from "../headers_footers/Header";
import FFFList from "./FFFList";

const FFF = () => {
   const {id, page: pagetitle} = useParams();
   const {access_token, users_host_url } = useVariables()
   const {user:profileOwner} = useUser(id);
   const {owner} = useGetOwner()
   const [followers, setFollowers ] = useState(null)
   const [following, setFollowing ] = useState(null)
   const [friends, setFriends ] = useState(null)

   const [fff, setFff] = useState(pagetitle) // page: followers, following, or fiends 

   // SECTION 1: Fetch Followers, Following, Friends
   useEffect(() => {

      // logic: fetch followers
      fetch(users_host_url+id+'/followers/', {
         method: "GET",
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            // console.log(data)
            setFollowers(data);
         })
         .catch(err => {
            console.log(err.message);
         })

      // logic: fetch followings
      fetch(users_host_url+id+'/following/', {
         method: "GET",
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            // console.log(data);
            setFollowing(data);
         })
         .catch(err => {
            console.log(err.message);
         })

      // logic: fetch friends
      fetch(users_host_url+id+'/friends/', {
         method: "GET",
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            // console.log(data);
            setFriends(data);
         })
         .catch(err => {
            console.log(err.message);
         })
   }, [access_token, users_host_url, id])
   

   
   return (
      <div className="fff-react">

         {fff && <Header page={fff} left={"go-back"} right={""} />}

         <div className="fff-container">
            <div className="fff-op-wrapper">
                  
               <div className="fff-op pointer" onClick={() => setFff("Followers")}>
                  {fff.toLowerCase() === "followers" && <h4>Followers</h4>}
                  {fff.toLowerCase() !== "followers" && <h4 className="grey-dark">Followers</h4>}
               </div>
               <div className="fff-op pointer" onClick={() => setFff("Following")}>
                  {fff.toLowerCase() === "following" && <h4>Following</h4>}
                  {fff.toLowerCase() !== "following" && <h4 className="grey-dark">Following</h4>}
               </div>
               <div className="fff-op pointer" onClick={() => setFff("Friends")}>
                  {fff.toLowerCase() === "friends" && <h4>Friends</h4>}
                  {fff.toLowerCase() !== "friends" && <h4 className="grey-dark">Friends</h4>}
               </div>

            </div>
         </div>
         
         <div className="fff-body mobile-page-550">
            {/* {followers && <FFFList users={followers} page={fff} />} */}

            {followers && fff === "Followers" && <FFFList users={followers} setUsers={setFollowers} profileOwner={profileOwner} owner={owner} page={fff} />}
            {following && fff === "Following" && <FFFList users={following} setUsers={setFollowers} profileOwner={profileOwner} owner={owner} page={fff} />}
            {friends && fff === "Friends" &&  <FFFList users={friends} setUsers={setFollowers} profileOwner={profileOwner} owner={owner} page={fff} />}
         </div>
      </div>
   );
}

export default FFF;