// import: main
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import: custom hooks
import useVariables from "../../customhooks/useVariables";
// import useGetOwner from "../../customhooks/useGetOwner";

// import: components
import Footer from "../headers_footers/Footer";
import HeaderPostFeed from "../headers_footers/HeaderPostFeed";
import TellsList from "./TellsList";

const TellsFeed = () => {
   // const owner = useGetOwner()
   const [ tells, setTells ] = useState(null)
   const {tells_url, access_token } = useVariables()
   const navigate = useNavigate()
   
   useEffect(() => {
      fetch(tells_url, {
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
         setTells(data)
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })
   }, [tells_url, access_token, navigate])
   
   return (
      <div className="tellsfeed">
         <HeaderPostFeed />

         <main>
            {tells && <TellsList tells={tells} />}
         </main>

         <Footer />
      </div>
   );
}

export default TellsFeed;