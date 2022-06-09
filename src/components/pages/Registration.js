import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import useIcons from "../../customhooks/useIcons"
import useVariables from "../../customhooks/useVariables"

const Registration = () => {
   const nameRef = useRef()
   const usernameRef = useRef()
   const emailRef = useRef()
   const password1Ref = useRef()
   const password2Ref = useRef()

   const {token_url, refresh_url, token_key, register_url} = useVariables()
   const {sf_logo} = useIcons()

   const navigate = useNavigate()

   const handleRegistraion = (e) => {
      e.preventDefault();

      const name = nameRef.current.value
      const email = emailRef.current.value
      const username = usernameRef.current.value
      const password1 = password1Ref.current.value
      const password2 = password2Ref.current.value
      console.log(name, email, username, password1, password2)

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
               console.log("Username or Password or Email is not valid!")
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
         navigate('/')
      })
      .catch(err => {
         console.log(err.message)
      })
   }

   return (
      <div className="registration-react">
         <section className="auth-container">
            <div className="sf-auth-logo">
               <img src={sf_logo} alt="seefriends logo" />
            </div>
            <div className="auth-form">
               <form onSubmit={handleRegistraion}>
                  <input ref={nameRef} type="text" name="first_name" id="name" placeholder="Full Name" required />
                  <input ref={usernameRef} type="text" name="username" id="username" placeholder="Username" />
                  <input ref={emailRef} type="text" name="email" id="email" placeholder="Email" required />
                  <input ref={password1Ref} type="password" name="password" id="password" placeholder="Password" />
                  <input ref={password2Ref} type="password" name="password2" id="Confirm-password" placeholder="Confirm Password" />

                  <input type="submit" value="Sign Up"></input>
               </form>
            </div>

            <small>Already have an accout? <strong><Link to={"/login"}>log in</Link></strong></small>
         </section>
      </div>
   );
}

export default Registration;