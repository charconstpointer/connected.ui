import { useState } from "react";
import { lv } from "../../validators/LoginValidator";
import LoginRequest from '../../requests/LoginRequest'

const Login = (props: any) => {
  console.log(props.logged)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(token!?.length > 0);
  console.log(isLoggedIn, token)
  const handleLoginChange = (e: any) => {
    setLogin(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleLogin = async () => {
    const isValid = lv.validate(login, password);
    if (!isValid) {
      console.error("nope!")
    }
    const request = new LoginRequest(login, password, email);
    const response = await fetch("https://localhost:5001/auth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    const token = await response.text();
    localStorage.setItem("token", token);
    console.log("logged in")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("token", "")
    console.log(localStorage.getItem("token"))
  }
  return (
    <div>
      {!isLoggedIn ?
        <>
          <form>
            <input type="text" onChange={handleLoginChange} />
            <input type="password" onChange={handlePasswordChange} />
          </form>
          <button onClick={handleLogin} >Register</button>
        </>
        :
        <button onClick={handleLogout}>Logout</button>
      }
    </div>
  )
}

export default Login;