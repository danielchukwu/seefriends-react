// import: main
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetOwner from '../../customhooks/useGetOwner';
// import: custom hooks
import useVariables from '../../customhooks/useVariables';
// import: images
import sf_logo from '../../images/logos/seefriends-logo-4.png'



const Login = () => {
   const usernameRef = useRef()
   const passwordRef = useRef()
   const { owner } = useGetOwner()

   const [showErrors, setShowErrors] = useState()

   const {token_url, refresh_url, token_key} = useVariables()
   const navigate = useNavigate()

   const handleLogin = (e) => {
      e.preventDefault()

      const username = usernameRef.current.value
      const password = passwordRef.current.value
      // console.log({username, password})

      fetch(token_url, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username, password})
      })
      .then((res) => res.json())
      .then(data => {
         if (data.detail){
            throw Error("invalid username or password")
         }
         console.log(data)
         localStorage.setItem(token_key, JSON.stringify(data))
         navigate('/')
      })
      .catch(err => {
         if (err.message == "invalid username or password"){
            setShowErrors('Invalid username or password!')
         }
         console.log(err.message)
      })
   }
   
   //logic: redirect to home if logged in

   return ( 
      <div className="login-react">
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
               <form onSubmit={handleLogin}>
                  <input ref={usernameRef} type="text" name="username" id="username" placeholder="Username" required />
                  <input ref={passwordRef} type="password" name="password" id="password" placeholder="Password" required/>
                  <input type="submit" value="Log in" />
               </form>
            </div>

            <small>Don't Have an accout? <strong><Link to="/sign-up">sign up</Link></strong></small>
         </section>
      </div>
   );
}

export default Login;