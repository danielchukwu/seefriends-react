import { useRef, useState } from "react";
import useIcons from "../../customhooks/useIcons"
import useVariables from "../../customhooks/useVariables";

const MessageOn = ({ tPost, setTPost, type, toggle }) => {
   const {verified_icon} = useIcons()
   const {host_url, tells_url, access_token} = useVariables();
   const inputRef = useRef();
   const [submitReady, setSubmitReady] =useState(false);


   // logic: submit tell
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit')

      let body = inputRef.current.innerHTML;
      console.log(body)

      while (body.length-1 === body.lastIndexOf('\n')){
         body = body.slice(0, -1);
      }

      // FormData: will act as a form for us with Content-Type: "multipart/form-data"

      if (body.length >= 1){
         if (type === "post"){
            toggle(tPost.id, "tell-on-post", body);
            handleClose();
         }else if (type === "tell"){
            toggle(tPost.id, "tell-on-tell", body);
            handleClose();
         }
      }
   }

   // logic: remove floater with styling for exit animation before actually stopping it
   function handleClose() {
      const parent_node = inputRef.current.parentNode.parentNode.parentNode.parentNode;

      parent_node.childNodes[0].classList = "exit-tell-on exit-tell-on-close";
      parent_node.childNodes[2].classList = "tell-on-box tell-on-box-close";

      setTimeout(() => {
         parent_node.childNodes[0].classList = "exit-tell-on";
         parent_node.childNodes[2].classList = "tell-on-box";

         setTPost(null);
      }, 200)
   }

   // logic: check if text input is not empty to know if post is ready
   const isReady =(e) => {
      const bodysize = inputRef.current.innerHTML.length
      if (bodysize >= 1){
         setSubmitReady(true)
         if (e.key === 'Enter'){
            handleSubmit(e);
         }
      } else {
         setSubmitReady(false)
         if (e.key === 'Enter'){
            return;
         }
      }
   }

   // logic: focus on input
   setTimeout(()=> {
      if (inputRef){
         inputRef.current.focus()
      }
   }, 200)

   console.log(tPost)
   return (
      <div className="tell-on-container">
         <div className="exit-tell-on" onClick={() => handleClose()}></div> {/* exit-tell-on-close */}
         <div className="tell-on-box"> {/* tell-on-box-close */}

            <form onSubmit={handleSubmit}>

               <div className="post-or-tell">
                  <h4 className='pot-user'>{tPost.owner.profile.username}
                     {tPost.owner.profile.verified && <img src={verified_icon}className="width-13 verified-pos1" alt="verification" />}
                  </h4>
                  <p className='pot-body'>{tPost.body}</p>
               </div>
               <div className="main-tell-box">
                  <div ref={inputRef} className="textarea-tell-on" contentEditable={true} required onKeyDown={isReady}></div>
                  {/* <div className="textarea-tell-on" contentEditable={true} required onKeyDown={handleEnterSub}></div> */}
               </div>
               <div className="tell-on-button">
                  {submitReady && <button className="button-blue">Tell</button>}
                  {!submitReady && <button className="grey-dark" disabled>Tell</button>}
                  
               </div>
            </form>

         </div>
      </div>
   );
}

export default MessageOn;