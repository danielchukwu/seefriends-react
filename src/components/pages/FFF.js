// imports: main
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVariables from "../../customhooks/useVariables";
// imports: custom hooks

// imports: components
import HeaderFFF from "../headers_footers/HeaderGBT";
import FFFList from "./FFFList";

const FFF = () => {
   const {id, page: pagetitle} = useParams();
   const {access_token, users_host_url, host_url} = useVariables()
   // const {verified_icon} = useIcons()
   // const navigate = useNavigate()
   const [followers, setFollowers ] = useState(null)
   const [following, setFollowing ] = useState(null)
   const [friends, setFriends ] = useState(pagetitle)

   let [fff, setFff] = useState(null) // page: followers, following, or fiends   

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
            console.log(data)
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
            console.log(data);
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
            console.log(data);
            setFriends(data);
         })
         .catch(err => {
            console.log(err.message);
         })
   }, [access_token, users_host_url, id])
   
   
   return (
      <div className="fff-react">

         <HeaderFFF title={pagetitle} />
         
         <div className="fff-body">
            {/* {followers && <FFFList users={followers} page={fff} />} */}

            {followers && fff == "Followers" && <FFFList users={followers} page={fff} />}
            {following && fff == "Following" && <FFFList users={following} page={fff} />}
            {friends && fff == "Friends" &&  <FFFList users={friends} page={fff} />}
         </div>
      </div>
   );
}

export default FFF;