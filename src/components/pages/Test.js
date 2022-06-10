import Footer from "../headers_footers/Footer";
import Header from "../headers_footers/Header";

const Test = () => {
   return (
      <div className="test-react">
         <Header left={"logo"} right={"search-chats"}/>

         <div className="spinner-box">
            <div className="circle-box">
               <div className="circle-core"></div>
            </div>
         </div>
         
         <Footer />
      </div>
   );
}
 
export default Test;