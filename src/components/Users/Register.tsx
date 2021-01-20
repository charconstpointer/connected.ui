import React from "react";
import { useState } from "react";
import RegisterRequest from "../../requests/RegisterRequest";
import { isLoggedIn } from "../../utils/logged";
import { v } from "../../validators/RegistrationValidator";
import { Validator } from "../../validators/Validator";
import ErrorDisplay from "../Errors/ErrorDisplay";

const Register = (props: any) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const validator = new Validator()
    .addStep<RegisterRequest>(r => r.email.trim().length > 0, "email cannot be empty", "email")
    .addStep<RegisterRequest>(r => r.username.trim().length > 0, "userame cannot be empty", "username")
    .addStep<RegisterRequest>(r => r.password.trim().length > 5, "password must be longer than 5 characters", "password")
    .addStep<RegisterRequest>(r => r.password.includes("*"), "password must contain *", "password")

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
    setErrors([])
    const request = new RegisterRequest(login, password, email);
    const validationResult = validator.validate(request);
    if (!validationResult.ok) {
      setErrors([...errors, ...validationResult.errors.map(e => e)])
      return
    }

    const response = await fetch("https://localhost:5001/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    console.log(response.status)
    if (response.status !== 201) {
      setErrors([...errors, ...validationResult.errors.map(e => e.reason)])
    }
  }
  return (
    <>
      {!isLoggedIn() ?
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
                  <ErrorDisplay errors={errors} for='username' />
                </div>
              </div>
              <div className="row">
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                  </div>
                  <input type="password" onChange={handlePasswordChange} className="form-control" placeholder="" aria-label="Password"
                    aria-describedby="basic-addon1" />
                  <ErrorDisplay errors={errors} for='password' />
                </div>
              </div>
              <div className="row">
                <div className="input-group mb-1">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                  </div>
                  <input type="email" onChange={handleEmailChange} className="form-control" placeholder="" aria-label="Email"
                    aria-describedby="basic-addon1" />
                  <ErrorDisplay errors={errors} for='email' />
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-primary btn-block" onClick={handleRegister} >Register</button>
          {/* <ErrorDisplay errors={errors} /> */}
        </> : <p>Please logout first to create another account</p>}
    </>
  )
}

export default Register;