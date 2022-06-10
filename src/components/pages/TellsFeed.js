// import: main
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { reducerTell } from "../../App";
// import: custom hooks
import useVariables from "../../customhooks/useVariables";
// import useGetOwner from "../../customhooks/useGetOwner";

// import: components
import Footer from "../headers_footers/Footer";
import Header from "../headers_footers/Header";
import Loading from "./Loading";
import TellsList from "./TellsList";



const TellsFeed = () => {
   // const owner = useGetOwner()
   // const [ tells, setTells ] = useState(null);
   const [tells, dispatchTell] = useReducer(reducerTell, []);
   const {tells_url, access_token } = useVariables();
   const navigate = useNavigate();

   const [showLoading, setShowLoading] = useState(true)
   
   // Logic: Fetch Tells
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
         dispatchTell({ type: "add-tell", payload:{tells: data}})
         setShowLoading(false);
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
         <Header  page="Tells" left={"logo"} right={"search-chats"} />

         <main className="margin-b-60">
            {tells && <TellsList tells={tells} dispatchTell={dispatchTell} />}
         </main>

         {showLoading && <Loading />}

         <Footer />
      </div>
   );
}

export default TellsFeed;