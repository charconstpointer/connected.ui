import React from "react";
import { useState } from "react";
import RegisterRequest from "../../requests/RegisterRequest";
import { v } from "../../validators/RegistrationValidator";

const Register = (props: any) => {
  console.log(props.logged)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(token!?.length > 0);


  const handleLoginChange = (e: any) => {
    setLogin(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }
  const handleRegister = async () => {
    const isValid = v.validate(login, password, email);
    if (!isValid) {
      console.error("nope!");
    }

    const request = new RegisterRequest(login, password, email);
    const response = await fetch("https://localhost:5001/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    console.log(response.status)
    if (response.status !== 201) {
      console.error("something went wrong")
    }

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
                  <input type="password" onChange={handlePasswordChange} className="form-control" placeholder="" aria-label="Password"
                    aria-describedby="basic-addon1" />
                </div>
              </div>
              <div className="row">
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                  </div>
                  <input type="email" onChange={handleEmailChange} className="form-control" placeholder="" aria-label="Email"
                    aria-describedby="basic-addon1" />
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-primary btn-block" onClick={handleRegister} >Register</button>
        </> : <p>Please logout first to create another account</p>}
    </div>
  )
}

export default Register;