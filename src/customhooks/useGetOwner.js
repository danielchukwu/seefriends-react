import { useEffect, useState } from "react";
import useVariables from "./useVariables";

const useGetOwner = () => {
   const { owner_url, access_token } = useVariables();
   const [owner, setOwner] = useState();
   
   
   useEffect(() => {

      fetch(owner_url, {
         method: "GET",
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`}
      })
      .then(res => {
         return res.json();
      })
      .then(data => {
         // console.log(data)
         setOwner(data)
      })
      .catch(err => {
         console.log("useGetOwner Error:", err.message)
      })
   }, [owner_url, access_token])
   
   return {owner, setOwner};
}

export default useGetOwner;