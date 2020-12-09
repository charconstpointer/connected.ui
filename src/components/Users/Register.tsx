import { useState } from "react";
import RegisterRequest from "../../requests/RegisterRequest";
import { v } from "../../validators/RegistrationValidator";

const Register = (props: any) => {
  console.log(props.logged)
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
  )
}

export default Register;