import React from "react"
import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <img src="/img/logo_transparent.png" alt="" className="logo img-fluid" />
          <ul className="navbar-nav menu">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home 🏠</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/groups">Groups 💭</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login 👩‍🦱</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact 📞</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navigation