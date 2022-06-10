// imports: main
import { useEffect, useState } from "react"
// imports: custom hooks
import useVariables from "../../customhooks/useVariables"

// imports: components
import Header from "../headers_footers/Header"
import Footer from "../headers_footers/Footer"
import ActivityList from "./ActivityList"
import { Link, useNavigate } from "react-router-dom"
import useGetOwner from "../../customhooks/useGetOwner"
import Loading from "./Loading"


const Activity = () => {
   const { activity_url, access_token } = useVariables()
   const [activities, setActivities ] = useState()
   const navigate = useNavigate();
   const [showLoading, setShowLoading] = useState(true)


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
         if (data.detail) navigate('/login')
         setActivities(data)
         setShowLoading(false)
      })
      .catch(err => {
         console.log(err.message)
      })
      
   }, [activity_url, access_token])
   

   return (
      <div className="activity-page-react">
         <Header page="Activity" left={"title"} right={"search-chats"} />
         
         <main className="activity-container margin-b-60">
            {activities && <ActivityList activities={activities} />}

            {showLoading && <Loading />}

         </main>
         <Footer />
      </div>
   );
}

export default Activity;