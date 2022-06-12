// import: main
import { useEffect, useState, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reducerTell } from "../../App";
// import: custom hooks
import useVariables from "../../customhooks/useVariables";
// import useGetOwner from "../../customhooks/useGetOwner";

// import: components
// import Footer from "../headers_footers/Footer";
import Header from "../headers_footers/Header";
import Loading from "./Loading";
import TellsList from "./TellsList";

const TellsSingle = () => {
   const { id } = useParams()
   const {tells_url, access_token } = useVariables()
   const navigate = useNavigate()

   const [tell, dispatchTell] = useReducer(reducerTell, []);
   const [tellThreads, dispatchTellThread] = useReducer(reducerTell, []);

   const [showLoading, setShowLoading] = useState(true)
   
   useEffect(() => {
      if (id) {
         fetch(tells_url+id+"/", {
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
            setShowLoading(false)
            dispatchTell({ type: "add-tell", payload: {tells: [data]}});
            dispatchTellThread({ type: "add-tell", payload: {tells: data.threads}});
            
         })
         .catch(err => {
            if (err.message === "unknown user"){
               navigate('/login')
            }
            console.log(err.message)
         })

      }
   }, [tells_url, access_token, navigate, id])

   console.log("tell:", tell)
   
   return (
      <div className="tellsfeed">
         <Header page="Tell" left={"go-back"} right={"search-chats"} />

         <main className="margin-b-60">
            {tell && <TellsList tells={tell} dispatchTell={dispatchTell} />}

            {
            <div className="thread-container">

               <div className="thread-flex">
                  <h3 className="no-margin thread-title">Threads</h3>
                  <p className="no-margin">{tellThreads.length}</p>
               </div>
               {tellThreads && <TellsList tells={tellThreads} dispatchTell={dispatchTellThread}/>}
            </div>}

         </main>

         {showLoading && <Loading />}

      </div>
   );
}

export default TellsSingle;