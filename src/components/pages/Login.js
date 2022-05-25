// import: main
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import: custom hooks
import useVariables from '../../customhooks/useVariables';
// import: images
import sf_logo from '../../images/logos/seefriends-logo-4.png'



const Login = () => {
   const usernameRef = useRef()
   const passwordRef = useRef()

   const {token_url, refresh_url, token_key} = useVariables()
   const navigate = useNavigate()

   const handleLogin = (e) => {
      e.preventDefault()

      const username = usernameRef.current.value
      const password = passwordRef.current.value
      console.log({username, password})

      fetch(token_url, {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({username, password})
      })
      .then((res) => res.json())
      .then(data => {
         console.log(data)
         localStorage.setItem(token_key, JSON.stringify(data))
         navigate('/')
      })
      .catch(err => {
         console.log(err.message)
      })
   }

   return ( 
      <div className="login-react">
         <section class="auth-container">
            <div class="sf-auth-logo">
               <img src={sf_logo} alt="seefriends logo" />
            </div>
            <div class="auth-form">
               <form onSubmit={handleLogin}>
                  <input ref={usernameRef} type="text" name="username" id="username" placeholder="username" />
                  <input ref={passwordRef} type="password" name="password" id="password" placeholder="password" />
                  <input type="submit" value="Log in" />
               </form>
            </div>

            <small>Don't Have an accout? <strong><a href="#">sign up</a></strong></small>
         </section>
      </div>
   );
}

export default Login;