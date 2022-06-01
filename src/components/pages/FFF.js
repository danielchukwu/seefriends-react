// imports: main
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetOwner from "../../customhooks/useGetOwner";
import useUser from "../../customhooks/useUser";
import useVariables from "../../customhooks/useVariables";
// imports: custom hooks

// imports: components
import HeaderFFF from "../headers_footers/HeaderGBT";
import FFFList from "./FFFList";

const FFF = () => {
   const {id, page: pagetitle} = useParams();
   const {access_token, users_host_url, host_url} = useVariables()
   const {user:profileOwner} = useUser(id);
   const owner = useGetOwner()
   // const {verified_icon} = useIcons()
   // const navigate = useNavigate()
   const [followers, setFollowers ] = useState(null)
   const [following, setFollowing ] = useState(null)
   const [friends, setFriends ] = useState(null)

   const [fff, setFff] = useState(pagetitle) // page: followers, following, or fiends 

   // Follow & Unfollow state
   const [isFollowing, setIsFollowing] = useState();  // true or false

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
   

   // SECTION 2: 
   // logic: when user loads check to see if we are following the user
   // useEffect(() => {
   //    if (user && owner){
   //       if (user.profile.followers.includes(owner.id)){
   //          setIsFollowing(true);
   //       }else {
   //          setIsFollowing(false);
   //       }
   //    }
   // }, [user])
   
   // // logic: Follow and Unfollow
   // const handleFollow = (which, id) => {
   //    if (which === "follow"){
   //       setIsFollowing(true)
   //       setFollowerCount(followerCount+1)
   //       if (isFollowingYou) setFriendsCount(friendsCount+1)
         
   //       fetch(users_host_url+id+'/follow/', {
   //          method: "GET",
   //          headers: {"Content-Type": "application/json",
   //          Authorization: `Bearer ${access_token}`
   //       }
   //    })
   //    .then(res => {
   //       return res.json();
   //    })
   //    .then(data => {
   //       console.log(data);
   //    })
   // } else if (which === "unfollow"){
   //    setIsFollowing(false)
   //    setFollowerCount(followerCount-1)
   //    if (isFollowingYou) setFriendsCount(friendsCount-1)
      
   //    fetch(users_host_url+id+'/unfollow/', {
   //          method: "GET",
   //          headers: {"Content-Type": "application/json",
   //                   Authorization: `Bearer ${access_token}`}
   //       })
   //          .then(res => {
   //             return res.json();
   //          })
   //          .then(data => {
   //             console.log(data);
   //          })
   //    }
   // }
   
   return (
      <div className="fff-react">

         <HeaderFFF title={pagetitle} />
         
         <div className="fff-body">
            {/* {followers && <FFFList users={followers} page={fff} />} */}

            {followers && fff == "Followers" && <FFFList users={followers} profileOwner={profileOwner} owner={owner} page={fff} />}
            {following && fff == "Following" && <FFFList users={following} profileOwner={profileOwner} owner={owner} page={fff} />}
            {friends && fff == "Friends" &&  <FFFList users={friends} profileOwner={profileOwner} owner={owner} page={fff} />}
         </div>
      </div>
   );
}

export default FFF;