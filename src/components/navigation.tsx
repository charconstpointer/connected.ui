import { render } from "@testing-library/react"
import { Link } from "react-router-dom"

const Navigation = () =>{
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
      {/* <img src="../public/img/logo_transparent.png" alt="" style="max-width: 4em;" className="img-fluid"> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav menu">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home 🏠</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Groups 💭</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Login 👩‍🦱</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Contact 📞</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navigation