import { useState } from "react";
import RegisterRequest from "../../requests/RegisterRequest";

import { v } from "../../validators/RegistrationValidator";
const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleLoginChange = (e: any) => {
    setLogin(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }
  const handleRegister = () => {
    const isValid = v.validate(login, password, email);
    if (isValid) {
      const request = new RegisterRequest(login, password, email);
      fetch("https://localhost:5001/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      }).then(r => console.log(r.status))
        .catch(console.error)
    }
    console.log("register", login, password, email)
  }
  return (
    <div>
      <form>
        <input type="text" onChange={handleLoginChange} />
        <input type="password" onChange={handlePasswordChange} />
        <input type="email" onChange={handleEmailChange} />
      </form>
      <button onClick={handleRegister} >Register</button>
    </div>
    // <div className="tab-content" id="myTabContent">
    //   <div className="tab-pane" id="home" role="tabpanel" aria-labelledby="home-tab">
    //     <div className="login mt-3 mb-5">
    //       <div className="input-group mb-1">
    //         <div className="input-group-prepend">
    //           <span className="input-group-text" id="basic-addon1">Login</span>
    //         </div>
    //         <input type="text" className="form-control" placeholder="Username" aria-label="Username"
    //           aria-describedby="basic-addon1" />
    //       </div>
    //       <div className="input-group mb-1">
    //         <div className="input-group-prepend">
    //           <span className="input-group-text" id="basic-addon1">Password</span>
    //         </div>
    //         <input type="password" className="form-control" placeholder="Username" aria-label="Username"
    //           aria-describedby="basic-addon1" />
    //       </div>
    //       <a href="#" className="btn btn-primary btn-block">Login</a>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Register;