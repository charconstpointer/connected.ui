import { useState } from "react";
import { lv } from "../../validators/LoginValidator";
import LoginRequest from '../../requests/LoginRequest'
const Login = () => {
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
    console.log(token);
  }
  return (
    <div>
      <form>
        <input type="text" onChange={handleLoginChange} />
        <input type="password" onChange={handlePasswordChange} />
        <input type="email" onChange={handleEmailChange} />
      </form>
      <button onClick={handleLogin} >Register</button>
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

export default Login;