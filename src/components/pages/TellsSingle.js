// import: main
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import: custom hooks
import useVariables from "../../customhooks/useVariables";
// import useGetOwner from "../../customhooks/useGetOwner";

// import: components
// import Footer from "../headers_footers/Footer";
import HeaderGBT from "../headers_footers/HeaderGBT";
import TellsList from "./TellsList";

const TellsSingle = () => {
   const { id } = useParams()
   const [ tell, setTell ] = useState(null)
   const {tells_url, access_token } = useVariables()
   const navigate = useNavigate()
   
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
            setTell([data])
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
            {tell && <TellsList tells={tell} setTells={setTell} />}
         </main>

         {/* <Footer /> */}
      </div>
   );
}

export default TellsSingle;