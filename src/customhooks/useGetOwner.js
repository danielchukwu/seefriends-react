import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVariables from "./useVariables";

const useGetOwner = () => {
   const { owner_url, access_token } = useVariables();
   const [owner, setOwner] = useState();

   const navigate = useNavigate();
   
   
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
         if (data.detail) navigate('/login')
         setOwner(data)
      })
      .catch(err => {
         console.log("useGetOwner Error:", err.message)
      })
   }, [owner_url, access_token])
   
   return {owner, setOwner};
}

export default useGetOwner;