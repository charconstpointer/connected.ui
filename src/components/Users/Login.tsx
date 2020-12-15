import { useState } from "react";
import { lv } from "../../validators/LoginValidator";
import LoginRequest from '../../requests/LoginRequest'
import React from "react";
import { Post as POST } from "../../utils/api";
import { Validator } from '../../validators/Validator'
import ErrorDisplay from '../Errors/ErrorDisplay'
import { FormState } from '../../validators/FormState'
import { isLoggedIn } from "../../utils/logged";
import UserView from "./UserView";

const Login = (props: any) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const validator = new Validator()
    .addStep<LoginRequest>(r => r.username.trim().length > 0, "username cannot be empty")
    .addStep<LoginRequest>(r => r.username.trim().length > 0, "password cannot be empty");

  const handleLoginChange = (e: any) => {
    setLogin(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    setErrors([])
    const request = new LoginRequest(login, password, email);
    const validationResult = validator
      .validate(request);

    if (!validationResult.ok) {
      validationResult.errors.forEach(err => console.error(err.reason))
      setErrors([...errors, ...validationResult.errors.map(e => e.reason)])
      return
    }

    const response = await POST("https://localhost:5001/auth", request);
    if (!response.ok) {
      console.error("could not login");
      return;
    }
    const token = await response.text();
    localStorage.setItem("token", token);
    localStorage.setItem("username", login);
    setErrors([])
    console.log(`logged in as ${request.username}`)
  }

  const handleLogout = () => {
    localStorage.setItem("token", "")
    console.log(localStorage.getItem("token"))
    console.log(`still logged in? ${isLoggedIn()}`)
    setErrors([])
  }

  return (
    <>
      {!isLoggedIn() ?
        <>

          <form>
            <div className="container ">
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

          <div className="row mt-1">
            <ErrorDisplay errors={errors} />
          </div>
        </>
        :
        <div className="container">
          <div className="row">
            <UserView username={localStorage.getItem("username")} />
            <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
          </div>
        </div>

      }
    </>
  )
}

export default Login;