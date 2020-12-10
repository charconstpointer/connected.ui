import { useState } from "react";
import { lv } from "../../validators/LoginValidator";
import LoginRequest from '../../requests/LoginRequest'
import React from "react";
import { Post as POST } from "../../utils/api";

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
    const response = await POST("https://localhost:5001/auth", request);
    if (!response.ok) {
      console.error("could not login");
      return;
    }
    // const response = await fetch("https://localhost:5001/auth", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(request)
    // });
    const token = await response.text();
    localStorage.setItem("token", token);
    localStorage.setItem("username", login);
    console.log("logged in as", login)
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
            <div className="container">
              <div className="row mt-1">
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Login</span>
                  </div>
                  <input type="text" onChange={handleLoginChange} className="form-control" placeholder="" aria-label="Username"
                    aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className="row">
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                  </div>
                  <input type="password" onChange={handlePasswordChange} className="form-control" placeholder="" aria-label="Username"
                    aria-describedby="basic-addon1" />
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-primary btn-block" onClick={handleLogin} >Login</button>
        </>
        :
        <div className="container">
          <div className="row">
            <p>Hey {localStorage.getItem("username")}</p>
          </div>
          <div className="row">
            <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
          </div>
        </div>

      }
    </div>
  )
}

export default Login;