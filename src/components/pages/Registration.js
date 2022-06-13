import {useState } from "react"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import useIcons from "../../customhooks/useIcons"
import useVariables from "../../customhooks/useVariables"

const Registration = () => {
   const navigate = useNavigate();
   const nameRef = useRef();
   const usernameRef = useRef();
   const emailRef = useRef();
   const password1Ref = useRef();
   const password2Ref = useRef();

   const [showErrors, setShowErrors] = useState();

   const {token_url, token_key, register_url} = useVariables();
   const {sf_logo} = useIcons();


   const handleRegistraion = (e) => {
      e.preventDefault();

      const name = nameRef.current.value
      const email = emailRef.current.value
      const username = usernameRef.current.value
      const password1 = password1Ref.current.value
      const password2 = password2Ref.current.value
      // console.log(name, email, username, password1, password2)

      const uploadData = new FormData();
      uploadData.append('first_name', name);
      uploadData.append('email', email);
      uploadData.append('username', username);
      uploadData.append('password1', password1);
      uploadData.append('password2', password2);
      
      fetch(register_url, {
         method: "POST",
         body: uploadData
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            if (data.details === "successful!"){
               handleLogin();
            } else {
               handleErrors(data);
            }
            console.log(data)
         })
         .catch(err => console.log(err))
   }


   const handleLogin = () => {

      const username = usernameRef.current.value
      const password = password1Ref.current.value
      // console.log({username, password1})

      fetch(token_url, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username, password})
      })
      .then((res) => res.json())
      .then(data => {
         console.log(data)
         localStorage.setItem(token_key, JSON.stringify(data))
         navigate('/welcome')
      })
      .catch(err => {
         console.log(err.message)
      })
   }

   
   const handleErrors = (data) => {
      // console.log("Handle Errors")
      // console.log(data)
      const errors = data.errors
      // console.log(errors)

      if (errors.includes('username') && errors.includes('email')){
         setShowErrors('Username and Email already exists!')

      } else if (errors.includes('username')) {
         setShowErrors('Username already exists!')

      } else if (errors.includes('email')){
         setShowErrors('Email already exists!')

      } else if (errors.includes('passwords unexact')){
         setShowErrors('Confirm password is not similar!')

      } else if (errors.includes('password similar')) {
         setShowErrors('Password is too similar to the username!')

      } else if (errors.includes('password short')){
         setShowErrors('Password should be at least 8 characters!')

      } else if (errors.includes('password easy')){
         setShowErrors('Password is too common!')
      }

      // setTimeout(() => {
      //    if (showErrors !== null){
      //       setShowErrors(null)
      //    }
      // }, 3000)
   }


   return (
      <div className="registration-react">
         {showErrors && 
         <div className="error-box">
            <p className="no-margin">{showErrors}</p>
            <p className="no-margin" onClick={() => setShowErrors(null)}>&#x2716;</p>
         </div>}
         <section className="auth-container">
            <div className="sf-auth-logo">
               <img src={sf_logo} alt="seefriends logo" />
            </div>
            <div className="auth-form">
               <form onSubmit={handleRegistraion}>
                  <input ref={nameRef} type="text" name="first_name" placeholder="Full Name" required />
                  <input ref={usernameRef} type="text" name="username" placeholder="Username" required/>
                  <input ref={emailRef} type="text" name="email" placeholder="Email" required />
                  <input ref={password1Ref} type="password" name="password" placeholder="Password" required/>
                  <input ref={password2Ref} type="password" name="password2" placeholder="Confirm Password" required/>

                  <input type="submit" value="Sign Up"></input>
               </form>
            </div>

            <small>Already have an accout? <strong><Link to={"/login"}>log in</Link></strong></small>
         </section>
      </div>
   );
}

export default Registration;