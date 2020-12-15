import React, { useState } from "react"
import Register from './Users/Register'
import Login from './Users/Login'
import UserView from './Users/UserView'
import { isLoggedIn } from "../utils/logged"
const UserPanel = () => {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (tab: number) => {
    setTab(tab);
  }

  const handleLogout = () => {
    localStorage.setItem("token", "")
  }
  // console.log(isLoggedIn())
  // if (isLoggedIn()) {
  //   return (
  //     <div className="container">
  //       <UserView username={localStorage.getItem("username")} />
  //       <div className="row">
  //         <p>Hey {localStorage.getItem("username")}</p>
  //       </div>
  //       <div className="row">
  //         <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
  //       </div>
  //     </div>

  //   )
  // }
  return (
    <div>
      <ul className="nav nav-tabs" >
        <li className="nav-item" onClick={() => handleChangeTab(0)} >
          <a className="nav-link" id="home-tab" data-toggle="tab" href="#" aria-controls="home"
            aria-selected="true">Login</a>
        </li>
        <li className="nav-item" onClick={() => handleChangeTab(1)} >
          <a className="nav-link" id="profile-tab" data-toggle="tab" href="#" role="tab" aria-controls="profile"
            aria-selected="false">Register</a>
        </li>
      </ul>
      {tab === 0 ? <Login logged={isLoggedIn} /> : <Register logged={isLoggedIn} />}
    </div>
  )
}

export default UserPanel