import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useVariables from "../../customhooks/useVariables";
import Footer from "../headers_footers/Footer";
import Header from "../headers_footers/Header";
import Loading from "./Loading";

const Discover = () => {
   const [posts, setPosts] = useState(null);
   const {discover_url, access_token} = useVariables();
   const navigate = useNavigate();

   useEffect(() => {
      
      fetch(discover_url, {
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
         setPosts(data);
         // console.log(data)
      })
      .catch(err => {
         if (err.message === "unknown user"){
            navigate('/login')
         }
         console.log(err.message)
      })

   
   }, [discover_url, access_token, navigate])

   // logic: fetch discover posts
   
   return (
      <div className="discover-react">
         
         <Header page="Discover" left={"go-back"} right={"search-chats"} />

         <main className="mobile-page-center">
            <section className="discover-container margin-b-60">

               {/* <!-- 1 --> */}
               {posts && <div className="d-wrapper1 d-wrapper flex">
                  <div className="long-square">
                     <Link to={"/posts/"+posts[0].id}><img src={posts[0].img} alt="" /></Link>
                  </div>
                  <div className="square-container">
                     <div className="sqw">
                        <Link to={"/posts/"+posts[1].id}><img src={posts[1].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[2].id}><img src={posts[2].img} alt="" /></Link>
                     </div>
                     <div className="sqw">
                        <Link to={"/posts/"+posts[3].id}><img src={posts[3].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[4].id}><img src={posts[4].img} alt="" /></Link>
                     </div>
                  </div>
               </div>}
               
               {/* <!-- 2 --> */}
               {posts && <div className="d-wrapper1 d-wrapper flex">
                  <div className="square-container-2">
                     <div className="sqw-2">
                        <Link to={"/posts/"+posts[5].id}><img src={posts[5].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[6].id}><img src={posts[6].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[7].id}><img src={posts[7].img} alt="" /></Link>
                     </div>
                     <div className="sqw-2">
                        <Link to={"/posts/"+posts[8].id}><img src={posts[8].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[9].id}><img src={posts[9].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[10].id}><img src={posts[10].img} alt="" /></Link>
                     </div>
                  </div>
               </div>}
               
               {/* <!-- 3 --> */}
               {posts && <div className="d-wrapper1 d-wrapper flex">
                  <div className="square-container">
                     <div className="sqw">
                        <Link to={"/posts/"+posts[11].id}><img src={posts[11].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[12].id}><img src={posts[12].img} alt="" /></Link>

                     </div>
                     <div className="sqw">
                        <Link to={"/posts/"+posts[13].id}><img src={posts[13].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[14].id}><img src={posts[14].img} alt="" /></Link>
                     </div>
                  </div>
                  <div className="long-square">
                     <Link to={"/posts/"+posts[15].id}><img src={posts[15].img} alt="" /></Link>
                  </div>
               </div>}
               
               {/* <!-- 4 --> */}
               {posts && <div className="d-wrapper1 d-wrapper flex">
                  <div className="square-container-2">
                     <div className="sqw-2">
                        <Link to={"/posts/"+posts[16].id}><img src={posts[16].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[17].id}><img src={posts[17].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[18].id}><img src={posts[18].img} alt="" /></Link>

                     </div>
                     <div className="sqw-2">
                        <Link to={"/posts/"+posts[19].id}><img src={posts[19].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[20].id}><img src={posts[20].img} alt="" /></Link>
                        <Link to={"/posts/"+posts[21].id}><img src={posts[21].img} alt="" /></Link>
                     </div>
                  </div>
               </div>}
            </section>
         </main>

         {!posts && <Loading />}

         <Footer />

      </div>
   );
}

export default Discover;