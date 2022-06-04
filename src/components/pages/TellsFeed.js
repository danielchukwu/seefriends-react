// import: main
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
// import: custom hooks
import useVariables from "../../customhooks/useVariables";
// import useGetOwner from "../../customhooks/useGetOwner";

// import: components
import Footer from "../headers_footers/Footer";
import HeaderPostFeed from "../headers_footers/HeaderPostFeed";
import TellsList from "./TellsList";

function reducer (tells, action){
   const newTell = action.payload.tells;
   const owner = action.payload.owner;
   const tells_url = action.payload.tells_url;
   const access_token = action.payload.access_token;
   const id = action.payload.id;
   
   switch (action.type){
      case "add-tell":
         return [...tells, ...action.payload.tells];
   
      case "like-tell":
         const tell = newTell.find(tell => tell.id === id);

         tell.liked = !tell.liked;   // sets liked: to true or false. it's where the magic happens
         if (tell.liked){
            tell.likers.push(owner.id);
         } else {
            tell.likers.pop();
         }

         // Send Like to Backend
         fetch(tells_url+id+'/like/', {
            method: "GET",
            headers: {"Content-Type": "application/json",
                     Authorization: `Bearer ${access_token}`
         }
         })
            .then(res => {
               return res.json();
            })
            .then(data => {
               console.log(data)
            })
            .catch(err => {
               console.log(err.message);
            })

         return [...newTell]

      default:
         return tells
   }
}

const TellsFeed = () => {
   // const owner = useGetOwner()
   // const [ tells, setTells ] = useState(null);
   const [tells, dispatchTell] = useReducer(reducer, []);
   const {tells_url, access_token } = useVariables();
   const navigate = useNavigate();
   
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

         <main className="margin-b-60">
            {tells && <TellsList tells={tells} dispatchTell={dispatchTell} />}
         </main>

         <Footer />
      </div>
   );
}

export default TellsFeed;