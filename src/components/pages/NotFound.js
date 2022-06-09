import useIcons from "../../customhooks/useIcons";
import Header from '../headers_footers/Header';
import Footer from "../headers_footers/Footer";

const NotFound = () => {
   const {sad_icon128, sad_icon256} = useIcons();

   return (
      <div className="not-found-react">
         <Header page="Posts" left={"logo"} right={"search-chats"} />
         
         <main className="not-found-container">
            <div className="not-found">
               <img src={sad_icon128} alt="" />
               <h2>Page Not Found</h2>
            </div>
         </main>

         <Footer />
      </div>
   );
}

export default NotFound;