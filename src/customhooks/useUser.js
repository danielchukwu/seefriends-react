import { useEffect, useState } from "react";
import useVariables from "./useVariables";

const useUser = (id) => {
   const {users_host_url, access_token} = useVariables();
   const [user, setUser] = useState();

   useEffect(() => {
      fetch(users_host_url+id+'/', {
         method: "GET",
         headers: {"Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`
      }
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            // console.log(data);
            setUser(data);
         })
   }, [users_host_url, id])

   return {user};
}

export default useUser;