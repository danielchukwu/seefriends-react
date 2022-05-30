// imports: main
import { useEffect, useState } from "react"
// imports: custom hooks
import useVariables from "../../customhooks/useVariables"

// imports: components
import HeaderPostFeed from "../headers_footers/HeaderPostFeed"
import Footer from "../headers_footers/Footer"
import ActivityList from "./ActivityList"
import { Link } from "react-router-dom"


const Activity = () => {
   const { activity_url, access_token } = useVariables()
   const [activities, setActivities ] = useState()

   useEffect(() => {

      // console.log(activity_url)
      fetch(activity_url, {
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`},
      })
      .then(res => {
         // console.log(res)
         return res.json()
      })
      .then(data => {
         setActivities(data)
      })
      .catch(err => {
         console.log(err.message)
      })
      
   }, [activity_url, access_token])
   

   return (
      <div className="activity-page-react">
         <HeaderPostFeed />
         
         <div className="activity-container">
            {activities && <ActivityList activities={activities} />}
         </div>


         <Footer />
      </div>
   );
}

export default Activity;