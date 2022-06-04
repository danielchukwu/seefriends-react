// import: main
import { useEffect, useState, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reducerTell } from "../../App";
// import: custom hooks
import useVariables from "../../customhooks/useVariables";
// import useGetOwner from "../../customhooks/useGetOwner";

// import: components
// import Footer from "../headers_footers/Footer";
import HeaderGBT from "../headers_footers/HeaderGBT";
import TellsList from "./TellsList";

const TellsSingle = () => {
   const { id } = useParams()
   const {tells_url, access_token } = useVariables()
   const navigate = useNavigate()

   const [tell, dispatchTell] = useReducer(reducerTell, []);
   
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
            dispatchTell({ type: "add-tell", payload: {tells: [data]}});
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
         <HeaderGBT title={"Tell"} />

         <main className="margin-b-60">
            {tell && <TellsList tells={tell} dispatchTell={dispatchTell} />}
         </main>

         {/* <Footer /> */}
      </div>
   );
}

export default TellsSingle;