import{useState} from "react";

import { withRouter } from 'react-router-dom';




function Login() {

  const usersList = [
    {id: 1,username:"ben",password:"admin123",},

    {id: 2,username:"emie",password:"admin123",},
    {id: 3,username:"sam_sparks123",password:"sparksfly"}];
    const [user, setUser] = useState("")

  const [pass, setPass] = useState("")

  const [error, setError] = useState("")



  const handleUser = (e) => {

    setUser(e.target.value)

    console.log(user)

  }



  const handlePass = (e) => {
    setPass(e.target.value)
    console.log(pass)
  }



 

    const existingUser = usersList.find(item => item.username === user)
    const handleLogin = () => {
      if( !existingUser) {
        alert("invalid credential")
      }
      else{
          redirectToHome();
      }
    }
    const redirectToHome = (props) => {
      props.history.push("/add");
    }

    return(
        <div>
          <h3>Login Page</h3>
          <label>Username </label>
              <input
              type="text"
              id="username"
              name="username"
              placeholder="Add Username"
              onChange={handleUser}
              />
             <br></br>
            <label>Password </label>
              <input
              type="text"
              id="password"
              name="password"
              placeholder="Add Password"
              onChange={handlePass}
              />
    
              <br></br>
    
               <button type ="submit"onClick={handleLogin}>Login</button>
              </div> 
      )
    
    }
    

    export default withRouter(Login)