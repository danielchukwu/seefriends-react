// imports: main
import { useEffect, useState } from "react"
// imports: custom hooks
import useVariables from "../../customhooks/useVariables"

// imports: components
import Header from "../headers_footers/Header"
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
         <Header />
         
         <main className="activity-container margin-b-60">
            {activities && <ActivityList activities={activities} />}
         </main>


         <Footer />
      </div>
   );
}

export default Activity;